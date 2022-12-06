import { readInput, breakLines } from "./lib.mjs";

const [stacksRaw, instructionsRaw] = readInput("05").trim().split("\r\n\r\n");
const instructions = breakLines(instructionsRaw);

const [numbers, ...stacksData] = breakLines(stacksRaw)
	.map((x) => x.match(/.{3}\s?/g))
	.reverse();

function parseStacks(raw) {
	const stacks = {};

	for (let i = 0; i < numbers.length; i++) {
		const id = numbers[i].trim();
		stacks[id] = [];

		for (let j = 0; j < stacksData.length; j++) {
			const crate = stacksData[j][i].trim();
			if (Boolean(crate)) {
				stacks[id].push(crate);
			}
		}
	}

	return stacks;
}

const parseInstruction = (inst) => {
	const [, length, , a, , b] = inst.trim().split(" ");
	return [length, a, b];
};

const runInstrunction9000 = ([length, a, b], stacks) => {
	stacks[b].push(
		...stacks[a].splice(stacks[a].length - length, length).reverse()
	);
	return stacks;
};

const runInstrunction9001 = ([length, a, b], stacks) => {
	stacks[b].push(...stacks[a].splice(stacks[a].length - length, length));
	return stacks;
};

function main(data, fn) {
	const moved = instructions
		.map(parseInstruction)
		.reduce((stacks, instruction) => fn(instruction, stacks), data);

	const result = Object.values(moved)
		.map((stack) => stack[stack.length - 1])
		.join("")
		.replace(/\W/g, "");

	return result;
}

console.log("First", main(parseStacks(stacksData), runInstrunction9000));
console.log("Second", main(parseStacks(stacksData), runInstrunction9001));
