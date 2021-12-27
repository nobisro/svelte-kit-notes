<script lang="ts">
	import { marked } from 'marked';
	import { formatDate } from '$lib/utils';
	import notes from './stores/notes';
	import TextArea from './TextArea.svelte';

	let newNoteText = '';
	let ref;

	const handleEditSave = async () => {
		if ($notes.mode === 'edit') {
			await handleTextSave();
			$notes.mode = 'preview';
		} else if ($notes.mode === 'preview') {
			$notes.mode = 'edit';
		} else if ($notes.mode === 'new') {
			await handleCreateNewNote();
			$notes.mode = 'preview';
		}
	};

	const handleCreateNewNote = async () => {
		const res = await fetch('/notes.json', {
			method: 'POST',
			body: JSON.stringify({ text: newNoteText })
		});

		if (res.ok) {
			const newNote = await res.json();

			$notes.allnotes[newNote.uuid] = newNote;
			$notes.selectedId = newNote.uuid;
		}
	};

	const handleTextSave = async () => {
		const res = await fetch('/notes.json', {
			method: 'POST',
			body: JSON.stringify(currentNote)
		});

		if (res.ok) {
			const savedNote = await res.json();

			$notes.allnotes[savedNote.uuid] = savedNote;
			$notes.selectedId = savedNote.uuid;
		}
	};

	const handleDelete = async () => {
		const res = await fetch('/notes.json', {
			method: 'DELETE',
			body: $notes.selectedId
		});

		if (res.ok) {
			delete $notes.allnotes[$notes.selectedId];
			$notes.selectedId = '';
		}
	};

	$: currentNote = $notes.allnotes[$notes.selectedId];
</script>

{#if !$notes.selectedId && $notes.mode !== 'new'}
	<div />
{:else}
	<section class="container">
		<div class="note-margin-ctn">
			<div class="note-header">
				{#if $notes.allnotes[$notes.selectedId]}
					<p class="date-text">
						last updated at: {formatDate(currentNote.updated_at)}
					</p>
					<div class="button-container">
						<button on:click={handleEditSave}>
							{['edit', 'new'].includes($notes.mode) ? 'Save' : 'Edit'}
						</button>
						<button class="delete" on:click={handleDelete}>Delete</button>
					</div>
				{:else if $notes.mode === 'new'}
					<p class="date-text">
						{formatDate(new Date().toString())}
					</p>
					<div class="button-container">
						<button on:click={handleEditSave}>
							{['edit', 'new'].includes($notes.mode) ? 'Save' : 'Edit'}
						</button>
						<button class="delete" on:click={handleDelete}>Delete</button>
					</div>
				{/if}
			</div>
			<section class="note">
				{#if $notes.mode === 'edit'}
					<!-- <textarea bind:value={currentNote.text} name="current note" /> -->
					<TextArea ref={currentNote} invalid={currentNote?.length > 10000}>
						<svelte:fragment slot="labelText">Note description</svelte:fragment>
						<svelte:fragment slot="invalidText">Maximum length exceeded</svelte:fragment>
					</TextArea>
				{:else if $notes.mode === 'new'}
					<!-- <textarea bind:value={newNoteText} name="new note" /> -->
					<TextArea ref={currentNote} />
				{:else if $notes.mode === 'preview' && currentNote}
					<div class="preview">
						{@html marked.parse(currentNote.text || '')}
					</div>
				{/if}
			</section>
		</div>
	</section>
{/if}

<style>
	section.container {
		margin: 2rem;
		width: 100%;
		height: calc(100vh - 5rem);
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 8px;
		border: 3px solid rgb(220, 218, 218);
	}

	.note-margin-ctn {
		padding: 2rem;
		width: 85%;
		height: 100%;
		overflow: scroll;
	}

	.note-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.date-text {
		width: 50%;
	}

	.button-container {
		display: flex;
		justify-content: flex-end;
		width: 50%;
		max-width: 12rem;
	}

	button {
		box-sizing: border-box;
		display: inline-block;
		width: 50%;
		max-width: 4rem;
		height: 2.5rem;
		padding: 0.25rem;
		border: 3px solid rgb(220, 218, 218);
		margin-left: 10%;
	}

	button.delete {
		border: 3px solid rgb(211, 182, 182);
	}

	button.delete:hover {
		background-color: rgb(211, 182, 182);
	}

	section.note {
		margin-top: 1rem;
		height: 75%;
		position: relative;
	}

	textarea {
		width: 100%;
		height: 100%;
		border: 2px solid saddlebrown;
		border-radius: 8px;
	}

	input {
		width: 100%;
		height: 100%;
	}
</style>
