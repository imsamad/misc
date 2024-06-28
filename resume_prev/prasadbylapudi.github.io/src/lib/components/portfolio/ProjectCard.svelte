<script lang="ts">
	import type { Project } from '$lib/types/main';
	import { ExternalLink, Github } from 'lucide-svelte';
	export let project: Project;
	const { name, description, links } = project;
</script>

<div class="project-card bg-gray-900">
	<h3 class="project-title">{name}</h3>
	<p class="project-description text-gray-400">
		{description}
	</p>
	<div class="flex justify-between mt-3">
		{#each links as { name, link }}
			{#if name === 'github'}
				<a
					class="text-gray-700 hover:text-gray-300"
					rel="external noopener noreferrer"
					target="_blank"
					href={link}
				>
					<Github />
				</a>
			{:else if name === 'demo'}
				<a
					class="text-gray-700 hover:text-gray-300"
					rel="external noopener noreferrer"
					target="_blank"
					href={link}
				>
					<ExternalLink />
				</a>
			{/if}
		{/each}
	</div>
</div>
