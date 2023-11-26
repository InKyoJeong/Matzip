import { BaseEntity } from 'typeorm';
import { Favorite } from 'src/favorite/favorite.entity';
import { Post } from 'src/post/post.entity';
import { MarkerColor } from 'src/post/marker-color.enum';
export declare class User extends BaseEntity {
    id: number;
    loginType: 'email' | 'kakao' | 'apple';
    email: string;
    password: string;
    nickname?: string;
    imageUri?: string;
    kakaoImageUri?: string;
    [MarkerColor.RED]: string;
    [MarkerColor.YELLOW]: string;
    [MarkerColor.BLUE]: string;
    [MarkerColor.GREEN]: string;
    [MarkerColor.PURPLE]: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    hashedRefreshToken?: string;
    post: Post[];
    favorite: Favorite[];
}
