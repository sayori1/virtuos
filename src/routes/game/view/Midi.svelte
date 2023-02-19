<script lang="ts">
	import { onMount } from 'svelte';
	import { midi, requestAccess } from '../core/midi';
	onMount(async () => {
		await requestAccess();
	});
</script>

{#if $midi}{/if}
