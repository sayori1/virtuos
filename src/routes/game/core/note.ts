import { DURATIONS, solfege } from './const';

type NotationType = 'scientific' | 'solfege';

const currentNotation = solfege;

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

function midiToPitch(midi: number): {
	octave: number;
	relative: number;
	label: string;
	position: number;
	dies: boolean;
} {
	const octave = Math.floor((midi - 12) / 12);
	const relative = midi % 12;

	const { position, dies } = getPositionAndAccidental(relative);
	console.log(relative, position, dies);

	return { octave, relative, label: currentNotation[relative], position, dies };
}

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

export function generateRandomNoteInRange(
	minPitch: number,
	maxPitch: number,
	duration: number = 1.0
): Note {
	const pitch = Math.floor(Math.random() * (maxPitch - minPitch + 1)) + minPitch;
	const note = new Note(pitch, duration);
	return note;
}

export function getScale(tonic: number, gamma: number[]): Note[] {
	const tonicIndex = tonic;
	if (tonicIndex === -1) {
		throw new Error(`Invalid tonic: ${tonic}`);
	}
	const scale = [];
	for (let i = 0; i < gamma.length; i++) {
		const index = (tonicIndex + gamma[i]) % currentNotation.length;
		const octave = Math.floor((tonicIndex + gamma[i]) / currentNotation.length) + 4;
		const pitch = octave * 12 + getNoteValue(currentNotation[index]);
		const note = new Note(1, pitch);
		scale.push(note);
	}
	return scale;
}

export function getNoteValue(note: string): number {
	const index = currentNotation.indexOf(note);
	if (index === -1) {
		throw new Error(`Invalid note name: ${note}`);
	}
	return index;
}

export function getPositionAndAccidental(pitch: number): { position: number; dies: boolean } {
	const dieses = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
	const white = [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1];

	const position = white.slice(0, pitch).reduce((a, b) => a + b, 0);
	const dies = dieses[pitch % 12] === 1;
	return { position, dies };
}

export function findDurationIndex(value: number): number | undefined {
	return DURATIONS.findIndex((duration) => duration === value);
}

export function createMeasures(notes: Note[], maxDuration: number): Measure[] {
	const measures: Measure[] = [];
	let currentMeasure = new Measure(maxDuration);
	for (let i = 0; i < notes.length; i++) {
		const note = notes[i];
		if (currentMeasure.totalDuration + note.duration <= maxDuration) {
			currentMeasure.add(note);
		} else {
			measures.push(currentMeasure);
			currentMeasure = new Measure(maxDuration);
			currentMeasure.add(note);
		}
	}
	if (currentMeasure.notes.length > 0) {
		measures.push(currentMeasure);
	}
	return measures;
}
