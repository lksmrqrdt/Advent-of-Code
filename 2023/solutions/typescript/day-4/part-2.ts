import AOC from "../aoc";

export default class Part1 extends AOC {
	constructor() {
		super(4);

		const lines = this.input.split("\n");
		const cards = lines.map((line) => line.split(":")[1].trim().split("|"));

		this.length = cards.length;
		this.counter = this.length;

		// Some cards have multiple white spaces between words, so we need to trim them
		// using a regex
		this.winners = cards.map((card) => new Set(card[0].trim().split(/\s+/)));
		this.guesses = cards.map((card) => new Set(card[1].trim().split(/\s+/)));

    this.queue = this.range(0, this.length);
	}

	private readonly length: number;
	private readonly winners: Set<string>[];
	private readonly guesses: Set<string>[];

  private queue: number[];
	private counter: number;

	async solve(): Promise<number> {
		while (this.queue.length > 0) {
			const currentElement = this.queue.pop();

			if (currentElement === undefined) {
				throw new Error("Queue is empty, but should not be!");
			}

			let matches = 0;
			for (const item of this.guesses[currentElement]) {
				if (this.winners[currentElement].has(item)) {
					this.queue.push(currentElement + matches + 1);
					matches += 1;
				}
			}

			this.counter += matches;
		}

		return this.counter;
	}

	private range(start: number, end: number) {
		return Array.from({ length: end - start }, (_v, k) => k + start);
	}
}
