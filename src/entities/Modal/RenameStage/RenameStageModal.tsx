import React, { FC, useEffect, useRef, useState } from 'react';
import * as S from './RenameStageModal.styled';
import { Button, Divider, Modal, Text, View } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';

interface IRenameStageModalProps {
	name: string;
	isActive: boolean;
	currentStages: string[];
	closeModal: () => void;
	renameStage: (name: string) => void;
}

export const RenameStageModal: FC<IRenameStageModalProps> = ({
	name,
	isActive,
	currentStages,
	closeModal,
	renameStage,
}) => {
	const renameStageInputRef = useRef<HTMLInputElement>(null);
	const [newStageName, setNewStageName] = useState(name);
	const [isStageNameValid, setIsStageNameValid] = useState(false);
	const [isShowError, setIsShowError] = useState(false);

	useEffect(() => {
		if (isActive) {
			setTimeout(() => {
				renameStageInputRef.current?.focus();
			}, 100);
		}
	}, [isActive]);

	useEffect(() => {
		setNewStageName(name);
	}, [name, isActive]);

	useEffect(() => {
		setIsStageNameValid(!currentStages.includes(newStageName.trim()));
	}, [currentStages, newStageName]);

	useEffect(() => {
		setIsShowError(!isStageNameValid && newStageName.trim() !== name);
	}, [newStageName, name, isStageNameValid]);

	return (
		<Modal size='660px' padding={0} active={isActive} onClose={closeModal}>
			<View padding={4} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
				<Modal.Title>
					<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
						Переименовать этап
					</Text>
				</Modal.Title>
				<SvgComponent
					name='close-line-modal'
					style={{ cursor: 'pointer', pointerEvents: 'all' }}
					onClick={closeModal}
				/>
			</View>
			<Divider />
			<View padding={4}>
				<View paddingBottom={10} attributes={{ style: { position: 'relative' } }}>
					<S.RenameStageInput
						name='name'
						ref={renameStageInputRef}
						placeholder={name}
						value={newStageName}
						onChange={(e) => setNewStageName(e.target.value)}
						autoComplete='off'
					/>
					{isShowError && (
						<S.RenameStageError variant='caption-1' color='critical'>
							Этап с таким названием уже существует
						</S.RenameStageError>
					)}
				</View>
			</View>
			<Divider />
			<View padding={4} align='end'>
				<Button
					color='primary'
					size='small'
					disabled={!newStageName.trim() || !isStageNameValid}
					onClick={() => renameStage(newStageName.trim())}
				>
					<Text variant='caption-1'>Обновить</Text>
				</Button>
			</View>
		</Modal>
	);
};
