import fs from "fs";

export default abstract class AOC {
	private readonly day: number;
	protected readonly input: string;

	constructor(day: number) {
		this.day = day;
		this.input = this.readInput();
	}

	readInput() {
		return fs.readFileSync(`../../inputs/day-${this.day}.txt`, "utf-8");
	}
}
