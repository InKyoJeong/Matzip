import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ingg',
      password: 'postgres',
      database: 'matzip-server',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    PostModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
