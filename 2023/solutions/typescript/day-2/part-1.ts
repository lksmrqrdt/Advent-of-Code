import AOC from "../aoc";

export default class Part1 extends AOC {
	constructor() {
		super(2);
	}

	private maxValid = {
		red: 12,
		green: 13,
		blue: 14,
	};

	private regex = {
		game: /Game (?<game>\d+): (?<rounds>.*)/g,
		rounds: /(?:\d+ \w+,? ?)+;?/g,
		score: /(?<amount>\d+) (?<color>red|green|blue)/g,
	};

	private validGamesSum = 0;

	async solve() {
		super
			.readInput()
			.then((input) => {
				const games = input.matchAll(this.regex.game);
				for (const round of games) {
					const game = round.groups!.game;
					const rounds = round.groups!.rounds;

					if (this.validateRounds(rounds)) {
						this.validGamesSum += Number.parseInt(game);
					}
				}
			})
			.finally(() => {
				console.log(this.validGamesSum);
			});
	}

	private validateRounds(rounds: string): boolean {
		const roundArray = rounds.matchAll(this.regex.rounds);

		for (const round of roundArray) {
			const score = round[0].matchAll(this.regex.score);

			for (const s of score) {
				if (
					(s.groups?.color === "red" &&
						Number(s.groups.amount) > this.maxValid.red) ||
					(s.groups?.color === "green" &&
						Number(s.groups.amount) > this.maxValid.green) ||
					(s.groups?.color === "blue" &&
						Number(s.groups.amount) > this.maxValid.blue)
				) {
					return false;
				}
			}
		}
		return true;
	}
}

new Part1().solve();
