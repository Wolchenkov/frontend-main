import { OutputData } from '@editorjs/editorjs';

export function areAllBlocksEmpty(commentText: OutputData | undefined): boolean {
	if (!commentText) {
		return true;
	}
	// Проверяем каждый блок
	for (const block of commentText.blocks) {
		// Если тип блока не 'paragraph' или 'list', считаем, что блок не пустой
		if (block.type !== 'paragraph' && block.type !== 'list') {
			return false;
		}
		if (block.type === 'paragraph') {
			// Убираем все пробелы, неразрывные пробелы и теги <br>
			const cleanText = (block.data.text as string).replace(/&nbsp;|<br>| /g, '');
			// Если после очистки остался хоть один символ, значит блок не пустой
			if (cleanText.length > 0) {
				return false;
			}
		}
		if (block.type === 'list') {
			// Проверяем каждый элемент списка
			for (const item of block.data.items) {
				// Убираем все пробелы, неразрывные пробелы и теги <br>
				const cleanText = item.replace(/&nbsp;|<br>| /g, '');
				// Если после очистки остался хоть один символ, значит элемент списка не пустой
				if (cleanText.length > 0) {
					return false;
				}
			}
		}
	}
	// Если ни один блок не был определен как непустой, значит все блоки пустые
	return true;
}
