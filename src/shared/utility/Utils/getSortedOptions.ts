export const getSortedPersonOptions = <T extends { id: number; name: string }>(
	[...options]: T[],
	selectedOptions: T[] = [],
	sortType = 'default'
): T[] => {
	const selectedOptionsIds = selectedOptions?.map(({ id }) => id);
	switch (sortType) {
		case 'default':
			return options.sort((a: T, b: T) => a.name.localeCompare(b.name));
		case 'selected':
			return options.sort(
				(a: T, b: T) =>
					+selectedOptionsIds.includes(b.id) - +selectedOptionsIds.includes(a.id) || a.name.localeCompare(b.name)
			);
		default:
			throw new Error(`Unknown sort type: ${sortType}`);
	}
};
export const getSortedPersonSubscribers = <T extends { name: string; id: number }>(
	[...options]: T[],
	selectedOptions: T[] = [],
	sortType = 'default'
): T[] => {
	const selectedOptionsSet = new Set(selectedOptions.map((opt) => opt.id));
	switch (sortType) {
		case 'default':
			return options.sort((a: T, b: T) => a.name.localeCompare(b.name));
		case 'selected':
			return options.sort(
				(a: T, b: T) => +selectedOptionsSet.has(b.id) - +selectedOptionsSet.has(a.id) || a.name.localeCompare(b.name)
			);
		default:
			throw new Error(`Unknown sort type: ${sortType}`);
	}
};

export const getSortedClientOptions = <T extends { value: string }>(
	[...options]: T[],
	selectedOptions: T[] = [],
	sortType = 'default'
): T[] => {
	switch (sortType) {
		case 'default':
			return options.sort((a: T, b: T) => a.value.localeCompare(b.value));
		case 'selected':
			return options.sort(
				(a: T, b: T) => +selectedOptions.includes(b) - +selectedOptions.includes(a) || a.value.localeCompare(b.value)
			);
		default:
			throw new Error(`Unknown sort type: ${sortType}`);
	}
};
