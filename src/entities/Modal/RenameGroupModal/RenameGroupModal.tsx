import React, { FC } from 'react';
import * as S from './RenameGroupModal.styled';
import { Button, Divider, Modal, Text, View } from 'reshaped/bundle';
import { useRenameGroupModalController } from './RenameGroupModalController';
import { useRenameGroupMutation } from '../../../store/groups/groupsApi';
import { SvgComponent } from '../../../shared';
import { useRouter } from 'next/router';
import { useShowToast } from '../../../shared/utility/Hooks';

interface RenameGroupModalProps {
	active: boolean;
	deactivate: () => void;
	groupName: string;
}

export const RenameGroupModal: FC<RenameGroupModalProps> = ({ active, deactivate, groupName }) => {
	const { renameInputRef, inputValue, changeHandler, isValid, onCloseModal, setIsValid, setInputValue } =
		useRenameGroupModalController(groupName, active, deactivate);
	const [renameGroup] = useRenameGroupMutation();
	const showToast = useShowToast();
	const router = useRouter();
	const slug = router.query.slug;

	const sendRenameGroup = () => {
		renameGroup({ slug, body: { name: inputValue.trim() } })
			.unwrap()
			.then(() => {
				deactivate();
				setTimeout(() => {
					setInputValue(groupName);
				}, 200);
				showToast('Группа переименована');
			})
			.catch((error: any) => {
				if (error.status === 422) {
					setIsValid(false);
				}
			});
	};

	return (
		<S.RenameGroupModal size='660px' padding={0} active={active} onClose={onCloseModal}>
			<View padding={4} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
				<Modal.Title>
					<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
						Переименовать группу
					</Text>
				</Modal.Title>
				<SvgComponent
					name='close-line-modal'
					style={{ cursor: 'pointer', pointerEvents: 'all' }}
					onClick={onCloseModal}
				/>
			</View>
			<Divider />
			<View padding={4} paddingBottom={8}>
				<S.AddGroupNameInput
					name='rename'
					ref={renameInputRef}
					placeholder='Введите новое название группы'
					value={inputValue}
					onChange={(e) => changeHandler(e)}
					autoComplete='off'
				/>
				{!isValid && (
					<Text
						variant='caption-1'
						color='critical'
						attributes={{ style: { fontWeight: 500, letterSpacing: '-0.01em' } }}
					>
						Такое название уже существует, введите другое название
					</Text>
				)}
			</View>
			<Divider />
			<View padding={4} align='end'>
				<Button
					color='primary'
					size='small'
					onClick={sendRenameGroup}
					disabled={inputValue.trim() === '' || !isValid || inputValue === groupName}
				>
					<Text variant='caption-1'>Обновить</Text>
				</Button>
			</View>
		</S.RenameGroupModal>
	);
};
