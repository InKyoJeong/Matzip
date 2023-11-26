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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const create_post_dto_1 = require("./dto/create-post.dto");
const post_service_1 = require("./post.service");
const user_entity_1 = require("../auth/user.entity");
const get_user_decorator_1 = require("../@common/decorators/get-user.decorator");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    getAllMyMarkers(user) {
        return this.postService.getMyMarkers(user);
    }
    getMyPosts(page, user) {
        return this.postService.getMyPosts(page, user);
    }
    searchMyPostsByTitleAndAddress(query, page, user) {
        return this.postService.searchMyPostsByTitleAndAddress(query, page, user);
    }
    getPostById(id, user) {
        return this.postService.getPostById(id, user);
    }
    createPost(createPostDto, user) {
        return this.postService.createPost(createPostDto, user);
    }
    deletePost(id, user) {
        return this.postService.deletePost(id, user);
    }
    updatePost(id, updatePostDto, user) {
        return this.postService.updatePost(id, updatePostDto, user);
    }
    getPostsByMonth(year, month, user) {
        return this.postService.getPostsByMonth(year, month, user);
    }
    async getCountByScore(user) {
        return this.postService.getPostCountByField(user, 'score');
    }
    async getCountByColor(user) {
        return this.postService.getPostCountByField(user, 'color');
    }
};
__decorate([
    (0, common_1.Get)('/markers/my'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getAllMyMarkers", null);
__decorate([
    (0, common_1.Get)('/posts/my'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getMyPosts", null);
__decorate([
    (0, common_1.Get)('/posts/my/search'),
    __param(0, (0, common_1.Query)('query')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "searchMyPostsByTitleAndAddress", null);
__decorate([
    (0, common_1.Get)('/posts/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getPostById", null);
__decorate([
    (0, common_1.Post)('/posts'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Delete)('/posts/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Patch)('/posts/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Get)('/posts'),
    __param(0, (0, common_1.Query)('year')),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getPostsByMonth", null);
__decorate([
    (0, common_1.Get)('/posts/scores/count'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getCountByScore", null);
__decorate([
    (0, common_1.Get)('/posts/colors/count'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getCountByColor", null);
PostController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map