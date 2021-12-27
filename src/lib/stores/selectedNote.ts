import { writable } from 'svelte/store';

const selectedNote = writable(null);

export default selectedNote;
