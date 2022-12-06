import fs from 'node:fs'

const raw = fs.readFileSync('./01.input.txt').toString()

let elfsCount = 0
const elfs = []

raw.split('\r\n').forEach(line => {
	if (!line.length) {
		elfsCount++
	} else {
		elfs[elfsCount] = (elfs[elfsCount] ?? 0) + parseInt(line)
	}

})

console.log('First', Math.max(...elfs))
console.log('Second', elfs.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b))