import AOC from "../aoc";
import { getDigit } from "./util";

export default class Part1 extends AOC {
	constructor() {
		super(1);
	}

	async solve(): Promise<number> {
		return super.readInput().then(input => {
			const lines = input.split("\n");
			const numbers = lines.map(line => {
				let l = 0;
				let r = line.length - 1;

				let firstDigit: number | undefined;
				while (firstDigit === undefined) {
					firstDigit = getDigit(line, l);
					l++;
				}

				let secondDigit: number | undefined;
				while (secondDigit === undefined) {
					secondDigit = getDigit(line, r);
					r--;
				}

				return firstDigit * 10 + secondDigit;
			});

			return numbers.reduce((a, b) => a + b);
		});
	}
}
