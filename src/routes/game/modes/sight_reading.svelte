<script>
	import { Application, Graphics, Text } from 'svelte-pixi';
	import { onMount } from 'svelte';
	import { requestAccess, setMidiHandler, midi } from '../core/midi';
	import Score from '../view/Score.svelte';
	import { NoteSequence } from '../core/sequence';
	import Note from '../view/Note.svelte';
	import { getNoteValue, getPositionAndAccidental, getScale } from '../core/note';
	import { MAJOR } from '../core/const';

	let notes = getScale(0, MAJOR);

	onMount(async () => {
		await requestAccess();
		setMidiHandler($midi, (event) => {
			console.log(event);
		});
	});
</script>

<div style="display:flex;flex-direction:row; justify-content:center">
	<Application
		antialias
		resolution={window.devicePixelRatio}
		width={700}
		backgroundColor={0xffffff}
	>
		<Score noteSpacing={50}>
			{#each notes as note, i}
				<Note id={0} x={4 + i} y={note.position} />
			{/each}
		</Score>
	</Application>
</div>
