import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Modal, View, Text, Divider, Button } from 'reshaped/bundle';
import { CustomTextArea } from '../../CustomTextArea/CustomTextArea';
import { SvgComponent } from '../../../shared';
import { useShowToast } from '../../../shared/utility/Hooks';
import { useCreateDocMutation } from '../../../store/docs/docsApi';

interface IAddFolderModalProps {
	active: boolean;
	onClose: () => void;
	size: string;
	currentFolder: IFolder;
	type: string;
}

export const AddFolderInProjectModal: FC<IAddFolderModalProps> = ({ active, onClose, size, currentFolder, type }) => {
	const router = useRouter();
	const { slug } = router.query;
	const showToast = useShowToast();

	const [folderName, setFolderName] = useState('');
	const [isFolderCreating, setIsFolderCreating] = useState(false);
	const [createFolder] = useCreateDocMutation();

	useEffect(() => {
		active && setFolderName('');
	}, [active]);

	const newFolder = () => {
		setIsFolderCreating(true);
		const body = {
			type: 'folder',
			name: folderName,
			...(!!currentFolder.id && { folder: currentFolder.id }),
		};
		const payload = { type, slug, body };

		createFolder(payload).then((response) => {
			if ('error' in response) {
				showToast(`Ошибка!`);
				setIsFolderCreating(false);
				return;
			}
			showToast('Папка создана');
			onClose();
			setIsFolderCreating(false);
		});
	};

	return (
		<Modal size={size} active={active} onClose={onClose} padding={0}>
			<View padding={4} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
				<Modal.Title>
					<Text variant='body-medium-2'>Добавить папку</Text>
				</Modal.Title>
				<SvgComponent name='close-line-modal' style={{ cursor: 'pointer', pointerEvents: 'all' }} onClick={onClose} />
			</View>
			<Divider />
			<div style={{ padding: '16px' }}>
				<CustomTextArea
					placeholder='Введите название папки'
					value={folderName}
					onChange={(e) => setFolderName(e.target.value)}
					style={{ minHeight: '64px' }}
				/>
			</div>
			<Divider />
			<View direction='row' align='center' padding={4} attributes={{ style: { justifyContent: 'flex-end' } }}>
				<Button onClick={newFolder} color='primary' size='small' disabled={folderName.length < 3 || isFolderCreating}>
					Добавить
				</Button>
			</View>
		</Modal>
	);
};
