import React, { FC, useRef, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useFileUploadWithProgressMutation } from '../../store/uploads/uploadsApi';
import { useCreateDocMutation } from '../../store/docs/docsApi';
import { addToNewFiles, removeFromNewFiles } from '../../store/uploads/uploadsSlice';
import { useAppDispatch } from '../../store';

import { Button, DropdownMenu, Text, Loader, Icon, useToggle, useToast } from 'reshaped/bundle';
import { AddFolderInProjectModal } from '../../entities';
import { SvgComponent } from '../../shared';
import { useShowToast } from '../../shared/utility/Hooks';
import { getNoun } from '../../shared/utility/Utils/getNoun';
import Note from '../../entities/Note/Note';

interface IAddDocumentButtonProps {
	currentFolder: IFolder;
	type: 'groups' | 'projects';
	first?: boolean;
}

export const AddDocumentButton: FC<IAddDocumentButtonProps> = ({ currentFolder, type, first }) => {
	const {
		active: activeModalAddFolder,
		activate: activateModalAddFolder,
		deactivate: deactivateModalAddFolder,
	} = useToggle(false);

	const [activeNoteOverlay, setActiveNoteOverlay] = useState(false);

	const toast = useToast();
	const router = useRouter();
	const { slug } = router.query;

	const inputRef = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const [fileUpload] = useFileUploadWithProgressMutation();
	const [createFile] = useCreateDocMutation();
	const dispatch = useAppDispatch();
	const showToast = useShowToast();

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			return;
		}

		const files = Array.from(e.target.files);
		const disallowedFiles = [];

		const allowedFiles = files.filter((file) => {
			if (file.size / 1024 / 1024 > 100) {
				disallowedFiles.push(file.name);
				return false;
			}
			return true;
		});

		if (disallowedFiles.length > 0) {
			toast.show({
				color: 'critical',
				text: (
					<>
						<Text variant='body-strong-2' attributes={{ style: { letterSpacing: '-0.01em' } }}>
							{`Не удалось загрузить ${disallowedFiles.length} файл(ов)`}
						</Text>
						<Text variant='body-2'>Размер файлов не должен превышать 100 Мб</Text>
					</>
				),
				icon: <Icon svg={<SvgComponent name='close-circle-white' />} size={6} />,
			});
		}

		if (allowedFiles.length === 0) {
			return;
		}

		const id = toast.show({
			text: (
				<Text variant='body-strong-2'>{`Загрузка ${allowedFiles.length} ${
					allowedFiles.length > 1 ? 'файлов' : 'файла'
				}`}</Text>
			),
			startSlot: <Loader size='medium' attributes={{ style: { '--rs-loader-color': 'white' } }} />,
			timeout: 0,
		});

		Promise.all(
			allowedFiles.map((file) => {
				const id = Math.random().toString();
				return fileUpload({ id, file }).then((response) => {
					if ('data' in response) {
						const body = {
							type: 'file',
							file: [{ uuid: JSON.parse(response.data).uuid }],
							...(currentFolder.id && { folder: currentFolder.id }),
						};
						createFile({ type, slug, body }).then((response) => {
							if ('data' in response) {
								dispatch(addToNewFiles({ id: response.data[0].id }));
								setTimeout(() => dispatch(removeFromNewFiles({ id: response.data[0].id })), 5000);
							}
						});
					}
				});
			})
		).then(() => {
			toast.hide(id);
			showToast(
				`${files.length > 1 ? 'Загружено ' : 'Загружен'} ${files.length} ${getNoun(
					files.length,
					'файл',
					'файла',
					'файлов'
				)}`
			);
		});
	};

	return (
		<>
			<DropdownMenu width='140px' position='bottom-end'>
				<DropdownMenu.Trigger>
					{(attributes) => (
						<Button
							{...attributes}
							size='small'
							color={first ? 'neutral' : 'primary'}
							startIcon={first ? <></> : <SvgComponent name='add-white' />}
							variant={first ? 'outline' : 'solid'}
							attributes={{ style: { width: `${first ? '140px' : 'auto'}` } }}
						>
							Добавить
						</Button>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item size='small' onClick={activateModalAddFolder}>
						<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
							Папку
						</Text>
					</DropdownMenu.Item>
					<DropdownMenu.Item size='small' onClick={handleClick}>
						<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
							Документ
						</Text>
					</DropdownMenu.Item>
					<DropdownMenu.Item size='small' onClick={() => setActiveNoteOverlay(true)}>
						<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
							Заметку
						</Text>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu>
			<input
				type='file'
				multiple
				onChange={handleFileChange}
				onClick={(e) => (e.currentTarget.value = '')}
				ref={inputRef}
				style={{ display: 'none' }}
			/>
			<Note
				active={activeNoteOverlay}
				deactivate={() => setActiveNoteOverlay(false)}
				currentFolder={currentFolder}
				type={type}
			/>
			<AddFolderInProjectModal
				size='660px'
				active={activeModalAddFolder}
				onClose={deactivateModalAddFolder}
				currentFolder={currentFolder}
				type={type}
			/>
		</>
	);
};
