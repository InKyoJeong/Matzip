import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  async getPosts() {
    return ['a게시글', 'b게시글'];
  }
}
