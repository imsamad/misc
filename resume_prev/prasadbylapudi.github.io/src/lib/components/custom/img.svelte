<script lang="ts">
	import { Image } from 'lucide-svelte';

	export let src: string;
	export let alt: string;

	// using alt to take width.. so that we don't have go through writing <img> element.
	// we can get away with using ![]()
	let desc: string;
	let width: string;
	if (alt) {
		[desc, width] = alt.split(':');
	}
</script>

<div class="mt-4 font-medium text-center">
	<div class="img-container relative w-[100%] mx-auto" style="max-width:{width};">
		<img {src} alt={desc} loading="lazy" />
	</div>
	{#if alt && desc}
		<p class="mt-1 md:mt-3 sm:text-sm md:text-base text-gray-500 align-middle">
			<Image class="inline align-middle mx-2" size={18} />
			{desc}
		</p>
	{/if}
</div>
<div class="separator sm:mt-2 md:mt-3 mb-4 !bg-gray-900" />

<style lang="scss">
	.img-container img {
		display: block;
		width: 100%;
		height: auto;
		object-fit: contain;
		max-width: 100%;
		max-height: 100%;
	}
</style>
