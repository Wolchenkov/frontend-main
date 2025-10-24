import { FC } from 'react';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';

import * as S from './DocumentsRow.styled';
import { Text } from 'reshaped/bundle';
import { AvatarCustom, SvgComponent } from '../../../shared';
import { fileTypes } from '../../../shared/utility/Constants/fileTypes';
import { getInitials } from '../../../shared/utility/Utils';

import { DocumentMenu } from '../DocumentMenu/DocumentMenu';

import { useDocumentsRowController } from './DocumentsRowController';

interface IDocumentsRowProps {
	doc: IDocument;
	setCurrentFolder: React.Dispatch<React.SetStateAction<IFolder>>;
	setBreadcrumbs: React.Dispatch<React.SetStateAction<IFolder[]>>;
	activateModalChangeName: () => void;
	activateModalMoveFolder: () => void;
	setModalDoc: React.Dispatch<React.SetStateAction<IDocument>>;
	isFetching: boolean;
	newFiles: number[];
	setNote: React.Dispatch<React.SetStateAction<IDocument>>;
	setActiveNoteOverlay: React.Dispatch<React.SetStateAction<boolean>>;
	type: string;
}

const DocumentsRow: FC<IDocumentsRowProps> = ({
	doc,
	setCurrentFolder,
	setBreadcrumbs,
	activateModalChangeName,
	activateModalMoveFolder,
	setModalDoc,
	isFetching,
	newFiles,
	setNote,
	setActiveNoteOverlay,
	type,
}) => {
	const { rowHover, setRowHover, handleClick, moveDoc, changeName, deleteDoc, duplicateDoc, editNote, downloadFile } =
		useDocumentsRowController({
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
		});

	return (
		<S.Row
			newFile={newFiles.includes(doc.id)}
			onClick={handleClick}
			onMouseEnter={() => setRowHover(true)}
			onMouseLeave={() => setRowHover(false)}
		>
			<S.NameColumn>
				<SvgComponent
					name={doc.file ? fileTypes[doc.file.extension] : doc.type === 'folder' ? 'folder-3-fill' : 'sticky-note'}
				/>
				<Text variant='caption-1'>{doc.type === 'file' ? doc.name.split('.').slice(0, -1).join('.') : doc.name}</Text>
			</S.NameColumn>
			<div>
				<AvatarCustom
					src={doc.user ? (doc.user.avatar ? doc.user.avatar : '') : ''}
					color='positive'
					initials={getInitials(doc.user ? (doc.user.name ? doc.user.name : '') : '')}
					size={6}
				/>
			</div>
			<Text variant='caption-1'>{format(Date.parse(doc.created_at), 'dd.MM.yy', { locale: ru })}</Text>
			<Text variant='caption-1'>{doc.file ? doc.file.extension : doc.type === 'folder' ? 'Папка' : 'Заметка'}</Text>
			<DocumentMenu
				rowHover={rowHover}
				docType={doc.type}
				moveDoc={moveDoc}
				changeName={changeName}
				deleteDoc={deleteDoc}
				duplicateDoc={duplicateDoc}
				editNote={editNote}
				downloadFile={downloadFile}
			/>
		</S.Row>
	);
};

export default DocumentsRow;
