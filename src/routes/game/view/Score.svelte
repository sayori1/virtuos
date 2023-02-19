<script lang="ts">
	import { Graphics, Sprite } from 'svelte-pixi';
	import { setContext } from 'svelte';
	import Note from './Note.svelte';
	import Clef from './Clef.svelte';

	export let width = 700;
	export let lineSpacing = 20;
	export let tact = 1;
	export let noteSpacing = 20;
	export let noteLine = 25;

	let height = lineSpacing * 5;

	export let topLines = 2;
	export let bottomLines = 2;
	export let lines = 5;

	let topPosition = topLines * 2 - 1;
	let bottomPosition = topPosition + (lines - 1) * 2;

	let origin = bottomPosition + 2;

	setContext('score', {
		width,
		lineSpacing,
		height,
		noteSpacing,
		origin,
		bottomPosition,
		topPosition,
		noteLine
	});
</script>

<Graphics
	y={lineSpacing}
	x={20}
	draw={(graphics) => {
		graphics.lineStyle(1, 0x000000);
		for (let i = topLines; i < lines + topLines; i++) {
			graphics.moveTo(0, i * lineSpacing);
			graphics.lineTo(width, i * lineSpacing);
		}
	}}
>
	<Clef />
	<slot />
</Graphics>
