import AOC from "../aoc";

export default class Part1 extends AOC {
	constructor() {
		super(4);

		const lines = this.input.split("\n");
		const cards = lines.map((line) => line.split(":")[1].trim().split("|"));

		this.length = cards.length;
		this.counter = this.length;
		this.queue = this.range(0, this.length);
		this.matches = [];

		// Some cards have multiple white spaces between words, so we need to trim them
		// using a regex
		const winners = cards.map((card) => new Set(card[0].trim().split(/\s+/)));
		const guesses = cards.map((card) => new Set(card[1].trim().split(/\s+/)));

		for (let i = 0; i < this.length; i++) {
			let matchCount = 0;

			for (const item of winners[i]) {
				if (guesses[i].has(item)) {
					matchCount += 1;
				}
			}

			this.matches.push(matchCount);
		}
	}

	private readonly length: number;
	private readonly matches: number[];

	private queue: number[];
	private counter: number;

	async solve(): Promise<number> {
		while (this.queue.length > 0) {
			const currentElement = this.queue.pop();

			if (currentElement === undefined) {
				throw new Error("Queue is empty, but should not be!");
			}

			const matches = this.matches[currentElement];
			for (let i = 0; i < matches; i++) {
				this.queue.push(currentElement + i + 1);
			}

			this.counter += matches;
		}

		return this.counter;
	}

	private range(start: number, end: number) {
		return Array.from({ length: end - start }, (_v, k) => k + start);
	}
}
