<script lang="ts">
	import { Graphics } from 'svelte-pixi';
	import type { Measure } from '../core/entities/measure';
	import NoteComponent from './Note.svelte';
	import VerticalLine from './VerticalLine.svelte';

	export let measure: Measure;
	console.log(measure.notes);
</script>

{#each measure.notes as note, i}
	<NoteComponent id={note.symbolId} y={note.position} />
{/each}

<VerticalLine />
