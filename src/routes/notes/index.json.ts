import db from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import { specialCharFilter } from '$lib/utils';

// POST /notes.json
export const post: RequestHandler<Locals> = async ({ body }) => {
	const note = JSON.parse(body + '');
	console.log('server received note:', note);
	const { text, id } = note;

	// title is just first line of text
	const title = text?.split(`\n`)[0].slice(0, 20);
	// remove markdown formatting to save actual text content
	const unformatted_title = title.split('').filter(specialCharFilter).join('').trim();
	// grab first fifty non special chars after title
	const short_description = text
		.split(`\n`)
		.slice(1)
		.filter(specialCharFilter)
		.slice(0, 50)
		.join('');

	try {
		let n;

		if (id) {
			n = await db.update_note(id, {
				text,
				title: unformatted_title,
				short_description
			});
		} else {
			n = await db.save_note({
				text,
				title: unformatted_title,
				short_description
			});
		}

		return {
			status: n.status,
			body: n?.data?.[0]
		};
	} catch (error) {
		console.log('server received error:', error.message);
		return {
			status: 400,
			message: error.message
		};
	}
};

// GET /notes.json
export const get: RequestHandler<Locals> = async (request) => {
	try {
		const notes = await db.get_all_notes();
		const allnotes = notes.data.reduce((record, note) => {
			return {
				...record,
				[note.uuid]: note
			};
		}, {});

		return {
			status: 200,
			body: allnotes
		};
	} catch (error) {
		return {
			status: 400,
			message: error.message,
			body: []
		};
	}
};

// DELETE /notes.json
export const del: RequestHandler<Locals> = async (request) => {
	try {
		const uuid = JSON.stringify(request.body);

		await db.delete_note(uuid);

		return {
			status: 200
		};
	} catch (error) {
		return {
			status: 400
		};
	}
};
