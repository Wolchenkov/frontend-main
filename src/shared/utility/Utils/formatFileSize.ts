// форматирование размера файла
export function formatFileSize(sizeInBytes: number) {
	const sizeInKB = sizeInBytes / 1024;
	if (sizeInKB < 1024) {
		return `${sizeInKB.toFixed(1)} KB`;
	}
	const sizeInMB = sizeInKB / 1024;
	return `${sizeInMB.toFixed(1)} MB`;
}
