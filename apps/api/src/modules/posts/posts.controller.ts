import { Controller, Get, Param } from '@nestjs/common';
import type { Post, PostListItem } from '@portfolio/contracts';
import { PostsService } from './posts.service.js';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll(): PostListItem[] {
    return this.postsService.getAll();
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string): Post {
    return this.postsService.getBySlug(slug);
  }
}
