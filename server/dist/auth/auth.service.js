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
exports.AuthService = void 0;
const axios_1 = require("axios");
const apple_signin_auth_1 = require("apple-signin-auth");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const user_entity_1 = require("./user.entity");
const marker_color_enum_1 = require("../post/marker-color.enum");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signup(authCredentialsDto) {
        const { email, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            loginType: 'email',
        });
        try {
            await this.userRepository.save(user);
        }
        catch (error) {
            console.log(error);
            if (error.code === '23505') {
                throw new common_1.ConflictException('이미 존재하는 이메일입니다.');
            }
            throw new common_1.InternalServerErrorException('회원가입 도중 에러가 발생했습니다.');
        }
    }
    async signin(authCredentialsDto) {
        const { email, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('이메일 또는 비밀번호가 일치하지 않습니다.');
        }
        const { accessToken, refreshToken } = await this.getTokens({ email });
        await this.updateHashedRefreshToken(user.id, refreshToken);
        return { accessToken, refreshToken };
    }
    async refreshToken(user) {
        const { email } = user;
        const { accessToken, refreshToken } = await this.getTokens({ email });
        if (!user.hashedRefreshToken) {
            throw new common_1.ForbiddenException();
        }
        await this.updateHashedRefreshToken(user.id, refreshToken);
        return { accessToken, refreshToken };
    }
    getProfile(user) {
        const { password, hashedRefreshToken } = user, rest = __rest(user, ["password", "hashedRefreshToken"]);
        return Object.assign({}, rest);
    }
    async editProfile(editProfileDto, user) {
        const profile = await this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :userId', { userId: user.id })
            .getOne();
        if (!profile) {
            throw new common_1.NotFoundException('존재하지 않는 사용자입니다.');
        }
        const { nickname, imageUri } = editProfileDto;
        profile.nickname = nickname;
        profile.imageUri = imageUri;
        try {
            await this.userRepository.save(profile);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('프로필 수정 도중 에러가 발생했습니다.');
        }
        const { password, hashedRefreshToken } = profile, rest = __rest(profile, ["password", "hashedRefreshToken"]);
        return Object.assign({}, rest);
    }
    async deleteRefreshToken(id) {
        try {
            await this.userRepository.update(id, { hashedRefreshToken: null });
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateHashedRefreshToken(id, refreshToken) {
        const salt = await bcrypt.genSalt();
        const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);
        try {
            await this.userRepository.update(id, { hashedRefreshToken });
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async getTokens(payload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: this.configService.get('JWT_ACCRESS_TOKEN_EXPIRATION'),
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION'),
            }),
        ]);
        return { accessToken, refreshToken };
    }
    async deleteAccount(user) {
        try {
            await this.userRepository
                .createQueryBuilder('user')
                .delete()
                .from(user_entity_1.User)
                .where('id = :id', { id: user.id })
                .execute();
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('탈퇴할 수 없습니다. 남은 데이터가 존재하는지 확인해주세요.');
        }
    }
    async updateCategory(categories, user) {
        const { RED, YELLOW, BLUE, GREEN, PURPLE } = marker_color_enum_1.MarkerColor;
        if (!Object.keys(categories).every((color) => [RED, YELLOW, BLUE, GREEN, PURPLE].includes(color))) {
            throw new common_1.BadRequestException('유효하지 않은 카테고리입니다.');
        }
        user[RED] = categories[RED];
        user[YELLOW] = categories[YELLOW];
        user[BLUE] = categories[BLUE];
        user[GREEN] = categories[GREEN];
        user[PURPLE] = categories[PURPLE];
        try {
            await this.userRepository.save(user);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('카테고리 수정 도중 에러가 발생했습니다.');
        }
        const { password, hashedRefreshToken } = user, rest = __rest(user, ["password", "hashedRefreshToken"]);
        return Object.assign({}, rest);
    }
    async kakaoLogin(kakaoToken) {
        var _a;
        const url = 'https://kapi.kakao.com/v2/user/me';
        const headers = {
            Authorization: `Bearer ${kakaoToken.token}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        };
        try {
            const response = await axios_1.default.get(url, { headers });
            const userData = response.data;
            const { id: kakaoId, kakao_account } = userData;
            const nickname = kakao_account.profile.nickname;
            const imageUri = (_a = kakao_account.profile.thumbnail_image_url) === null || _a === void 0 ? void 0 : _a.replace(/^http:/, 'https:');
            const existingUser = await this.userRepository.findOneBy({
                email: kakaoId,
            });
            if (existingUser) {
                const { accessToken, refreshToken } = await this.getTokens({
                    email: existingUser.email,
                });
                await this.updateHashedRefreshToken(existingUser.id, refreshToken);
                return { accessToken, refreshToken };
            }
            const newUser = this.userRepository.create({
                email: kakaoId,
                password: nickname !== null && nickname !== void 0 ? nickname : '',
                nickname,
                kakaoImageUri: imageUri !== null && imageUri !== void 0 ? imageUri : null,
                loginType: 'kakao',
            });
            try {
                await this.userRepository.save(newUser);
            }
            catch (error) {
                console.log(error);
                throw new common_1.InternalServerErrorException();
            }
            const { accessToken, refreshToken } = await this.getTokens({
                email: newUser.email,
            });
            await this.updateHashedRefreshToken(newUser.id, refreshToken);
            return { accessToken, refreshToken };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Kakao 서버 에러가 발생했습니다.');
        }
    }
    async appleLogin(appleIdentity) {
        const { identityToken, appId, nickname } = appleIdentity;
        try {
            const { sub: userAppleId } = await apple_signin_auth_1.default.verifyIdToken(identityToken, {
                audience: appId,
                ignoreExpiration: true,
            });
            const existingUser = await this.userRepository.findOneBy({
                email: userAppleId,
            });
            if (existingUser) {
                const { accessToken, refreshToken } = await this.getTokens({
                    email: existingUser.email,
                });
                await this.updateHashedRefreshToken(existingUser.id, refreshToken);
                return { accessToken, refreshToken };
            }
            const newUser = this.userRepository.create({
                email: userAppleId,
                nickname: nickname === null ? '이름없음' : nickname,
                password: '',
                loginType: 'apple',
            });
            try {
                await this.userRepository.save(newUser);
            }
            catch (error) {
                console.log(error);
                throw new common_1.InternalServerErrorException();
            }
            const { accessToken, refreshToken } = await this.getTokens({
                email: newUser.email,
            });
            await this.updateHashedRefreshToken(newUser.id, refreshToken);
            return { accessToken, refreshToken };
        }
        catch (error) {
            console.log('error', error);
            throw new common_1.InternalServerErrorException('Apple 로그인 도중 문제가 발생했습니다.');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map