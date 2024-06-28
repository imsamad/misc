import type { Post } from '$lib/types/main';

export async function load({ fetch, data }) {
	const response = await fetch('api/posts');
	const posts: Post[] = await response.json();
	return { server: data, posts };
}
