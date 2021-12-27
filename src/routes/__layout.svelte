<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import notes from '$lib/stores/notes';

	export const prerender = true;

	export const load: Load = async ({ fetch }) => {
		const response = await fetch('/notes.json');
		const allnotes = await response.json();

		notes.update((n) => ({
			...n,
			allnotes,
			selectedId: ''
		}));

		return {};
	};
</script>

<script>
	import Sidebar from '$lib/Sidebar.svelte';
	import { navigating } from '$app/stores';
</script>

<svelte:head>
	<title>Notes</title>
</svelte:head>

<main>
	<div class="ctn">
		<Sidebar />
		<slot />
	</div>
</main>

<style>
	:global(*) {
		font-family: 'Work Sans', 'Lora', 'Baloo Chettan 2', Izayoi Monospaced, Cambria, Cochin, Georgia,
			Times, 'Times New Roman', serif;
	}
	:global(body) {
		margin: 0;
		padding: 0;
	}
	.ctn {
		display: flex;
		width: 100%;
		background-color: rgb(232, 228, 228);
	}

	main {
		flex: 1;
		display: flex;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		background-color: white;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
