<!-- incomplete -->

<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	interface TocItem {
		id: string;
		lvl: number;
		value: string;
	}
	let items: TocItem[] = [];
	onMount(() => (items = getHeadings()));
	$: if (browser && $page.url.pathname) {
		items = getHeadings();
		console.log('toc::', items);
	}

	function getHeadings() {
		let items: TocItem[] = [];

		const pageHeadings = document.querySelectorAll(
			'.blog > h1, .blog > h2, .blog > h3, .blog > h4, .blog > h5, .blog > h6'
		);
		console.log('pageHeading::', pageHeadings);

		pageHeadings?.forEach((h) => {
			console.log(h.localName);
			items.push({
				id: h.id!,
				lvl: Number(h.localName.slice(1)),
				value: h.textContent!
			});
		});

		return items;
	}
</script>
