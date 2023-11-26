import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageController } from './image.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Image } from './image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), AuthModule],
  controllers: [ImageController],
  providers: [],
})
export class ImageModule {}
