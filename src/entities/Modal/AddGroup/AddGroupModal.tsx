import * as S from './AddGroupModal.styled';
import { Button, Divider, Modal, Text, View } from 'reshaped/bundle';
import React, { FC } from 'react';
import { useAddGroupModalController } from './AddGroupModalController';
import { SvgComponent } from '../../../shared';
import { PillClient } from '../../Pills/PillClient/PillClient';

interface AddGroupModalProps {
	active: boolean;
	onClose: () => void;
}
export const AddGroupModal: FC<AddGroupModalProps> = ({ active, onClose }) => {
	const {
		errorText,
		addGroupInputRef,
		changeHandler,
		inputValue,
		onCloseModal,
		isValid,
		ourTeams,
		sendNewGroup,
		addTeamsInGroup,
		teamId,
	} = useAddGroupModalController(active, onClose);

	return (
		<S.AddGroupModal size='660px' padding={0} active={active} onClose={onCloseModal}>
			<View padding={4} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
				<Modal.Title>
					<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
						Добавить группу
					</Text>
				</Modal.Title>
				<SvgComponent
					name='close-line-modal'
					style={{ cursor: 'pointer', pointerEvents: 'all' }}
					onClick={onCloseModal}
				/>
			</View>
			<Divider />
			<View padding={4}>
				<S.AddGroupNameInput
					name='name'
					ref={addGroupInputRef}
					placeholder='Введите название группы'
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
						{errorText}
					</Text>
				)}
				<div style={{ marginTop: '56px', height: '28px' }}>
					{ourTeams && (
						<PillClient
							name='team_id'
							onChange={addTeamsInGroup}
							title='Команды'
							icon='group-neutral-faded'
							members={ourTeams as fetchingDictionaryClient[]}
						/>
					)}
				</div>
			</View>
			<Divider />
			<View padding={4} align='end'>
				<Button
					color='primary'
					size='small'
					onClick={sendNewGroup}
					disabled={inputValue.trim() === '' || !isValid || teamId === undefined}
				>
					<Text variant='caption-1'>Добавить</Text>
				</Button>
			</View>
		</S.AddGroupModal>
	);
};
