<script lang="ts">
	import socialLinks from '$data/social-links';
	import about from '$data/about';
	import { Github, Linkedin, Twitter, LayoutGrid, LayoutList, Rss } from 'lucide-svelte';
	import { annotate } from 'svelte-rough-notation';
	import { customFormatDistance } from '$lib/functions/helpers';
	import type { PageData } from './$types';
	import SpotifyCurrent from '$src/lib/components/SpotifyCurrent.svelte';
	import { browser } from '$app/environment';
	import { getCurrentPlaying, getRecentTracks } from '$src/lib/functions/spotify';

	export let data: PageData;
	console.log('data::', data);
	const { accessToken } = data.server;
	let layout: 'list' | 'grid' = 'grid';

	const setLayout = (mode: 'grid' | 'list') => {
		if (layout !== mode) {
			layout = mode;
		}
	};

	let visible: { [slug: string]: boolean } = {};

	async function getCurrentTrack() {
		let track: { is_playing?: boolean; item: any; context: any };
		try {
			let currentTrack = await getCurrentPlaying(accessToken);
			if (!currentTrack) {
				currentTrack = await getRecentTracks(accessToken);
				track = {
					context: currentTrack.items[0].context,
					item: currentTrack.items[0].track
				};
			} else {
				track = {
					context: currentTrack.context,
					item: currentTrack.item,
					is_playing: currentTrack.is_playing
				};
			}
			console.log('track::', track);
			return track;
		} catch (err) {
			console.log('Err::', err);
		}
	}
</script>

<svelte:head>
	<title>{about.name}</title>
</svelte:head>

<div class="flex-grow p-0 m-0 text-white">
	<div class="cust-container mx-auto">
		<div id="left" class="left px-4 md:px-8 lg:px-8">
			<div class="container lg:mx-auto lg:mt-20 mt-14">
				<p class="text-4xl lg:text-4xl font-montserrat mt-2 mb-0 uppercase name">{about.name}</p>
				<p class="text-lg font-montserrat mt-1 mb-2 text-gray-300">
					{about.subHead}
				</p>
				<p class="text-lg font-inter text-gray-300 w-4/5">
					{about.desc}
				</p>
			</div>

			<div class="my-4 lg:w-[25%] hidden lg:block">
				<div class="grid grid-cols-4">
					<a
						class="mr-3 text-gray-600 hover:text-gray-300"
						target="_blank"
						rel="external noopener noreferrer"
						data-sound-hover="pop"
						data-sound-click="click"
						href={socialLinks.github}
					>
						<Github strokeWidth={2} />
					</a>
					<a
						class="mr-3 text-gray-600 hover:text-gray-300"
						target="_blank"
						rel="external noopener noreferrer"
						data-sound-hover="pop"
						data-sound-click="click"
						href={socialLinks.linkedIn}
					>
						<Linkedin strokeWidth={2} />
					</a>
					<a
						class="mr-3 text-gray-600 hover:text-gray-300"
						target="_blank"
						rel="external noopener noreferrer"
						data-sound-hover="pop"
						data-sound-click="click"
						href={socialLinks.twitter}
					>
						<Twitter strokeWidth={2} />
					</a>

					<a
						class="mr-3 text-gray-600 hover:text-gray-300"
						target="_blank"
						rel="external noopener noreferrer"
						data-sound-hover="pop"
						data-sound-click="click"
						href="/rss.xml"
					>
						<Rss strokeWidth={2} />
					</a>
				</div>
			</div>

			{#if browser}
				<div class="w-[350px] absolute bottom-12 hidden lg:block">
					{#await getCurrentTrack()}
						<SpotifyCurrent track={undefined} />
					{:then track}
						{#if track}
							<SpotifyCurrent {track} />
						{/if}
					{:catch error}
						<p style="color: red">{error.message}</p>
					{/await}
				</div>
			{/if}
		</div>

		<div id="right" class="right text-black d-flex px-4 md:px-8 lg:mt-12">
			<div class="grid grid-cols-2 my-4">
				<div class="text-gray-400 align-middle">
					<!-- <span class="font-inter font-extrabold align-middle"
						>{data.posts.length} {data.posts.length === 1 ? 'POST' : 'POSTS'}</span
					>
					<a target="_blank" href="/rss.xml">
						<Rss
							class="inline mx-2 align-middle active:scale-90 active:text-primary"
							size={16}
							strokeWidth={3}
						/>
					</a> -->
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
					<p class="text-2xl text-primary text-center mt-12 font-bold capitalize">
						no posts yet 🥲
					</p>
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
					<div class="posts grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
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
	</div>
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
