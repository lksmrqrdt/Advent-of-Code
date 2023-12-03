import AOC from "../aoc";

export default class Part2 extends AOC {
	constructor() {
		super(2);
	}

	private result = 0;

	private readonly regex = {
		game: /Game (?<game>\d+): (?<rounds>.*)/g,
		rounds: /(?:\d+ \w+,? ?)+;?/g,
		score: /(?<amount>\d+) (?<color>red|green|blue)/g,
	};

	async solve(): Promise<number> {
		const games = this.input.matchAll(this.regex.game);
		for (const round of games) {
			// biome-ignore lint/style/noNonNullAssertion: This is a valid assertion as the input is controlled
			const rounds = round.groups!.rounds;

			this.result += this.getGamePower(rounds);
		}

		return this.result;
	}

	private getGamePower(rounds: string): number {
		const maximum = {
			red: 0,
			green: 0,
			blue: 0,
		};

		const roundArray = rounds.matchAll(this.regex.rounds);
		for (const round of roundArray) {
			const score = round[0].matchAll(this.regex.score);

			for (const s of score) {
				switch (s.groups?.color) {
					case "red":
						maximum.red = Math.max(maximum.red, Number(s.groups.amount));
						break;
					case "green":
						maximum.green = Math.max(maximum.green, Number(s.groups.amount));
						break;
					case "blue":
						maximum.blue = Math.max(maximum.blue, Number(s.groups.amount));
						break;
				}
			}
		}

		return maximum.red * maximum.green * maximum.blue;
	}
}
