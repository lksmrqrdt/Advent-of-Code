import D1P1 from "./day-1/part-1";
import D1P2 from "./day-1/part-2";
import D2P1 from "./day-2/part-1";
import D2P2 from "./day-2/part-2";

export default async function index() {
	console.log(`Day 1 - Part 1: ${await new D1P1().solve()}`);
	console.log(`Day 1 - Part 2: ${await new D1P2().solve()}`);
	console.log(`Day 2 - Part 1: ${await new D2P1().solve()}`);
	console.log(`Day 2 - Part 2: ${await new D2P2().solve()}`);
}

await index();
