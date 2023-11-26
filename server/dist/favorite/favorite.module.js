"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const favorite_controller_1 = require("./favorite.controller");
const favorite_service_1 = require("./favorite.service");
const auth_module_1 = require("../auth/auth.module");
const favorite_entity_1 = require("./favorite.entity");
let FavoriteModule = class FavoriteModule {
};
FavoriteModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([favorite_entity_1.Favorite]), auth_module_1.AuthModule],
        controllers: [favorite_controller_1.FavoriteController],
        providers: [favorite_service_1.FavoriteService],
    })
], FavoriteModule);
exports.FavoriteModule = FavoriteModule;
//# sourceMappingURL=favorite.module.js.map