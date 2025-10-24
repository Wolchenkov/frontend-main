export const fileTypes: {
	[key: string]: string;
} = {
	// Текстовые файлы
	txt: 'word',
	doc: 'word',
	docx: 'word',
	rtf: 'word',
	odt: 'word',
	pdf: 'word',

	// Файлы презентаций
	ppt: 'ppt',
	pptx: 'ppt',
	key: 'ppt',
	odp: 'ppt',

	// Архивы
	zip: 'zip',
	rar: 'zip',
	'7z': 'zip',
	tar: 'zip',
	gz: 'zip',
	tgz: 'zip',

	// Файлы изображений
	jpg: 'image',
	jpeg: 'image',
	png: 'image',
	gif: 'image',
	bmp: 'image',
	svg: 'image',
	tif: 'image',
	tiff: 'image',
	webp: 'image',

	// Таблицы (Excel)
	xls: 'excel',
	xlsx: 'excel',
	ods: 'excel',
	csv: 'excel',
	tsv: 'excel',
};
