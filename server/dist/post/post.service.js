"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./post.entity");
const image_entity_1 = require("../image/image.entity");
let PostService = class PostService {
    constructor(postRepository, imageRepository) {
        this.postRepository = postRepository;
        this.imageRepository = imageRepository;
    }
    async getMyMarkers(user) {
        try {
            const markers = await this.postRepository
                .createQueryBuilder('post')
                .where('post.userId = :userId', { userId: user.id })
                .select([
                'post.id',
                'post.latitude',
                'post.longitude',
                'post.color',
                'post.score',
            ])
                .getMany();
            return markers;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('마커를 가져오는 도중 에러가 발생했습니다.');
        }
    }
    async getPostsBaseQuery(userId) {
        return this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.images', 'image')
            .where('post.userId = :userId', { userId })
            .orderBy('post.date', 'DESC');
    }
    getPostsWithOrderImages(posts) {
        return posts.map((post) => {
            const { images } = post, rest = __rest(post, ["images"]);
            const newImages = [...images].sort((a, b) => a.id - b.id);
            return Object.assign(Object.assign({}, rest), { images: newImages });
        });
    }
    async getMyPosts(page, user) {
        const perPage = 10;
        const offset = (page - 1) * perPage;
        const queryBuilder = await this.getPostsBaseQuery(user.id);
        const posts = await queryBuilder.take(perPage).skip(offset).getMany();
        return this.getPostsWithOrderImages(posts);
    }
    async searchMyPostsByTitleAndAddress(query, page, user) {
        const perPage = 10;
        const offset = (page - 1) * perPage;
        const queryBuilder = await this.getPostsBaseQuery(user.id);
        const posts = await queryBuilder
            .andWhere(new typeorm_2.Brackets((qb) => {
            qb.where('post.title like :query', { query: `%${query}%` });
            qb.orWhere('post.address like :query', { query: `%${query}%` });
        }))
            .skip(offset)
            .take(perPage)
            .getMany();
        return this.getPostsWithOrderImages(posts);
    }
    async getPostById(id, user) {
        try {
            const foundPost = await this.postRepository
                .createQueryBuilder('post')
                .leftJoinAndSelect('post.images', 'image')
                .leftJoinAndSelect('post.favorites', 'favorite', 'favorite.userId = :userId', { userId: user.id })
                .where('post.userId = :userId', { userId: user.id })
                .andWhere('post.id = :id', { id })
                .getOne();
            if (!foundPost) {
                throw new common_1.NotFoundException('존재하지 않는 피드입니다.');
            }
            const { favorites } = foundPost, rest = __rest(foundPost, ["favorites"]);
            const postWithIsFavorite = Object.assign(Object.assign({}, rest), { isFavorite: favorites.length > 0 });
            return postWithIsFavorite;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('장소 정보를 가져오는 도중 에러가 발생했습니다.');
        }
    }
    async createPost(createPostDto, user) {
        const { latitude, longitude, color, address, title, description, date, score, imageUris, } = createPostDto;
        const post = this.postRepository.create({
            latitude,
            longitude,
            color,
            address,
            title,
            description,
            date,
            score,
            user,
        });
        const images = imageUris.map((uri) => this.imageRepository.create(uri));
        post.images = images;
        try {
            await this.imageRepository.save(images);
            await this.postRepository.save(post);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('장소를 추가하는 도중 에러가 발생했습니다.');
        }
        const { user: _ } = post, postWithoutUser = __rest(post, ["user"]);
        return postWithoutUser;
    }
    async deletePost(id, user) {
        try {
            const result = await this.postRepository
                .createQueryBuilder('post')
                .delete()
                .from(post_entity_1.Post)
                .where('userId = :userId', { userId: user.id })
                .andWhere('id = :id', { id })
                .execute();
            if (result.affected === 0) {
                throw new common_1.NotFoundException('존재하지 않는 피드입니다.');
            }
            return id;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('게시물을 삭제하는 도중 에러가 발생했습니다.');
        }
    }
    async updatePost(id, updatePostDto, user) {
        const post = await this.getPostById(id, user);
        const { title, description, color, date, score, imageUris } = updatePostDto;
        post.title = title;
        post.description = description;
        post.color = color;
        post.date = date;
        post.score = score;
        const images = imageUris.map((uri) => this.imageRepository.create(uri));
        post.images = images;
        try {
            await this.imageRepository.save(images);
            await this.postRepository.save(post);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('게시물을 수정하는 도중 에러가 발생했습니다.');
        }
        return post;
    }
    async getPostsByMonth(year, month, user) {
        const posts = await this.postRepository
            .createQueryBuilder('post')
            .where('post.userId = :userId', { userId: user.id })
            .andWhere('extract(year from post.date) = :year', { year })
            .andWhere('extract(month from post.date) = :month', { month })
            .select([
            'post.id AS id',
            'post.title AS title',
            'post.address AS address',
            'EXTRACT(DAY FROM post.date) AS date',
        ])
            .getRawMany();
        const groupPostsByDate = posts.reduce((acc, post) => {
            const { id, title, address, date } = post;
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push({ id, title, address });
            return acc;
        }, {});
        return groupPostsByDate;
    }
    async getPostCountByField(user, field) {
        const counts = await this.postRepository
            .createQueryBuilder('post')
            .where('post.userId = :userId', { userId: user.id })
            .select(`post.${field}`, `${field}`)
            .addSelect('COUNT(post.id)', 'count')
            .groupBy(`post.${field}`)
            .getRawMany()
            .then((result) => result.map((post) => ({
            field: post[field],
            count: Number(post.count),
        })));
        return counts;
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(image_entity_1.Image)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map