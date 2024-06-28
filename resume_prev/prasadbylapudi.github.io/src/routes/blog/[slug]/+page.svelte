<script lang="ts">
	import { formatDate, customFormatDistance } from '$lib/functions/helpers';
	import Toc from '$src/lib/components/Toc.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log('content::', data.content);
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<div
	class="container w-[98%] md:w-[90%] lg:w-[50%] lg:min-w-[800px] mx-auto px-4 md:px-0 text-white"
>
	<article>
		<!-- Title -->
		<hgroup class="mt-20">
			<p>
				<span class="text-sm lg:text-lg text-primary font-semibold uppercase"
					>{!data.meta.published ? 'Draft' : ''} Article</span
				>
				<span class="custom-gray-text mx-2">—</span>
				<span class="text-sm lg:text-lg custom-gray-text lowercase">20 min read</span>
			</p>
			<p class="text-white font-montserrat text-4xl md:text-6xl my-6 font-extrabold !leading-[1.3]">
				{data.meta.title}
			</p>
			<p class="text-gray-400 text-lg md:text-2xl mb-8 font-medium">{data.meta.description}</p>
		</hgroup>

		<div class="separator !bg-gray-800 my-4" />

		<!-- Tags -->
		<div class="tags">
			<div class="flex flex-row">
				<div class="basis-1/2 lg:basis-3/4">
					<div class="flex flex-row flex-wrap gap-x-4 gap-y-1">
						{#each data.meta.categories as category}
							<span class="text-primary capitalize font-jetbrains-mono text-sm font-semibold"
								>{category}</span
							>
						{/each}
					</div>
				</div>

				<div class="basis-1/2 lg:basis-1/4">
					<div class="text-gray-200 text-md text-right font-semibold">
						{formatDate(data.meta.date)}
					</div>
					<div class="custom-gray-text text-right text-xs md:text-sm mt-1">
						{customFormatDistance(new Date(data.meta.date))}
					</div>
				</div>
			</div>
		</div>

		<!-- Post -->
		<div class="my-10 blog selection:bg-gray-800">
			<svelte:component this={data.content} />
		</div>
	</article>
</div>

<style lang="scss">
	h1 {
		@apply text-white font-extrabold text-2xl md:text-4xl my-2 leading-8 md:leading-normal;
	}

	h2 {
		@apply text-white font-extrabold text-xl md:text-3xl my-2 leading-8 md:leading-normal;
	}

	h3 {
		@apply text-white hover:underline underline-offset-4 font-extrabold text-lg md:text-2xl my-2 leading-8 md:leading-normal;
	}
</style>
