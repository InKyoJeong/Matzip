import { BaseEntity } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { MarkerColor } from './marker-color.enum';
import { Image } from 'src/image/image.entity';
import { Favorite } from 'src/favorite/favorite.entity';
export declare class Post extends BaseEntity {
    id: number;
    latitude: number;
    longitude: number;
    color: MarkerColor;
    address: string;
    title: string;
    description: string;
    date: Date;
    score: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    user: User;
    images: Image[];
    favorites: Favorite[];
}
