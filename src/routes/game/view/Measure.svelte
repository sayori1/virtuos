<script lang="ts">
	import { Graphics } from 'svelte-pixi';
	import type { Measure } from '../core/note';
	import NoteComponent from './Note.svelte';
	import VerticalLine from './VerticalLine.svelte';

	export let measure: Measure;
</script>

{#each measure.notes as note, i}
	<NoteComponent id={0} y={note.position} />
{/each}

<VerticalLine />
