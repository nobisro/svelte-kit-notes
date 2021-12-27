<script lang="ts">
	let klass = '';
	export { klass as class };
</script>

<span class={`defaults ${klass}`}>
	hello
	<slot />
</span>

<style lang="postcss">
	.defaults {
		@apply text-red-500;
	}
</style>
