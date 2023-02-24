import { writable, type Writable } from 'svelte/store';

export let midi: Writable<MIDIAccess | null> = writable(null);

function onMIDISuccess(midiAccess: MIDIAccess) {
	console.log('Successfully received MIDI access');
	midi.set(midiAccess);
	listInputsAndOutputs(midiAccess);
	startLoggingMIDIInput(midiAccess, 0);
}

function onMIDIFailure(msg: string) {
	console.error(`Failed to get MIDI access - ${msg}`);
}

export async function requestAccess(): Promise<void> {
	try {
		const midiAccess = await navigator.requestMIDIAccess();
		onMIDISuccess(midiAccess);
	} catch (error) {
		console.log('Failed to get MIDI access');
		onMIDIFailure(error as string);
	}
}

export function listInputsAndOutputs(midiAccess: MIDIAccess) {
	let info = '';

	for (const entry of midiAccess.inputs) {
		console.log(entry);
		const input = entry[1];
		let _info =
			`Input port [type:'${input.type}']` +
			` id:'${input.id}'` +
			` manufacturer:'${input.manufacturer}'` +
			` name:'${input.name}'` +
			` version:'${input.version}'`;
		console.log(_info);
		info += _info;
	}

	for (const entry of midiAccess.outputs) {
		const output = entry[1];
		let _info = `Output port [type:'${output.type}'] id:'${output.id}' manufacturer:'${output.manufacturer}' name:'${output.name}' version:'${output.version}'`;
		console.log(_info);
		info += _info;
	}
	return info;
}

export function onMIDIMessage(event: any) {
	let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data.length} bytes]: `;
	for (const character of event.data) {
		str += `0x${character.toString(16)} `;
	}
}

export function startLoggingMIDIInput(midiAccess: MIDIAccess, indexOfPort: number) {
	midiAccess.inputs.forEach((entry) => {
		entry.onmidimessage = onMIDIMessage;
	});
}

export function setMidiRawHandler(midiAccess: MIDIAccess, handler: (event: Event) => void) {
	midiAccess.inputs.forEach((entry) => {
		entry.onmidimessage = handler;
	});
}

export type MidiCommand = 'on' | 'off' | 'whole';

class MidiEvent {
	pitch: number;
	duration: number;
	velocity: number;
	type: MidiCommand;

	constructor(pitch: number, duration: number, velocity: number, type: MidiCommand) {
		this.pitch = pitch;
		this.duration = duration;
		this.velocity = velocity;
		this.type = type;
	}
}

export function setMidiHandler(midiAccess: MIDIAccess, handler: (event: MidiEvent) => void) {
	let buffer: MidiEvent[] = [];
	midiAccess.inputs.forEach((entry) => {
		entry.onmidimessage = (event) => {
			const [command, pitch, velocity] = event.data;

			if (command === 144 && velocity > 0) {
				let midiEvent = new MidiEvent(pitch, event.timeStamp, velocity, 'on');
				buffer.push(midiEvent);

				handler(midiEvent);
			} else if (command === 128) {
				const midiEvent = new MidiEvent(pitch, event.timeStamp, velocity, 'off');
				handler(midiEvent);

				let previousIndex = buffer.findIndex((e, i) => e.pitch == midiEvent.pitch);
				let previous = buffer[previousIndex];
				buffer.splice(previousIndex, 1);
				if (previous) {
					const midiEvent = new MidiEvent(
						pitch,
						event.timeStamp - previous.duration,
						previous.velocity,
						'whole'
					);
					handler(midiEvent);
				}
			}
		};
	});
}
