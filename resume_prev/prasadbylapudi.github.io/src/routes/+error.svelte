<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="dark:bg-dark flex-grow flex items-center justify-center">
	<div class="grid grid-rows-2">
		<div class="p-4 text-center">
			<p class="text-5xl font-montserrat font-extrabold text-red-500">
				{$page.status} :
				{$page.error?.message}
			</p>
		</div>
		<div class="py-4 text-center">
			{#if $page.status === 404}
				<p class="text-3xl dark:text-white font-inter">
					Lost in the void? Fear not, go back <a
						class="underline-offset-8 underline dark:text-primary cursor-pointer custom-underline-effect-primary"
						href="/">home</a
					>
				</p>
			{/if}
		</div>
	</div>
</div>
