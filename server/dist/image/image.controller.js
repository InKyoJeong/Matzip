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
exports.ImageController = void 0;
const fs = require("fs");
const multer_1 = require("multer");
const path_1 = require("path");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const common_1 = require("@nestjs/common");
const constants_1 = require("../@common/constants");
try {
    fs.readdirSync('uploads');
}
catch (error) {
    console.error('create uploads folder');
    fs.mkdirSync('uploads');
}
let ImageController = class ImageController {
    uploadImages(files) {
        const uris = files.map((file) => file.filename);
        return uris;
    }
};
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', constants_1.numbers.MAX_IMAGE_COUNT, {
        storage: (0, multer_1.diskStorage)({
            destination(req, file, cb) {
                cb(null, 'uploads/');
            },
            filename(req, file, cb) {
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, (0, path_1.basename)(file.originalname, ext) + Date.now() + ext);
            },
        }),
        limits: { fileSize: constants_1.numbers.MAX_IMAGE_SIZE },
    })),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ImageController.prototype, "uploadImages", null);
ImageController = __decorate([
    (0, common_1.Controller)('images'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)())
], ImageController);
exports.ImageController = ImageController;
//# sourceMappingURL=image.controller.js.map