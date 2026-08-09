import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  return rss({
    title: 'Tiệm Ảnh',
    description: 'Góc chia sẻ của Tiệm Ảnh — chụp kỷ yếu, chân dung và những chuyến đi.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/posts/${post.id}/`,
    })),
  });
}
