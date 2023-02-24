import { DURATIONS, solfege } from './const';
import { Measure } from './entities/measure';
import { Note } from './entities/note';

type NotationType = 'scientific' | 'solfege';

const currentNotation = solfege;

export function randomInRange(from: number, to: number) {
	return from + Math.floor((to - from) * Math.random());
}

export function midiToPitch(midi: number): {
	octave: number;
	relative: number;
	label: string;
	position: number;
	dies: boolean;
} {
	const octave = Math.floor((midi - 12) / 12);
	const relative = midi % 12;
	const { position, dies } = getPositionAndAccidental(relative);

	return { octave, relative, label: currentNotation[relative], position, dies };
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

export function createMeasures(count: number, maxDuration: number): Measure[] {
	const measures: Measure[] = [];
	for (let i = 0; i < count; i++) {
		let durations = generateDurations();
		let currentMeasure = new Measure(maxDuration);
		durations.forEach((v) => {
			currentMeasure.add(new Note(v, 64));
		});
		measures.push(currentMeasure);
	}
	return measures;
}

export function generateDurations(): number[] {
	const durations = [1, 0.5, 0.25];
	const notes: number[] = [];
	let sum = 0;

	while (sum < 1) {
		const randomDuration = durations[Math.floor(Math.random() * durations.length)];
		const remainingSpace = 1 - sum;

		if (randomDuration <= remainingSpace) {
			notes.push(randomDuration);
			sum += randomDuration;
		}
	}

	return notes;
}
