import { readInput, breakLines } from "./lib.mjs";

const raw = breakLines(readInput("04"));

const sum = (a, b) => a + b;

const contains = (a, b) => a[0] >= b[0] && a[1] <= b[1];
const overlap = (a, b) =>
	(a[0] >= b[0] && a[0] <= b[1]) || (a[1] >= b[0] && a[1] <= b[1]);

const parse = (raw) =>
	raw.map((x) => x.split(",").map((y) => y.split("-").map((z) => parseInt(z))));

const lines = parse(raw);

console.log(
	"First",
	lines.filter((pairs) => contains(...pairs) || contains(...pairs.reverse()))
		.length
);

console.log(
	"Second",
	lines.filter((pairs) => overlap(...pairs) || overlap(...pairs.reverse()))
		.length
);
