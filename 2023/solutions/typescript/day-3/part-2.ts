import AOC from "../aoc";

export default class Part2 extends AOC {
	constructor() {
		super(3);

		this.lines = this.input.split("\n");
		this.height = this.lines.length;
		this.width = this.lines[0].length;
		this.adjacentPositions = 2;
	}

	private readonly lines: string[];
	private readonly height: number;
	private readonly width: number;
	private readonly adjacentPositions: number;

	private numberPositions: number[][][] = [];

	async solve(): Promise<number> {
		this.numberPositions = this.lines.reduce((acc: number[][][], line) => {
			acc.push(this.collectNumberRanges(line));
			return acc;
		}, []);

		return this.lines.reduce(
			(acc: number, line, row) =>
				acc +
				this.collectGears(line).reduce(
					(sum, gearIndex) => sum + (this.multiplyGears(gearIndex, row) ?? 0),
					0,
				),
			0,
		);
	}

	private multiplyGears(gearIndex: number, row: number): number | undefined {
		// As we know, part numbers are unique. This way, we can prevent duplicates of neighbouring values with ease.
		const neighbors = new Set<number>();

		for (let i = row - 1; i <= row + 1; i++) {
			if (i < 0 || i >= this.height) {
				continue;
			}

			for (let j = gearIndex - 1; j <= gearIndex + 1; j++) {
				if (j < 0 || j >= this.width) {
					continue;
				}

				for (const range of this.numberPositions[i]) {
					if (range.includes(j)) {
						const number = range.map((digit) => this.lines[i][digit]).join("");
						neighbors.add(Number.parseInt(number));
					}
				}
			}
		}

		if (neighbors.size === this.adjacentPositions) {
			return Array.from(neighbors).reduce(
				(product, number) => product * number,
				1,
			);
		}

		return undefined;
	}

	private collectGears(line: string): number[] {
		const result = [];

		for (let i = 0; i < line.length; i++) {
			if (line[i] === "*") {
				result.push(i);
			}
		}

		return result;
	}

	private collectNumberRanges(line: string): number[][] {
		const result: number[][] = [];
		let start: number | undefined;
		let end: number | undefined;

		for (let i = 0; i < line.length; i++) {
			if (start === undefined && this.isDigit(line[i])) {
				start = i;
			}

			if (start !== undefined && this.isDigit(line[i])) {
				end = i;
			}

			if (
				start !== undefined &&
				end !== undefined &&
				// Edge case: last number in line. without any non-digit symbols after it
				(!this.isDigit(line[i]) || i === line.length - 1)
			) {
				result.push(this.range(start, end + 1));
				start = undefined;
				end = undefined;
			}
		}

		return result;
	}

	private range(start: number, end: number) {
		return Array.from({ length: end - start }, (_v, k) => k + start);
	}

	private isDigit(char: string): boolean {
		return !Number.isNaN(parseInt(char));
	}
}
