/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Locals {
	userid: string;
}

export interface Note {
	uuid: string;
	id: string;
	title: string;
	text: string;
	short_description: string;
	created_at: string;
	updated_at: string;
}

export interface NoteStore {
	selectedId: string | null;
	allnotes: Array<Note>;
	mode: NotepadModes;
}

export type NoteData = Pick<Note, 'title' | 'text' | 'short_description'>;

export type NotepadModes = 'preview' | 'edit' | 'new';
