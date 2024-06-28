<script lang="ts">
	import { annotate } from 'svelte-rough-notation';
	import { customFormatDistance } from '$lib/functions/helpers';
	import * as config from '$data/config';
	import type { PageData } from './$types';
	import { LayoutGrid, LayoutList, Rss } from 'lucide-svelte';

	export let data: PageData;
	let layout: 'list' | 'grid' = 'grid';

	const setLayout = (mode: 'grid' | 'list') => {
		if (layout !== mode) {
			layout = mode;
		}
	};

	// to control visible values of all notations
	let visible: { [slug: string]: boolean } = {};
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<div class="container sm:w-[95%] md:w-[95%] md:mt-20 lg:w-[60%] mx-auto px-4 md:px-0">
	<div class="grid grid-cols-2 my-4">
		<div class="text-gray-400 align-middle">
			<span class="font-inter font-extrabold align-middle">{data.posts.length} POSTS</span>
			<a target="_blank" href="/rss.xml">
				<Rss
					class="inline mx-2 align-middle active:scale-90 active:text-primary"
					size={16}
					strokeWidth={3}
				/>
			</a>
		</div>
		<div class="flex justify-end">
			<div class="align-middle">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span
					class:layout-active={layout === 'list'}
					class="text-gray-400"
					on:click={() => {
						setLayout('list');
					}}
				>
					<LayoutList
						class="inline mx-2 align-middle active:scale-90 cursor-pointer"
						size={18}
						strokeWidth={2}
					/>
				</span>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span
					class:layout-active={layout === 'grid'}
					class="text-gray-400"
					on:click={() => {
						setLayout('grid');
					}}
				>
					<LayoutGrid
						class="inline mx-2 align-middle active:scale-90 cursor-pointer"
						size={18}
						strokeWidth={2}
					/>
				</span>
			</div>
		</div>
	</div>

	<section>
		{#if data.posts.length === 0}
			<p class="text-2xl text-primary text-center mt-12 font-bold capitalize">no posts yet 🥲</p>
		{/if}

		{#if layout === 'list'}
			<div class="posts">
				{#each data.posts as post}
					<a
						id={post.slug}
						href={'/blog/' + post.slug}
						on:mouseenter={() => {
							visible[post.slug] = true;
							console.log('mouseenter::', visible);
						}}
						on:mouseleave={() => {
							visible[post.slug] = false;
							console.log('mouseleave::', visible);
						}}
					>
						<div class="post my-10">
							<p class="my-3 text-gray-500">
								<span class="text-sm font-semibold">
									{customFormatDistance(new Date(post.date))}</span
								>
								<span class="mx-2">·</span>
								<span class="text-sm font-semibold">20 min read</span>
							</p>
							<span class="flex justify-start">
								<p
									class:highlight-text={visible[post.slug] === true}
									use:annotate={{
										type: 'highlight',
										color: '#3ead85',
										animationDuration: 1000,
										iterations: 2,
										visible: visible[post.slug]
									}}
									class="text-gray-200 font-montserrat text-xl w-auto"
								>
									{post.title}
								</p>
							</span>
							<p class="description">{post.description}</p>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<div class="posts grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
				{#each data.posts as post}
					<a
						id={post.slug}
						href={'/blog/' + post.slug}
						on:mouseenter={() => {
							visible[post.slug] = true;
						}}
						on:mouseleave={() => {
							visible[post.slug] = false;
						}}
					>
						<div class="post my-6 mx-4">
							<p class="my-3 text-gray-500">
								<span class="text-sm font-semibold">
									{customFormatDistance(new Date(post.date))}</span
								>
								<span class="mx-2">·</span>
								<span class="text-sm font-semibold">20 min read</span>
							</p>

							<div class="my-4 relative img-container bg-gray-950">
								<img
									class="mx-auto my-auto w-[100%] h-[200px] object-scale-down"
									src={post.image}
									alt=""
								/>
							</div>

							<span class="flex justify-start">
								<p
									class:highlight-text={visible[post.slug] === true}
									use:annotate={{
										type: 'highlight',
										color: '#3ead85',
										animationDuration: 1000,
										iterations: 2,
										visible: visible[post.slug]
									}}
									class="text-gray-200 font-montserrat text-xl w-auto"
								>
									{post.title}
								</p>
							</span>
							<p class="description">{post.description}</p>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</section>
</div>

<style lang="scss">
	.layout-active {
		@apply text-primary;
	}

	.description {
		@apply text-gray-400 my-3 font-medium text-base lg:text-lg;
	}

	.highlight-text {
		@apply text-white;
	}
</style>
