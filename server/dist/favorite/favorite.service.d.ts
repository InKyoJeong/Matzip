import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';
import { User } from 'src/auth/user.entity';
export declare class FavoriteService {
    private favoriteRepository;
    constructor(favoriteRepository: Repository<Favorite>);
    getMyFavoritePosts(page: number, user: User): Promise<{
        images: import("../image/image.entity").Image[];
        id: number;
        latitude: number;
        longitude: number;
        color: import("../post/marker-color.enum").MarkerColor;
        address: string;
        title: string;
        description: string;
        date: Date;
        score: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        user: User;
        favorites: Favorite[];
    }[]>;
    toggleFavorite(postId: number, user: User): Promise<number>;
}
