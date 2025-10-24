import { FC, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { OutputData } from '@editorjs/editorjs';
import { formatRelative } from 'date-fns';
import ru from 'date-fns/locale/ru';

import { Button, Text, useToggle } from 'reshaped/bundle';
import { SvgComponent } from '../../shared';
import { useShowToast } from '../../shared/utility/Hooks';
import * as S from './Note.styled';

import { SaveChangesModal } from '../Modal/SaveChangesModal/SaveChangesModal';
import {
	useCreateDocMutation,
	useSaveNoteMutation,
	useLinkFileToNoteMutation,
	useLazyGetNoteQuery,
} from '../../store/docs/docsApi';
import { useFileUploadMutation } from '../../store/uploads/uploadsApi';
import { useGetUserQuery } from '../../store/auth/authApi';

const Editor = dynamic(() => import('../../shared/ui/Editor/Editor'), {
	ssr: false,
});

interface INoteProps {
	active: boolean;
	deactivate: () => void;
	currentFolder: IFolder;
	type: string;
	data?: IDocument;
}

const Note: FC<INoteProps> = ({ active, deactivate, currentFolder, type, data }) => {
	const router = useRouter();
	const { slug } = router.query;
	const { data: user } = useGetUserQuery();
	const showToast = useShowToast();

	const [noteName, setNoteName] = useState('');
	const [editorData, setEditorData] = useState<OutputData | undefined>();
	const [isEditorDataLoaded, setIsEditorDataLoaded] = useState(false);
	const [createNote, { isLoading }] = useCreateDocMutation();
	const [linkFileToNote] = useLinkFileToNoteMutation();
	const [getNote] = useLazyGetNoteQuery();
	const inputRef = useRef<HTMLInputElement>(null);

	const {
		active: activeSaveChangesModal,
		activate: activateSaveChangesModal,
		deactivate: deactivateSaveChangesModal,
	} = useToggle(false);

	useEffect(() => {
		if (active) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 100);
		} else {
			setNoteName('');
			setEditorData(undefined);
			setIsEditorDataLoaded(false);
		}

		if (data) {
			setNoteName(data.name);
			getNote({ type, slug, noteId: data.id }).then((res) => {
				if ('data' in res) {
					setEditorData(res.data.text);
					setIsEditorDataLoaded(true);
				}
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active]);

	const abortChanges = () => {
		deactivateSaveChangesModal();
		deactivate();
	};

	const [upload] = useFileUploadMutation();
	const [save] = useSaveNoteMutation();

	const fileUpload = async (file: File) => {
		const response = await upload(file);
		if ('data' in response) {
			if (data) {
				const body = { file: response.data.uuid };
				linkFileToNote({ type, slug, noteId: data.id, body });
			}
			return { success: 1, file: { url: response.data.preview_url, uuid: response.data.uuid } };
		}
	};

	const saveChanges = () => {
		if (!noteName) {
			showToast('Ошибка!', 'Заголовок должен быть заполнен');
			return;
		}
		if (!data) {
			const body = {
				type: 'notes',
				name: noteName,
				...(!!currentFolder.id && { folder: currentFolder.id }),
			};
			const payload = { type, slug, body };
			createNote(payload).then((res) => {
				if ('data' in res && editorData && editorData.blocks.length > 0) {
					const body = { text: editorData };
					save({ type, slug, noteId: res.data.id, body });

					const fileBlocks = editorData.blocks.filter((block) => block.type === 'image' || block.type === 'attaches');
					if (fileBlocks.length > 0) {
						fileBlocks.forEach((block) => {
							const body = { file: block.data.file.uuid };
							linkFileToNote({ type, slug, noteId: res.data.id, body });
						});
					}
				}
				deactivateSaveChangesModal();
				deactivate();
			});
		} else {
			const body = { name: noteName, text: editorData };
			save({ type, slug, noteId: data.id, body }).then(() => {
				deactivateSaveChangesModal();
				deactivate();
			});
		}
	};

	return (
		<>
			{active && (
				<S.NoteContainer>
					<S.NoteButtons>
						<Button
							color='white'
							size='small'
							startIcon={<SvgComponent name='arrow-left-s' />}
							onClick={activateSaveChangesModal}
						>
							Назад
						</Button>
						<Button color='primary' size='small' startIcon={<SvgComponent name='check-fill' />} onClick={saveChanges}>
							Сохранить
						</Button>
					</S.NoteButtons>
					<S.NoteHeader>
						<S.NoteAdditionalInfo>
							<Text variant='caption-2'>{data ? (data.user ? data.user.name : '' ): user && user.name}</Text>
							{data && (
								<>
									<SvgComponent name='ellipse' />
									<Text variant='caption-2'>
										{formatRelative(Date.parse(data.created_at), Date.now(), { locale: ru })}
									</Text>
								</>
							)}
						</S.NoteAdditionalInfo>
						<S.NoteName
							placeholder='Введите заголовок'
							value={noteName}
							onChange={(e) => setNoteName(e.target.value)}
							ref={inputRef}
						/>
					</S.NoteHeader>
					{((data && isEditorDataLoaded) || !data) && (
						<S.EditorContainer>
							<Editor
								data={editorData}
								onChange={setEditorData}
								tools={['header', 'image', 'attaches', 'link', 'list', 'delimiter', 'table']}
								placeholder='Начните ввод текста'
								id='editorjs'
								fileUpload={fileUpload}
							/>
						</S.EditorContainer>
					)}
					<SaveChangesModal
						active={activeSaveChangesModal}
						deactivate={deactivateSaveChangesModal}
						abortChanges={abortChanges}
						saveChanges={saveChanges}
						isLoading={isLoading}
					/>
				</S.NoteContainer>
			)}
		</>
	);
};

export default Note;
