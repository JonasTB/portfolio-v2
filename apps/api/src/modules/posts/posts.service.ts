import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import matter from 'gray-matter';
import { postMetadataSchema } from '@portfolio/contracts';
import type { Post, PostListItem } from '@portfolio/contracts';
import { markdownToHtml } from './markdown.js';
import { calculateReadingTime } from './reading-time.js';

const POSTS_DIR = join(__dirname, '../../content/posts');

@Injectable()
export class PostsService implements OnModuleInit {
  private posts: Post[] = [];

  async onModuleInit(): Promise<void> {
    this.posts = await this.loadPosts();
  }

  getAll(): PostListItem[] {
    return this.posts
      .filter((post) => !post.draft)
      .map(({ html: _html, ...metadata }) => metadata)
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  getBySlug(slug: string): Post {
    const post = this.posts.find((item) => item.slug === slug && !item.draft);
    if (!post) {
      throw new NotFoundException(`Post "${slug}" not found`);
    }
    return post;
  }

  private async loadPosts(): Promise<Post[]> {
    let filenames: string[];
    try {
      filenames = (await readdir(POSTS_DIR)).filter((name) => name.endsWith('.md'));
    } catch {
      return [];
    }

    const posts = await Promise.all(
      filenames.map(async (filename) => {
        const raw = await readFile(join(POSTS_DIR, filename), 'utf-8');
        const { data, content } = matter(raw);
        const metadata = postMetadataSchema.parse(data);
        const html = await markdownToHtml(content);
        return { ...metadata, html, readingTime: calculateReadingTime(content) };
      }),
    );

    return posts.sort((a, b) => b.date.localeCompare(a.date));
  }
}
