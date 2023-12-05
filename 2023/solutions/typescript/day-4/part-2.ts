import AOC from "../aoc";

export default class Part2 extends AOC {
	constructor() {
		super(4);

		const lines = this.input.split("\n");
		const cards = lines.map((line) => line.split(":")[1].trim().split("|"));

		this.length = cards.length;
		this.counter = 0;
		this.guesses = [];
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
			this.guesses.push(1);
		}
	}

	private readonly length: number;
	private readonly matches: number[];
	private guesses: number[];

	private counter: number;

	async solve(): Promise<number> {
		for (let i = 0; i < this.length; i++) {
			const cardCount = this.guesses[i];
			this.counter += cardCount;

			const matchCount = this.matches[i];
			for (let j = 0; j < matchCount; j++) {
				this.guesses[i + j + 1] += cardCount;
			}
		}

		return this.counter;
	}
}
