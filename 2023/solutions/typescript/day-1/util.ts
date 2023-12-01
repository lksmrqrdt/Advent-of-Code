const numberLiterals = new Map<string, number>([
	["zero", 0],
	["one", 1],
	["two", 2],
	["three", 3],
	["four", 4],
	["five", 5],
	["six", 6],
	["seven", 7],
	["eight", 8],
	["nine", 9],
]);

export function getDigit(line: string, index: number): number | undefined {
	const result = parseInt(line[index]);
	if (!Number.isNaN(result)) {
		return result;
	}
}

export function getNumberLiteral(
	line: string,
	index: number,
): number | undefined {
	for (const literal of numberLiterals.keys()) {
		if (line.startsWith(literal, index)) {
			return numberLiterals.get(literal);
		}
	}
}
