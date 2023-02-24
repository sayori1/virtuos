import type { Note } from './note';

export class Measure {
	maxDuration: number;
	notes: Note[];
	totalDuration: number;

	constructor(maxDuration: number) {
		this.maxDuration = maxDuration;
		this.notes = [];
		this.totalDuration = 0;
	}

	add(note: Note): void {
		if (this.totalDuration + note.duration <= this.maxDuration) {
			this.notes.push(note);
			this.totalDuration += note.duration;
		} else {
			throw new Error('Measure is full.');
		}
	}
}
