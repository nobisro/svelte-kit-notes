import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import db from '$lib/db';

// GET /notes/:uid.json
export const get: RequestHandler<Locals> = async (request) => {
	const { uid } = request.params;

	try {
		const note = await db.get_note_by_id(uid);

		return {
			status: note.status,
			body: note.data[0] // should only be one match
		};
	} catch ({ message }) {
		return {
			status: 400,
			message
		};
	}
};
