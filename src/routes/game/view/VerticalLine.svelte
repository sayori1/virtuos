<script lang="ts">
	import { getContext } from 'svelte';
	import { Graphics } from 'svelte-pixi';
	import type { ScoreContext } from './symbols';

	let score: ScoreContext = getContext('score');

	export let x = (score.accX += 1);
	const lineWidth = 2;
	const lineColor = 0x000000;

	let topY = (score.topPosition + 1) / 2;

	function drawLine(graphics: any) {
		graphics.lineStyle(lineWidth, lineColor);
		graphics.moveTo(0, topY * score.lineSpacing);
		graphics.lineTo(0, topY + score.height + score.lineSpacing);
	}
</script>

<Graphics x={x * score.noteSpacing} draw={drawLine} />
