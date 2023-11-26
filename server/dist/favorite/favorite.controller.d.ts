import { FavoriteService } from './favorite.service';
import { User } from 'src/auth/user.entity';
export declare class FavoriteController {
    private favoriteService;
    constructor(favoriteService: FavoriteService);
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
        favorites: import("./favorite.entity").Favorite[];
    }[]>;
    toggleFavorite(id: number, user: User): Promise<number>;
}
