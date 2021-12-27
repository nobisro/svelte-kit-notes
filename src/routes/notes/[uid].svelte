<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import notes from '$lib/stores/notes';

	export const load: Load = async ({ fetch, page }) => {
		const { uid } = page.params;
		const res = await fetch(`/notes/${uid}.json`);
		const note = await res.json();

		notes.update((n) => ({
			...n,
			selectedId: uid,
			allnotes: {
				...n.allnotes,
				[uid]: note
			},
			mode: 'preview'
		}));

		// notes.update((n) => ({
		// 	...n,
		// 	selectedId: uid
		// }));

		return {};
	};
</script>

<script>
	import Notepad from '$lib/Notepad.svelte';
</script>

<Notepad />
