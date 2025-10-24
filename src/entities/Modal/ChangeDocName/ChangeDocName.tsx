import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Modal, View, Text, Divider, Button } from 'reshaped/bundle';
import { CustomTextArea } from '../../CustomTextArea/CustomTextArea';
import { SvgComponent } from '../../../shared';
import { useShowToast } from '../../../shared/utility/Hooks';
import { useUpdateDocMutation } from '../../../store/docs/docsApi';

interface IAddFolderModalProps {
	active: boolean;
	onClose: () => void;
	size: string;
	doc: IDocument;
	type: string;
}

export const ChangeDocName: FC<IAddFolderModalProps> = ({ active, onClose, size, doc, type }) => {
	const router = useRouter();
	const { slug } = router.query;
	const showToast = useShowToast();

	const [docName, setDocName] = useState('');
	const [updateDoc] = useUpdateDocMutation();

	useEffect(() => {
		if (active) {
			doc.type === 'file' ? setDocName(doc.name.split('.').slice(0, -1).join('.')) : setDocName(doc.name);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active]);

	const changeName = () => {
		const body = {
			name: docName,
		};
		const payload = { type, slug, docId: doc.id, body };

		updateDoc(payload).then((response) => {
			if ('error' in response) {
				showToast(`Ошибка!`);
				return;
			}
			showToast('Название изменено');
			onClose();
		});
	};

	return (
		<Modal size={size} active={active} onClose={onClose} padding={0}>
			<View padding={4} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
				<Modal.Title>
					<Text variant='body-medium-2'>Изменить название</Text>
				</Modal.Title>
				<SvgComponent name='close-line-modal' style={{ cursor: 'pointer', pointerEvents: 'all' }} onClick={onClose} />
			</View>
			<Divider />
			<div style={{ padding: '16px' }}>
				<CustomTextArea
					placeholder={`Введите название ${doc.type === 'folder' ? 'папки' : 'файла'}`}
					value={docName}
					onChange={(e) => setDocName(e.target.value)}
					onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
					style={{ minHeight: '64px' }}
				/>
			</div>
			<Divider />
			<View direction='row' align='center' padding={4} attributes={{ style: { justifyContent: 'flex-end' } }}>
				<Button onClick={changeName} color='primary' size='small' disabled={docName.length < 3}>
					Переименовать
				</Button>
			</View>
		</Modal>
	);
};
