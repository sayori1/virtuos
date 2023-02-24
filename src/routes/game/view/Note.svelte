<script lang="ts">
	import { Texture } from 'pixi.js';
	import { getContext } from 'svelte';
	import { Graphics, Sprite, Text } from 'svelte-pixi';
	import { MUSIC_SYMBOLS, type ScoreContext } from './symbols';
	let score: ScoreContext = getContext('score');

	export let id: number = 0;

	export let x = (score.accX += 1);
	export let y = 0;

	export let offsetX = 0;

	export let isActive = false;
	export let activeCircleColor = 0x000000;

	$: symbol = MUSIC_SYMBOLS[id];
	$: realX = x * score.noteSpacing + offsetX;
	$: realY = ((score.origin - y) * score.lineSpacing) / 2;

	$: isIn5Lines = score.origin + y <= score.bottomPosition && score.origin + y >= score.topPosition;
	$: isOut5Lines = !isIn5Lines;
	$: onLine =
		(score.bottomPosition % 2 == 0 && (score.origin + y) % 2 == 0) ||
		(score.bottomPosition % 2 == 1 && (score.origin + y) % 2 == 1);

	$: scale = (score.lineSpacing / MUSIC_SYMBOLS[id].size.y) * symbol.scale;
</script>

<Sprite
	texture={Texture.from(symbol.path)}
	{scale}
	x={realX + symbol.offset.x * score.noteSpacing}
	y={realY + symbol.offset.y * score.lineSpacing}
>
	<slot />
	{#if true}
		<Graphics
			scale={1 / scale}
			draw={(graphics) => {
				graphics.clear();
				let center = { x: (symbol.size.x / 2) * scale, y: score.lineSpacing / 2 };
				let drawLine = (y) => {
					let ry = (y * score.lineSpacing) / 2 - symbol.offset.y * score.lineSpacing;

					graphics.lineStyle(1, 0x000000);
					graphics.moveTo(center.x, center.y + ry);
					graphics.lineTo(center.x + symbol.size.x * scale * 0.8, center.y + ry);
					graphics.lineTo(center.x - symbol.size.x * scale * 0.8, center.y + ry);
				};

				let aY = score.origin - y;

				let topLine = score.topPosition;
				let bottomLine = score.bottomPosition;

				for (let y = bottomLine; y < aY + 1; y += 2) {
					let rY = y - aY;
					drawLine(rY);
				}

				for (let y = topLine; y > aY - 1; y -= 2) {
					let rY = y - aY;
					drawLine(rY);
				}
			}}
		/>
		{#if isActive}
			<Graphics
				scale={1 / scale}
				draw={(graphics) => {
					graphics.clear();
					let center = { x: (symbol.size.x / 2) * scale, y: score.lineSpacing / 2 };
					graphics.beginFill(activeCircleColor);
					graphics.drawCircle(center.x, center.y + 70, 5);
					graphics.endFill();
				}}
			/>
		{/if}
	{/if}
</Sprite>
