import { BaseEntity } from 'typeorm';
import { Post } from 'src/post/post.entity';
export declare class Image extends BaseEntity {
    id: number;
    uri: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    post: Post;
}
