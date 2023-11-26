import { AuthService } from './auth.service';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { EditProfileDto } from './dto/edit-profile.dto';
import { MarkerColor } from 'src/post/marker-color.enum';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signin(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getProfile(user: User): {
        id: number;
        loginType: "email" | "kakao" | "apple";
        email: string;
        nickname?: string;
        imageUri?: string;
        kakaoImageUri?: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        post: import("../post/post.entity").Post[];
        favorite: import("../favorite/favorite.entity").Favorite[];
        RED: string;
        YELLOW: string;
        BLUE: string;
        GREEN: string;
        PURPLE: string;
    };
    editProfile(editProfileDto: EditProfileDto, user: User): Promise<{
        id: number;
        loginType: "email" | "kakao" | "apple";
        email: string;
        nickname?: string;
        imageUri?: string;
        kakaoImageUri?: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        post: import("../post/post.entity").Post[];
        favorite: import("../favorite/favorite.entity").Favorite[];
        RED: string;
        YELLOW: string;
        BLUE: string;
        GREEN: string;
        PURPLE: string;
    }>;
    logout(user: User): Promise<void>;
    deleteAccount(user: User): Promise<void>;
    updateCategory(categories: Record<keyof MarkerColor, string>, user: User): Promise<{
        id: number;
        loginType: "email" | "kakao" | "apple";
        email: string;
        nickname?: string;
        imageUri?: string;
        kakaoImageUri?: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        post: import("../post/post.entity").Post[];
        favorite: import("../favorite/favorite.entity").Favorite[];
        RED: string;
        YELLOW: string;
        BLUE: string;
        GREEN: string;
        PURPLE: string;
    }>;
    kakaoLogin(kakaoToken: {
        token: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    appleLogin(appleIdentity: {
        identityToken: string;
        appId: string;
        nickname: string | null;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
