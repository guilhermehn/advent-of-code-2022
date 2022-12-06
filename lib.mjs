import fs from "node:fs";

export function readInput(file) {
	return fs.readFileSync(`./${file}.input.txt`).toString().trim();
}

export function breakLines(raw) {
	return raw.split("\r\n");
}
