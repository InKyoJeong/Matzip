import { BaseEntity } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Post } from 'src/post/post.entity';
export declare class Favorite extends BaseEntity {
    id: number;
    postId: number;
    userId: number;
    post: Post;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
