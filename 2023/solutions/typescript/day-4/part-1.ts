import AOC from "../aoc";

export default class Part1 extends AOC {
	constructor() {
		super(4);

		this.lines = this.input.split("\n");
	}

	private readonly lines: string[];

	async solve(): Promise<number> {
		let value = 0;
		for (const line of this.lines) {
			const cardContent = line.split(":")[1].trim().split("|");
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

			if (matches > 0) {
				value += 2 ** (matches - 1);
			}
		}
		return value;
	}
}
