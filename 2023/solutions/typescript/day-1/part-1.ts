import AOC from "../aoc";

export default class Part1 extends AOC {
	constructor() {
		super(1);
	}

	async solve() {
		super.readInput().then((input) => {
			const lines = input.split("\n");
			const numbers = lines.map((line) => {
				let left = 0;
				let right = line.length - 1;

				while (Number.isNaN(parseInt(line[left]))) {
					left++;
				}

				while (Number.isNaN(parseInt(line[right]))) {
					right--;
				}

				return parseInt(line[left] + line[right]);
			});

			const result = numbers.reduce((a, b) => a + b);

			console.log(`The Result is: ${result}`);
		});
	}
}

const part1 = new Part1();
await part1.solve();
