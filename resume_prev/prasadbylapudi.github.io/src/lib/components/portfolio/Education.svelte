<script lang="ts">
	import { insertHtml } from '$src/lib/functions/helpers';
	import type { Education } from '$src/lib/types/main';
	export let education: Education;

	const { universityName, qualification, stream, period, description } = education;
</script>

<div class="text-xl text-primary">{universityName}</div>
<div class="grid grid-rows-1 grid-flow-col">
	<div class="text-lg text-gray-200">
		{qualification} in {stream}
	</div>
	<div class="text-md font-bold text-right date px-4 text-gray-200">
		{period}
	</div>
</div>
{#each description as line}
	<div class="description">
		<div class="job-responsibilities mt-2 px-2">
			<ul class="text-gray-400">
				<li>
					{@html insertHtml(line)}
				</li>
			</ul>
		</div>
	</div>
{/each}
