import { createClient } from '@supabase/supabase-js';
import { v4 } from '@lukeed/uuid';
import env from 'dotenv';
import type { NoteData } from '$lib/types';

env.config();

const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`);

const db = {
	save_note: function (data: NoteData) {
		const { text, title, short_description } = data;
		return supabase.from('notes').insert([{ title, text, short_description, uuid: v4() }]);
	},
	update_note: function (id: number, data: NoteData) {
		const { text, title, short_description } = data;
		return supabase
			.from('notes')
			.update({ text, title, short_description, updated_at: new Date() })
			.match({ id });
	},
	get_all_notes: async function () {
		return supabase.from('notes').select();
	},
	get_note_by_id: function (uuid: string) {
		return supabase.from('notes').select().eq('uuid', uuid);
	},
	delete_note: function (uuid: string) {
		return supabase.from('notes').delete().match({ uuid });
	}
};

export default db;
