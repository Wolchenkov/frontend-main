import { Button, Modal, View } from 'reshaped/bundle';
import { FC } from 'react';
import * as S from './ConfirmModal.styled';

interface ConfirmModalProps {
	active: boolean;
	deactivate: () => void;
	confirmDel: () => void;
	text: string;
	detailedText?: string;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({ active, deactivate, confirmDel, text, detailedText }) => {
	return (
		<Modal size='320px' active={active} onClose={deactivate}>
			<Modal.Title>
				<S.ConfirmModalText variant='body-1'>{text}</S.ConfirmModalText>
			</Modal.Title>
			<Modal.Subtitle>
				<S.ConfirmModalDetailedText variant='body-2'>{detailedText}</S.ConfirmModalDetailedText>
			</Modal.Subtitle>
			<View
				direction='row'
				justify='end'
				gap={1}
				attributes={{ style: { paddingTop: `${detailedText ? '24px' : '44px'}` } }}
			>
				<Button onClick={deactivate} color='white' size='small' type='button'>
					<S.ConfirmModalText variant='body-2'>Отмена</S.ConfirmModalText>
				</Button>
				<Button onClick={confirmDel} color='white' size='small' type='button'>
					<S.ConfirmModalText color='primary' variant='body-2'>
						{text.includes('удалить')
							? 'Удалить'
							: text.includes('завершить')
							? 'Завершить'
							: text.includes('выйти')
							? 'Выйти'
							: 'Отправить'}
					</S.ConfirmModalText>
				</Button>
			</View>
		</Modal>
	);
};
