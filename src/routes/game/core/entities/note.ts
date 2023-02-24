import { findDurationIndex, midiToPitch } from '../utils';

export class Note {
	duration: number;
	pitch: number;

	octave: number;
	relative: number;

	position: number;
	dies: boolean;

	label: string;
	symbolId: number;

	constructor(duration: number, pitch: number) {
		this.duration = duration;
		this.pitch = pitch;

		let note = midiToPitch(pitch);
		this.octave = note.octave;
		this.relative = note.relative;
		this.label = note.label;
		this.position = note.position;
		this.dies = note.dies;
		this.symbolId = findDurationIndex(this.duration)!;
	}
}
