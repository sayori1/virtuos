<script>
	import { Application, Graphics, Text } from 'svelte-pixi';
	import { onMount } from 'svelte';
	import { requestAccess, setMidiHandler, midi } from '../core/midi';
	import Score from '../view/Score.svelte';
	import NoteComponent from '../view/Note.svelte';
	import { NoteSequence } from '../core/entities/sequence';
	import { Note } from '../core/entities/note';

	let sequence = new NoteSequence(8, (i) => {
		return new Note(1, 64);
	});

	onMount(async () => {
		await requestAccess();
		setMidiHandler($midi, (event) => {
			console.log(event.pitch, sequence.notes[0].pitch);
			if (event.type == 'whole' && sequence.notes[0].pitch == event.pitch) {
				sequence.pop();
				sequence.notes = sequence.notes;
			}
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
			{#each sequence.notes as note, i}
				<NoteComponent id={2} y={note.position} />
			{/each}
		</Score>
	</Application>
</div>
