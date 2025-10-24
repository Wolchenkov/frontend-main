import { Button, Modal, View } from 'reshaped/bundle';
import { FC } from 'react';
import * as S from './ConfirmModal.styled';

interface IConfirmModalProps {
	isActive: boolean;
	text: string;
	deactivateModal: () => void;
	confirm: () => void;
}

export const ConfirmModal: FC<IConfirmModalProps> = ({ isActive, text, deactivateModal, confirm }) => {
	return (
		<Modal size='320px' active={isActive} onClose={deactivateModal}>
			<Modal.Title>
				<S.ConfirmModalText variant='body-1'>{text}</S.ConfirmModalText>
			</Modal.Title>
			<View direction='row' justify='end' gap={1} attributes={{ style: { paddingTop: '44px' } }}>
				<Button onClick={deactivateModal} color='white' size='small' type='button'>
					<S.ConfirmModalText variant='body-2'>Отмена</S.ConfirmModalText>
				</Button>
				<Button onClick={confirm} color='white' size='small' type='button'>
					<S.ConfirmModalText color='primary' variant='body-2'>
						{text.includes('согласовать') ? 'Согласовать' : 'Отклонить'}
					</S.ConfirmModalText>
				</Button>
			</View>
		</Modal>
	);
};
