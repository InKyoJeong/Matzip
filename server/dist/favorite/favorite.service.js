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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteService = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const favorite_entity_1 = require("./favorite.entity");
let FavoriteService = class FavoriteService {
    constructor(favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }
    async getMyFavoritePosts(page, user) {
        const perPage = 10;
        const offset = (page - 1) * perPage;
        const favorites = await this.favoriteRepository
            .createQueryBuilder('favorite')
            .innerJoinAndSelect('favorite.post', 'post')
            .leftJoinAndSelect('post.images', 'image')
            .where('favorite.userId = :userId', { userId: user.id })
            .orderBy('post.date', 'DESC')
            .skip(offset)
            .take(perPage)
            .getMany();
        const newPosts = favorites.map((favorite) => {
            const post = favorite.post;
            const images = [...post.images].sort((a, b) => a.id - b.id);
            return Object.assign(Object.assign({}, post), { images });
        });
        return newPosts;
    }
    async toggleFavorite(postId, user) {
        if (!postId) {
            throw new common_1.BadRequestException('존재하지 않는 피드입니다.');
        }
        const existingFavorite = await this.favoriteRepository.findOne({
            where: { postId, userId: user.id },
        });
        if (existingFavorite) {
            await this.favoriteRepository.delete(existingFavorite.id);
            return existingFavorite.postId;
        }
        const favorite = this.favoriteRepository.create({
            postId,
            userId: user.id,
        });
        await this.favoriteRepository.save(favorite);
        return favorite.postId;
    }
};
FavoriteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(favorite_entity_1.Favorite)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], FavoriteService);
exports.FavoriteService = FavoriteService;
//# sourceMappingURL=favorite.service.js.map