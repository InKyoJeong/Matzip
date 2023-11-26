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
exports.FavoriteController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const favorite_service_1 = require("./favorite.service");
const get_user_decorator_1 = require("../@common/decorators/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
let FavoriteController = class FavoriteController {
    constructor(favoriteService) {
        this.favoriteService = favoriteService;
    }
    async getMyFavoritePosts(page, user) {
        return this.favoriteService.getMyFavoritePosts(page, user);
    }
    toggleFavorite(id, user) {
        return this.favoriteService.toggleFavorite(id, user);
    }
};
__decorate([
    (0, common_1.Get)('/my'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "getMyFavoritePosts", null);
__decorate([
    (0, common_1.Post)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "toggleFavorite", null);
FavoriteController = __decorate([
    (0, common_1.Controller)('favorites'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [favorite_service_1.FavoriteService])
], FavoriteController);
exports.FavoriteController = FavoriteController;
//# sourceMappingURL=favorite.controller.js.map