import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useLazyGetDocsStructureQuery } from '../../../store/docs/docsApi';
import { useMoveDocMutation } from '../../../store/docs/docsApi';
import { useShowToast } from '../../../shared/utility/Hooks';

export const useDocMovementModalController = ({
	active,
	onClose,
	doc,
	type,
}: {
	active: boolean;
	onClose: () => void;
	doc: IDocument;
	type: string;
}) => {
	const router = useRouter();
	const { slug } = router.query;
	const projectSlug = typeof slug === 'string' ? slug : String(skipToken);
	const showToast = useShowToast();

	const [getDocsStructure] = useLazyGetDocsStructureQuery();
	const [moveDoc] = useMoveDocMutation();
	const [docsStructure, setDocsStructure] = useState([
		{ id: 0, name: 'Документы', type: 'folder', children: [] as IDocsStructure[] },
	]);
	const [chosenFolder, setChosenFolder] = useState<IDocsStructure>({} as IDocsStructure);

	useEffect(() => {
		if (active) {
			setChosenFolder({} as IDocsStructure);
			getDocsStructure({ type, slug: projectSlug }).then((res) =>
				setDocsStructure([{ id: 0, name: 'Документы', type: 'folder', children: res.data ? res.data : [] }])
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active]);

	const move = () => {
		const body = {
			source: doc.id,
			target: chosenFolder.id ? chosenFolder.id : null,
		};
		const payload = { type, slug, body };

		moveDoc(payload).then((response) => {
			if ('error' in response) {
				showToast(`Ошибка!`);
				return;
			}
			showToast(
				doc.type === 'folder' ? 'Папка перемещена' : doc.type === 'file' ? 'Файл перемещен' : 'Заметка перемещена',
				`Объект перемещен в папку «${chosenFolder.name}»`
			);
			onClose();
		});
	};

	return { docsStructure, chosenFolder, setChosenFolder, move };
};
