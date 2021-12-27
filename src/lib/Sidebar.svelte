<script lang="ts">
	import SidebarItem from './SidebarItem.svelte';
	import notes from '$lib/stores/notes';
	import { sortRecentlyUpdated } from '$lib/utils';

	$: sorted = sortRecentlyUpdated(Object.values($notes.allnotes));

	const handleNewNoteClick = () => {
		$notes.selectedId = null; // switch to null after the null note is deleted
		$notes.mode = 'new';
	};
</script>

<nav>
	<h3>SVELTE NOTES</h3>
	<div class="sidebar-actions-container">
		<input type="text" name="search" placeholder="search" />
		<button on:click={handleNewNoteClick}>new</button>
	</div>
	<br />
	<ul>
		{#if sorted?.length}
			{#each sorted as item}
				<SidebarItem {item} selected={$notes.selectedId === item.uuid} />
			{/each}
		{/if}
	</ul>
</nav>

<style>
	nav {
		width: 33%;
		max-width: 14rem;
		height: 99vh;
		padding: 0.5rem;
		background-color: white;
		border-right: 3px solid rgb(220, 218, 218);
		overflow-y: scroll;
	}

	h3 {
		display: flex;
		justify-content: center;
	}

	.sidebar-actions-container {
		display: flex;
		height: 2rem;
		justify-content: space-around;
		align-items: center;
	}

	ul {
		list-style: none;
		padding: 0;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	input,
	button {
		box-sizing: border-box;
		display: inline-block;
		width: 40%;
		height: 2.5rem;
		padding: 0.25rem;
		border: 3px solid rgb(220, 218, 218);
	}
</style>
