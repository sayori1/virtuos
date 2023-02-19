import { Note, generateRandomNoteInRange } from "./note";

export class NoteSequence {
    notes: Note[];
    numNotes: number;
    minPitch: number;
    maxPitch: number;
    duration: number;
  
    constructor(numNotes: number, minPitch: number, maxPitch: number, duration: number) {
      this.notes = [];
      this.numNotes = numNotes;
      this.minPitch = minPitch;
      this.maxPitch = maxPitch;
      this.duration = duration;
  
      for (let i = 0; i < numNotes; i++) {
        const note = generateRandomNoteInRange(minPitch, maxPitch, duration);

        this.notes.push(note);
      }
    }
  
    pop(): Note {
      const firstNote = this.notes.shift()!;
      const newNote = generateRandomNoteInRange(this.minPitch, this.maxPitch, this.duration);
      this.notes.push(newNote);
      return firstNote;
    }
  }
  