import fs from "node:fs";

const raw = fs.readFileSync("./02.input.txt").toString();

const ROCK = Symbol("ROCK");
const PAPER = Symbol("PAPER");
const SCISSOR = Symbol("SCISSOR");

const RULES = {
	[ROCK]: { win: SCISSOR, lose: PAPER },
	[PAPER]: { win: ROCK, lose: SCISSOR },
	[SCISSOR]: {
		win: PAPER,
		lose: ROCK,
	},
};

const POINTS = {
	[ROCK]: 1,
	[PAPER]: 2,
	[SCISSOR]: 3,
};

const dict = {
	A: ROCK,
	X: ROCK,
	B: PAPER,
	Y: PAPER,
	C: SCISSOR,
	Z: SCISSOR,
};

const lines = raw.trim().split("\r\n");

function calcPoints(a, b) {
	if (RULES[b].win === a) {
		return POINTS[b] + 6;
	} else if (a === b) {
		return POINTS[b] + 3;
	} else {
		return POINTS[b];
	}
}

console.log(
	"First:",
	lines
		.map((x) => x.split(" ").map((y) => dict[y]))
		.map(([a, b]) => {
			return calcPoints(a, b);
		})
		.reduce((a, b) => a + b)
);

console.log(
	"Second:",
	lines
		.map((x) => x.split(" "))
		.map(([a, b]) => {
			const A = dict[a];
			switch (b) {
				case "X":
					return [A, RULES[A].win];
				case "Y":
					return [A, A];
				case "Z":
					return [A, RULES[A].lose];
			}
		})
		.map(([a, b]) => calcPoints(a, b))
		.reduce((a, b) => a + b)
);
