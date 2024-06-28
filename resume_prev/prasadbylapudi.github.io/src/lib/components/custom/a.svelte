<script lang="ts">
	import { Link } from 'lucide-svelte';
	import { annotate } from 'svelte-rough-notation';
	export let href: string;
	let visible = false;
</script>

<a
	class="text-cyan-500"
	on:mouseenter={() => {
		visible = true;
	}}
	on:mouseleave={() => {
		visible = false;
	}}
	use:annotate={{
		type: 'underline',
		color: 'rgb(6 182 212)',
		animationDuration: 1000,
		iterations: 2,
		visible
	}}
	rel="external noopener noreferrer nofollow"
	target="_blank"
	{href}
>
	<!-- <Link size={12} class="inline" /> -->
	<slot />
</a>
