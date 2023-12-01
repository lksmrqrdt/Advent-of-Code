import fs from "fs";

export default abstract class AOC {
	private day: number;

	constructor(day: number) {
		this.day = day;
	}

	async readInput(): Promise<string> {
		return await fs.promises.readFile(
			`../../inputs/day-${this.day}.txt`,
			"utf-8",
		);
	}
}
