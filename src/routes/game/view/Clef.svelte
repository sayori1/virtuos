<script lang="ts">
	import { Graphics, Text } from 'svelte-pixi';
	import { getContext } from 'svelte';
	import Note from './Note.svelte';
	import type { ScoreContext } from './symbols';
	const defaultFontSize = 26;

	let score: ScoreContext = getContext('score');
	let fontSize = 200;

	$: scale = fontSize / defaultFontSize;
</script>

<Note id={3} y={6} x={0} />
<Text
	text="4"
	height={score.lineSpacing * 3}
	width={score.lineSpacing * 1}
	y={((score.origin - 10) * score.lineSpacing) / 2}
	x={60}
	style={{
		fill: '0x000000',

		fontFamily: 'Montserrat',
		fontSize: fontSize
	}}
/>
<Text
	text="4"
	height={score.lineSpacing * 3}
	width={score.lineSpacing * 1}
	y={((score.origin - 6) * score.lineSpacing) / 2}
	x={60}
	style={{
		fill: '0x000000',

		fontFamily: 'Montserrat',
		fontSize: fontSize
	}}
/>
