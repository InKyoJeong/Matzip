import { IsString, MaxLength, MinLength } from 'class-validator';

export class EditProfileDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  nickname: string;

  @IsString()
  imageUri: string;
}
