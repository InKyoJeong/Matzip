import { MarkerColor } from '../marker-color.enum';
export declare class CreatePostDto {
    latitude: number;
    longitude: number;
    color: MarkerColor;
    address: string;
    title: string;
    description: string;
    date: Date;
    score: number;
    imageUris: {
        uri: string;
    }[];
}
