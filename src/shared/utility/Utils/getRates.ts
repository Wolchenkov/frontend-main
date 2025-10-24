export const getRates = (projectTypeWorks: fetchingDictionaryTypeWork[]) =>
	projectTypeWorks?.map(({ id, cost }) => ({ id, cost }));
