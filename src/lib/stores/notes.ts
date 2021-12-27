import { writable } from 'svelte/store';
import type { NoteStore } from '$lib/types';

const store = writable<NoteStore>({
	selectedId: null,
	allnotes: [],
	mode: 'preview'
});

export default store;
