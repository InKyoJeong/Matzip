import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { AuthModule } from 'src/auth/auth.module';
import { Favorite } from './favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite]), AuthModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
