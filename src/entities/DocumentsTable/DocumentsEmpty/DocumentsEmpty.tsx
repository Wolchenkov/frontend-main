/* eslint-disable import/no-restricted-paths */
import { FC } from 'react';
import * as S from './DocumentsEmpty.styled';
import { Avatar } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { AddDocumentButton } from '../../../features';

interface IDocumentsEmptyProps {
	currentFolder: IFolder;
}

const DocumentsEmpty: FC<IDocumentsEmptyProps> = ({ currentFolder }) => {
	return (
		<S.DocumentsEmpty>
			<Avatar squared icon={<SvgComponent name='file-list-line' />} />
			<S.DocumentsEmptyTitle variant='body-1'>Документов пока нет</S.DocumentsEmptyTitle>
			<S.DocumentsEmptyText variant='caption-1' color='neutral-faded'>
				Добавьте первый документ, заметку или папку
			</S.DocumentsEmptyText>
			<AddDocumentButton currentFolder={currentFolder} type='projects' first />
		</S.DocumentsEmpty>
	);
};

export default DocumentsEmpty;
