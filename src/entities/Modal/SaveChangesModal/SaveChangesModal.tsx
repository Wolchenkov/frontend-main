import { Button, Modal, View } from 'reshaped/bundle';
import { FC } from 'react';
import * as S from './SaveChangesModal.styled';

interface ConfirmModalProps {
	active: boolean;
	deactivate: () => void;
	abortChanges: () => void;
	saveChanges: () => void;
	isLoading: boolean;
}

export const SaveChangesModal: FC<ConfirmModalProps> = ({
	active,
	deactivate,
	abortChanges,
	saveChanges,
	isLoading,
}) => {
	return (
		<Modal size='320px' active={active} onClose={deactivate}>
			<Modal.Title>
				<S.SaveChangesModalText variant='body-medium-1'>
					Сохранить изменения в заметке перед выходом?
				</S.SaveChangesModalText>
			</Modal.Title>
			<View direction='row' justify='end' gap={1} attributes={{ style: { paddingTop: '24px' } }}>
				<Button color='white' size='small' type='button' onClick={abortChanges} disabled={isLoading}>
					<S.SaveChangesModalText variant='body-2'>Не сохранять</S.SaveChangesModalText>
				</Button>
				<Button color='white' size='small' type='button' onClick={saveChanges} disabled={isLoading}>
					<S.SaveChangesModalText color='primary' variant='body-2'>
						Сохранить
					</S.SaveChangesModalText>
				</Button>
			</View>
		</Modal>
	);
};
