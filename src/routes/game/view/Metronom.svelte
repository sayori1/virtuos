<script lang="ts">
	import { onMount } from 'svelte';

	const path = 'src/lib/sounds/1.wav';
	let i = 0;
	let audios = [new Audio(path), new Audio(path), new Audio(path), new Audio(path)];

	function play() {
		audios[i].play();
		i += 1;
		if (i >= audios.length) i = 0;
	}

	export let bpm = 60;
	export let changable: boolean = false;
	export let isActive: boolean = false;
	export let pulse: () => void;
	let timer: NodeJS.Timer | null = null;

	function startTimer() {
		if (timer != null) clearInterval(timer);
		timer = setInterval(() => {
			if (!isActive) return;
			pulse();
			play();
		}, 60000 / bpm);
	}

	onMount(() => {
		startTimer();
	});
</script>

<div style="width:200px; height:200px">
	<h3>Metronom BPM:{bpm}</h3>
	<input type="range" bind:value={bpm} min="0" max="200" on:change={startTimer} />
	<button style="margin:0 auto" on:click={() => (isActive = !isActive)}> play </button>
</div>
