<script>
	import RythmReading from './game/modes/rythm_reading.svelte';
	import SightReading from './game/modes/sight_reading.svelte';
	import Metronom from './game/view/Metronom.svelte';
	import Midi from './game/view/Midi.svelte';
</script>

<svelte:head>
	<title>Virtuos</title>
	<meta name="Virtuos" content="Virtuos" />
</svelte:head>

<Midi />
{#await import('./game/modes/rythm_reading.svelte') then app}
	<RythmReading />
{/await}

<style>
</style>
