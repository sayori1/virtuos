<script>
	import { Application, Graphics, Text } from 'svelte-pixi';
	import Score from './Score.svelte';
</script>

<div style="display:flex;flex-direction:row; justify-content:center">
	<Application
		antialias
		resolution={window.devicePixelRatio}
		width={700}
		backgroundColor={0xffffff}
	>
		<Score />
	</Application>
</div>
