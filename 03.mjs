import fs from 'node:fs'

const raw = fs.readFileSync('./03.input.txt').toString()

const PRIORITY = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lines = raw.split('\r\n')

const rucksacks = lines.map(line => {
	return [line.slice(0, line.length / 2), line.slice(line.length / 2)]
}).map(([a, b]) => {
	for (let i = 0; i < a.length; i++) {
		if (b.indexOf(a[i]) > -1) {
			return a[i]
		}
	}
}).map(x => PRIORITY.indexOf(x) + 1).reduce((a, b) => a + b)



console.log('First', rucksacks)


const elfGroups = []
for (let i = 0; i < lines.length; i += 3) {
	elfGroups.push(lines.slice(i, i + 3))
}

console.log('Second', elfGroups.map(group => {
	const sorted = group.sort((a, b) => a.length - b.length)
	const smallest = group[0]

	for (let i = 0; i < smallest.length; i++) {
		if (group[1].indexOf(smallest[i]) > -1 && group[2].indexOf(smallest[i]) > -1) {
			return PRIORITY.indexOf(smallest[i]) + 1
		}
	}
}).reduce((a, b) => a + b))