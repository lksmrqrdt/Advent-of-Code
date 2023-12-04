import AOC from "../aoc";

export default class Part1 extends AOC {
	constructor() {
		super(4);

		this.lines = this.input.split("\n");
	}

	private readonly lines: string[];

	async solve(): Promise<number> {
		let counter = this.lines.length;
		const queue: number[] = this.range(0, this.lines.length);

		while (queue.length > 0) {
			// We don't need an actual queue, we just need to pop the first element.
			// queue.pop() is O(1), while queue.shift() is O(n).
			const currentElement = queue.pop();

			if (currentElement === undefined) {
				throw new Error("Queue is empty, but should not be!");
			}

			const cardContent = this.lines[currentElement]
				.split(":")[1]
				.trim()
				.split("|");
			// Some cards have multiple white spaces between words, so we need to trim them
			// using a regex
			const winning = new Set(cardContent[0].trim().split(/\s+/));
			const guessed = new Set(cardContent[1].trim().split(/\s+/));

			let matches = 0;
			for (const item of guessed) {
				if (winning.has(item)) {
					matches += 1;
				}
			}

			for (let i = 0; i < matches; i++) {
				queue.push(currentElement + i + 1);
			}

			counter += matches;
		}

		return counter;
	}

	private range(start: number, end: number) {
		return Array.from({ length: end - start }, (_v, k) => k + start);
	}
}
