import React, { FC, useEffect, useRef, useState } from 'react';
import * as S from './RenameWorkTypeModal.styled';
import { Button, Divider, Modal, Text, View } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';

interface IRenameWorkTypeModalProps {
	name: string;
	isActive: boolean;
	currentWorkTypes: string[];
	closeModal: () => void;
	renameWorkType: (name: string) => void;
}

export const RenameWorkTypeModal: FC<IRenameWorkTypeModalProps> = ({
	name,
	isActive,
	currentWorkTypes,
	closeModal,
	renameWorkType,
}) => {
	const renameWorkTypeInputRef = useRef<HTMLInputElement>(null);
	const [newWorkTypeName, setNewWorkTypeName] = useState(name);
	const [isWorkTypeNameValid, setIsWorkTypeNameValid] = useState(false);
	const [isShowError, setIsShowError] = useState(false);

	useEffect(() => {
		if (isActive) {
			setTimeout(() => {
				renameWorkTypeInputRef.current?.focus();
			}, 100);
		}
	}, [isActive]);

	useEffect(() => {
		setNewWorkTypeName(name);
	}, [name, isActive]);

	useEffect(() => {
		const newIsWorkTypeNameValid = currentWorkTypes
			.map((currentWorkType) => currentWorkType.toLowerCase())
			.includes(newWorkTypeName.trim().toLowerCase());
		setIsWorkTypeNameValid(!newIsWorkTypeNameValid);
	}, [currentWorkTypes, newWorkTypeName]);

	useEffect(() => {
		setIsShowError(!isWorkTypeNameValid && newWorkTypeName.trim().toLowerCase() !== name.toLowerCase());
	}, [newWorkTypeName, name, isWorkTypeNameValid]);

	return (
		<Modal size='660px' padding={0} active={isActive} onClose={closeModal}>
			<View padding={4} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
				<Modal.Title>
					<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
						Переименовать тип работ
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
					<S.RenameWorkTypeInput
						name='name'
						ref={renameWorkTypeInputRef}
						placeholder={name}
						value={newWorkTypeName}
						onChange={(e) => setNewWorkTypeName(e.target.value)}
						autoComplete='off'
					/>
					{isShowError && (
						<S.RenameWorkTypeError variant='caption-1' color='critical'>
							Тип работ с таким названием уже существует
						</S.RenameWorkTypeError>
					)}
				</View>
			</View>
			<Divider />
			<View padding={4} align='end'>
				<Button
					color='primary'
					size='small'
					disabled={!newWorkTypeName.trim() || !isWorkTypeNameValid}
					onClick={() => renameWorkType(newWorkTypeName.trim())}
				>
					<Text variant='caption-1'>Обновить</Text>
				</Button>
			</View>
		</Modal>
	);
};
