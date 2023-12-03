import AOC from "../aoc";
import { getDigit } from "./util";

export default class Part1 extends AOC {
	constructor() {
		super(1);
		this.lines = this.input.split("\n");
	}

	private readonly lines: string[];

	async solve(): Promise<number> {
		const numbers = this.lines.map((line) => {
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
	}
}
