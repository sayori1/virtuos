<script>
	import SightReading from './game/modes/sight_reading.svelte';
	import Midi from './game/view/Midi.svelte';
</script>

<svelte:head>
	<title>Virtuos</title>
	<meta name="Virtuos" content="Virtuos" />
</svelte:head>

<Midi />
{#await import('./game/modes/sight_reading.svelte') then app}
	<SightReading />
{/await}

<style>
</style>
