export function randomInRange(from: number, to: number) {
	return from + Math.floor((to - from) * Math.random());
}
