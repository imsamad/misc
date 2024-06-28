<script lang="ts">
	import { scrollIntoView } from '$src/lib/functions/helpers';
	import { Milestone } from 'lucide-svelte';

	export let fab: boolean;
	export let sectionsRev: { name: string; route: string }[];
</script>

<div
	class="fab-container lg:!hidden"
	class:active={fab}
	on:click={() => {
		fab = !fab;
	}}
	on:keydown={(e) => {
		if (e.key === 'Escape') {
			fab = false;
		}
	}}
>
	<div class="fab shadow">
		<div class="fab-content">
			<Milestone class="text-primary absolute left-[20%] top-[20%]" size={32} absoluteStrokeWidth />
		</div>
	</div>
	{#each sectionsRev as { name, route }}
		<a
			href={route}
			class="sub-button shadow fab-opt"
			on:click={() => {
				scrollIntoView(route.substring(1));
			}}
		>
			<div class:hidden={!fab} class="btn-text">{name}</div>
		</a>
	{/each}
</div>

<div
	class="overlay"
	on:click={() => {
		fab = false;
	}}
	on:keydown={(e) => {
		if (e.key === 'Escape') {
			fab = false;
		}
	}}
	class:active={fab}
/>

<style lang="scss">
	.fab-container {
		cursor: default;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		user-select: none;
		position: absolute;
		bottom: 30px;
		right: 20px;
		&:hover {
			cursor: pointer;
		}
		&.active {
			height: 100%;
			.sub-button:nth-child(2) {
				transform: translateY(-80px);
			}
			.sub-button:nth-child(3) {
				transform: translateY(-140px);
			}
			.sub-button:nth-child(4) {
				transform: translateY(-200px);
			}
			.sub-button:nth-child(5) {
				transform: translateY(-260px);
			}
			.sub-button:nth-child(6) {
				transform: translateY(-320px);
			}
		}
		.fab {
			position: relative;
			height: 50px;
			width: 50px;
			border-radius: 50%;
			z-index: 3;
			@apply bg-gray-600;
		}
		.sub-button {
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: white;
			transition: all 0.3s ease;
			z-index: 2;
			&:hover {
				cursor: pointer;
				.icon {
					color: white;
					font-size: 30px;
				}
				.btn-text {
					color: white;
				}

				@apply bg-primary;
			}
			.icon {
				font-size: 26px;
				@apply text-primary;
			}
		}
	}

	.btn-text {
		position: absolute;
		right: -20px;
		top: -15px;
		transform: translateY(-50%);
		white-space: nowrap;
		padding: 0.4rem 0.6rem;
		@apply rounded-md bg-gray-600 text-primary;
	}

	.overlay {
		display: none;
	}

	.overlay.active {
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 100vh;
		background: rgba(0, 0, 0, 0.72);
		z-index: 1;
	}
</style>
