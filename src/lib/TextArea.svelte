<script>
	export let ref; // reference to HTML textarea element
	export let placeholder; // placeholder text
	export let invalid; // true to indicate invalid state
	export let disabled; // true to indicate disabled state
	export let name; // name attribute for text area
	export let id = `text-area--${Math.random().toString(36)}`;
</script>

<div on:click on:mouseover on:mouseenter on:mouseleave>
	<label for={id} hidden>
		<slot name="labelText" />
	</label>

	<textarea
		bind:value={ref.text}
		aria-invalid={!!invalid}
		{disabled}
		{name}
		{id}
		{placeholder}
		on:change
		on:input
		on:keydown
		on:keyup
		on:focus
		on:blur
	/>
	{#if invalid}
		<span class="text-area--invalid">
			<slot name="invalidText" />
		</span>
	{/if}
</div>

<style>
	.text-area--invalid {
		color: red;
	}

	div {
		height: 100%;
		width: 100%;
	}

	textarea {
		margin-top: 1rem;
		width: 100%;
		height: 100%;
		border: 2px solid saddlebrown;
		border-radius: 8px;
	}
</style>
