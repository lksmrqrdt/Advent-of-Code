import { bench, group, run } from "mitata";
import D1P1 from "./day-1/part-1";
import D1P2 from "./day-1/part-2";
import D2P1 from "./day-2/part-1";
import D2P2 from "./day-2/part-2";
import D3P1 from "./day-3/part-1";
import D3P2 from "./day-3/part-2";
import D4P1 from "./day-4/part-1";
import D4P2 from "./day-4/part-2";

group("Day 1", () => {
	bench("Part 1", async () => {
		await new D1P1().solve();
	});
	bench("Part 2", async () => {
		await new D1P2().solve();
	});
});

group("Day 2", () => {
	bench("Part 1", async () => {
		await new D2P1().solve();
	});
	bench("Part 2", async () => {
		await new D2P2().solve();
	});
});

group("Day 3", () => {
	bench("Part 1", async () => {
		await new D3P1().solve();
	});
	bench("Part 2", async () => {
		await new D3P2().solve();
	});
});

group("Day 4", () => {
	bench("Part 1", async () => {
		await new D4P1().solve();
	});
	bench("Part 2", async () => {
		await new D4P2().solve();
	});
});

await run({});
