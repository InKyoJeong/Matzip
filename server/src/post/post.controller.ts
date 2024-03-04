import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/posts')
  getPosts() {
    return this.postService.getPosts();
  }
}
