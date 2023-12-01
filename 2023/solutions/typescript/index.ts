import Part1 from "./day-1/part-1";
import Part2 from "./day-1/part-2";

export default async function index() {
	const d1p1 = new Part1();
	const d1p2 = new Part2();

	console.log(`Day 1 - Part 1: ${await d1p1.solve()}`);
	console.log(`Day 1 - Part 2: ${await d1p2.solve()}`);
}

await index();
