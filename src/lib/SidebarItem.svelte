<script>
	import { goto } from '$app/navigation';
	import { formatDate } from '$lib/utils';

	export let item = {};
	export let selected;

	// NOTE: Variables declared via prop destructuring are not re-declared after subsequent prop changes. This explains why references to item.uuid are reactive, but not for let { uuid } = item.

	const handleClick = async () => {
		// Since I added the uuid column later, some items are missing them.
		if (item.uuid) {
			await goto(`/notes/${item.uuid}`);
		}
	};
</script>

<li on:click={handleClick} class="item" class:selected>
	<h4>{item.title}</h4>
	<p>{formatDate(item.updated_at)}</p>
</li>

<style>
	.item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		background-color: rgb(220, 220, 220);
		min-height: 4rem;
		margin: 1rem 0.5rem;
		border-radius: 8px;
		border: 2px solid transparent;
		padding: 0 0.5rem;
		width: 100%;

		/* transition-property: background-color;
		transition-delay: 0;
		transition-duration: 2000ms; */
	}

	.item:hover {
		background-color: rgb(187, 187, 187);
	}

	.item.selected {
		background-color: rgb(191, 243, 249);
		border: 2px solid rgb(20, 130, 247);

		transition-property: background-color;
		transition-delay: 0;
		transition-duration: 250ms;
	}

	h4 {
		font-weight: bolder;
		margin: 0.25rem;
	}

	p {
		margin: 0.25rem;
		padding: 0;
		font-size: 12px;
	}
</style>
