import D1P1 from "./day-1/part-1";
import D1P2 from "./day-1/part-2";
import D2P1 from "./day-2/part-1";
import D2P2 from "./day-2/part-2";
import D3P1 from "./day-3/part-1";
import D3P2 from "./day-3/part-2";
import D4P1 from "./day-4/part-1";

export default async function index() {
	console.log(`Day 1 - Part 1: ${await new D1P1().solve()}`);
	console.log(`Day 1 - Part 2: ${await new D1P2().solve()}`);
	console.log(`Day 2 - Part 1: ${await new D2P1().solve()}`);
	console.log(`Day 2 - Part 2: ${await new D2P2().solve()}`);
	console.log(`Day 3 - Part 1: ${await new D3P1().solve()}`);
	console.log(`Day 3 - Part 2: ${await new D3P2().solve()}`);
	console.log(`Day 4 - Part 1: ${await new D4P1().solve()}`);
}

await index();
