import { Note, generateRandomNoteInRange } from './note';

export class NoteSequence {
	notes: Note[];
	numNotes: number;
	generator: (i: number) => Note;

	constructor(numNotes: number, generator: (i: number) => Note) {
		this.notes = [];
		this.numNotes = numNotes;
		this.generator = generator;

		for (let i = 0; i < numNotes; i++) {
			const note = generator(i);
			this.notes.push(note);
		}
	}

	pop(): Note {
		this.notes.splice(0, 1);
		const newNote = this.generator(0);
		this.notes.push(newNote);
		return newNote;
	}
}
