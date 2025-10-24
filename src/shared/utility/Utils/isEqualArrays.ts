export const isEqualArrays = (array1: Array<any> | undefined, array2: Array<any> | undefined) => {
	if (array1 === undefined && array2 === undefined) {
		return true;
	}

	if (array1 === undefined || array2 === undefined) {
		return false;
	}

	const array2Sorted = array2.slice().sort();
	return (
		array1.length === array2.length &&
		array1
			.slice()
			.sort()
			.every((value, index) => {
				return value === array2Sorted[index];
			})
	);
};
