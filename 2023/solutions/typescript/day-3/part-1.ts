import AOC from "../aoc";

export default class Part1 extends AOC {
	constructor() {
		super(3);

		this.lines = this.input.split("\n");
		this.height = this.lines.length;
		this.width = this.lines[0].length;
	}

	private readonly lines: string[];
	private readonly height: number;
	private readonly width: number;

	async solve(): Promise<number> {
		return this.lines
			.map((line) => this.collectNumberRanges(line))
			.reduce((sum, ranges, i) => sum + this.calculateRow(ranges, i), 0);
	}

	private calculateRow(ranges: [number, number][], row: number): number {
		return ranges
			.filter((range) => this.checkSurroundings(range, row))
			.reduce((sum, range) => sum + this.calculateRange(range, row), 0);
	}

	private calculateRange(range: [number, number], row: number): number {
		const [start, end] = range;
		const numberString = this.lines[row].substring(start, end + 1);

		return Number.parseInt(numberString);
	}

	private checkSurroundings(range: [number, number], row: number): boolean {
		const [start, end] = range;

		for (let i = row - 1; i <= row + 1; i++) {
			if (i < 0 || i >= this.height) {
				continue;
			}

			for (let j = start - 1; j <= end + 1; j++) {
				if (j < 0 || j >= this.width) {
					continue;
				}

				const symbol = this.lines[i][j];
				if (symbol !== "." && !this.isDigit(symbol)) {
					return true;
				}
			}
		}

		return false;
	}

	private collectNumberRanges(line: string): [number, number][] {
		const result: [number, number][] = [];
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
				result.push([start, end]);
				start = undefined;
				end = undefined;
			}
		}

		return result;
	}

	private isDigit(char: string): boolean {
		return !Number.isNaN(parseInt(char));
	}
}
