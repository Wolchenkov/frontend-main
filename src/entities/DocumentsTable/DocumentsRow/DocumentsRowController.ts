import { useState } from 'react';
import { useRouter } from 'next/router';
import { useShowToast } from '../../../shared/utility/Hooks';
import { useDeleteDocMutation, useDuplicateDocMutation } from '../../../store/docs/docsApi';

interface IDocumentsRowControllerProps {
	doc: IDocument;
	setCurrentFolder: React.Dispatch<React.SetStateAction<IFolder>>;
	setBreadcrumbs: React.Dispatch<React.SetStateAction<IFolder[]>>;
	activateModalChangeName: () => void;
	activateModalMoveFolder: () => void;
	setModalDoc: React.Dispatch<React.SetStateAction<IDocument>>;
	isFetching: boolean;
	setNote: React.Dispatch<React.SetStateAction<IDocument>>;
	setActiveNoteOverlay: React.Dispatch<React.SetStateAction<boolean>>;
	type: string;
}

export const useDocumentsRowController = ({
	doc,
	setCurrentFolder,
	setBreadcrumbs,
	activateModalChangeName,
	activateModalMoveFolder,
	setModalDoc,
	isFetching,
	setNote,
	setActiveNoteOverlay,
	type,
}: IDocumentsRowControllerProps) => {
	const router = useRouter();
	const showToast = useShowToast();
	const { slug } = router.query;

	const [rowHover, setRowHover] = useState(false);
	const [handleDelete] = useDeleteDocMutation();
	const [handleDuplicate] = useDuplicateDocMutation();

	const handleClick = () => {
		if (isFetching) {
			return;
		}
		switch (doc.type) {
			case 'folder':
				setCurrentFolder({ id: doc.id, name: doc.name });
				setBreadcrumbs((prevState) => [...prevState, { id: doc.id, name: doc.name }]);
				break;
			case 'notes':
				editNote();
				break;
			case 'file':
				openFile();
				break;
		}
	};

	const moveDoc = () => {
		setModalDoc(doc);
		activateModalMoveFolder();
	};

	const changeName = () => {
		setModalDoc(doc);
		activateModalChangeName();
	};

	const deleteDoc = () => {
		handleDelete({ type, slug, docId: doc.id }).then((response) => {
			if ('error' in response) {
				showToast(`Ошибка!`);
				return;
			}
			showToast(`${doc.type === 'folder' ? 'Папка удалена' : doc.type === 'file' ? 'Файл удален' : 'Заметка удалена'}`);
		});
	};

	const duplicateDoc = () => {
		const body = {
			target: doc.parent_id,
			source: doc.id,
		};
		const payload = { type, slug, body };

		handleDuplicate(payload).then((response) => {
			if ('error' in response) {
				showToast(`Ошибка!`);
				return;
			}
		});
	};

	const editNote = () => {
		setActiveNoteOverlay(true);
		setNote(doc);
	};

	const openFile = (withDownload?: boolean) => {
		const link = document.createElement('a');
		link.href = doc.file ? doc.file.original_url || doc.file.preview_url : '';

		if (withDownload) {
			link.setAttribute('download', doc.name);
		}

		link.setAttribute('target', '_blank');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const downloadFile = () => {
		openFile(true);
	};

	return { rowHover, setRowHover, handleClick, moveDoc, changeName, deleteDoc, duplicateDoc, editNote, downloadFile };
};
