import { format } from 'date-fns';
import type { Note } from '$lib/types';

export const formatDate = (dateString: string) => format(new Date(dateString), 'PPpp');

export const sortRecentlyUpdated = (notes: Array<Note>) =>
	notes.sort(
		(a: Note, b: Note) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
	);

export const specialCharFilter = (t: string) => !['#', '*', '>'].includes(t);
