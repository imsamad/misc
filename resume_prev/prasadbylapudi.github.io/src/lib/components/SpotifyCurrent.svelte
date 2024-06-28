<script lang="ts">
	export let track: { is_playing?: boolean; item: any; context: any } | undefined;
	export let className = '';
	export { className as class };
</script>

{#if track}
	<div class={className}>
		{#if track.is_playing}
			<p class="text-sm text-primary font-semibold capitalize">now listening :</p>
		{:else}
			<p class="text-sm text-gray-400 font-semibold capitalize">last played :</p>
		{/if}
		<div
			class="relative shadow my-2 max-w-full md:max-w-sm w-full bg-gray-900 rounded-sm"
			id={track.item.id}
		>
			<div class="flex gap-x-4 my-auto mx-auto">
				<div>
					<img src={track.item.album.images[2].url} class="h-[70px] w-[70px] rounded-sm" alt="" />
				</div>
				<div class="my-1 w-[240px]">
					<p class=" text-base font-bold line-clamp-1">{track.item.name}</p>
					<p class="text-sm text-gray-400">{track.item.artists[0].name}</p>
				</div>
				<div class="absolute right-[0.6rem] bottom-[0.6rem]">
					<a
						href={track.item.external_urls.spotify}
						target="_blank"
						rel="external noopener noreferrer"
					>
						<img
							class="w-[24px] h-[24px] bg-gray-950"
							src="assets/icons/Spotify_Icon_RGB_Green.png"
							alt=""
						/>
					</a>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="relative shadow my-2 rounded-md max-w-full md:max-w-sm w-full bg-gray-900">
		<div class="animate-pulse flex gap-x-4">
			<div class="bg-slate-700 h-[70px] w-[70px]" />
			<div class="absolute right-[0.6rem] bottom-[0.6rem]">
				<div class="rounded-full w-[24px] h-[24px] bg-slate-700" />
			</div>
		</div>
	</div>
{/if}
