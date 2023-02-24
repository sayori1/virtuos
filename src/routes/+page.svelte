<script>
	import RythmImitation from './game/modes/rythm_imitation.svelte';
	import RythmImitationWithMeasures from './game/modes/rythm_imitation_with_measures.svelte';
	import Midi from './game/view/Midi.svelte';
</script>

<svelte:head>
	<title>Virtuos</title>
	<meta name="Virtuos" content="Virtuos" />
</svelte:head>

<Midi />
{#await import('./game/modes/rythm_imitation_with_measures.svelte') then app}
	<RythmImitationWithMeasures />
{/await}

<style>
</style>
