<script lang="ts">
	import { insertHtml } from '$lib/functions/helpers';
	import type { Experience } from '$lib/types/main';

	export let experience: Experience;

	const { companyName, roles, description } = experience;

	let customDescription: string[] = description;
	let isExpanded: boolean;

	// change this to increase/decrease the number of lines to show
	// const maxDescriptionLength = 7;

	// disabling the limit for the time being
	const maxDescriptionLength = Infinity;

	if (description.length > maxDescriptionLength) {
		customDescription = description.slice(0, maxDescriptionLength);
		isExpanded = false;
	}
</script>

<div class="text-xl text-primary">{companyName}</div>
{#each roles as { role, period }}
	<div class="grid grid-rows-1 grid-flow-col">
		<div class="text-lg text-gray-200">{role}</div>
		<div class="text-md font-bold text-right date px-4 text-gray-200">
			{period}
		</div>
	</div>
{/each}
<div class="description">
	<div class="job-responsibilities mt-2 px-2">
		<ul class="text-gray-400 text-md">
			{#each customDescription as line}
				<li>{@html insertHtml(line)}</li>
			{/each}
		</ul>

		{#if description.length > maxDescriptionLength}
			<div class="w-full text-right">
				<button
					on:click={() => {
						customDescription = isExpanded
							? description.slice(0, maxDescriptionLength)
							: description;
						isExpanded = !isExpanded;
					}}
					class="text-primary !text-right text-sm font-semibold mt-2 relative custom-underline-effect-primary"
				>
					{#if isExpanded}
						Show less
					{:else}
						Show more..
					{/if}
				</button>
			</div>
		{/if}
	</div>
</div>
