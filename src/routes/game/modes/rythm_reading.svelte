<script lang="ts">
	import { Application, Graphics, Text } from 'svelte-pixi';
	import { onMount } from 'svelte';
	import { requestAccess, setMidiHandler, midi } from '../core/midi';
	import Score from '../view/Score.svelte';
	import { findDurationIndex, Note } from '../core/note';
	import { DURATIONS, MAJOR } from '../core/const';
	import NoteComponent from '../view/Note.svelte';
	import { NoteSequence } from '../core/sequence';
	import { randomInRange } from '../core/utils';
	import Metronom from '../view/Metronom.svelte';

	let notes: Note[] = Array.from({ length: 10 }).map((i) => {
		return new Note(
			DURATIONS[randomInRange(0, DURATIONS.length)],
			60 + MAJOR[randomInRange(0, MAJOR.length)]
		);
	});

	onMount(async () => {
		refresh();
		await requestAccess();
		setMidiHandler($midi, (event) => {});
	});

	function refresh() {
		notes.forEach((note) => {
			note.duration = DURATIONS[randomInRange(0, DURATIONS.length)];
			note.symbolId = findDurationIndex(note.duration)!;
		});
		notes = notes;
		duration = 0;
		active = 0;
		console.log('refresh!');
	}

	let duration = 0;
	let active = 0;

	function getActive() {
		let currentDuration = 0;
		for (let i = 0; i < notes.length - 1; i++) {
			currentDuration += notes[i].duration;
			if (currentDuration + notes[i + 1].duration > duration) {
				return i + 1;
			}
		}
		refresh();
		return 0;
	}
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
				<NoteComponent bind:id={note.symbolId} y={2} isActive={active == i} />
			{/each}
		</Score>
	</Application>
	<Metronom
		pulse={() => {
			duration += 1 / 4;
			active = getActive();
		}}
	/>
</div>
