import { json } from '@sveltejs/kit';
import type { Post } from '$lib/types/main';

export const prerender = true;

async function getPosts() {
	let posts: Post[] = [];

	// Vite feature to get all the posts using a glob (eager reads the contents of the file avoiding await paths[path]())
	const paths = import.meta.glob('/src/posts/**/post.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		// getting slug from path
		const slug = path.split('/').at(-2)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;

			// adding slug to the post data
			const post = { ...metadata, slug } satisfies Post;

			// checking if the post is published and then pushing it to list of available posts
			post.published && posts.push(post);
		}
	}

	// sorting posts in reverse chronological order
	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
