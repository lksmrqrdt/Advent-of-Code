import AOC from "../aoc";

export default class Part1 extends AOC {
	constructor() {
		super(4);

		const lines = this.input.split("\n");
		const cards = lines.map((line) => line.split(":")[1].trim().split("|"));

		this.length = lines.length;
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

		this.value = 0;
	}

	private readonly length: number;
	private readonly matches: number[];
	private value: number;

	async solve(): Promise<number> {
		for (let i = 0; i < this.length; i++) {
			const matches = this.matches[i];

			if (matches > 0) {
				this.value += 2 ** (matches - 1);
			}
		}

		return this.value;
	}
}
