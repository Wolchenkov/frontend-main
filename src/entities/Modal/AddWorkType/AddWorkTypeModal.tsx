import React, { FC, KeyboardEvent, useEffect, useState, useRef } from 'react';
import * as S from './AddWorkTypeModal.styled';
import { Dismissible, Modal, View, Text, Divider, Button } from 'reshaped/bundle';
import { PillWithInput } from '../../Pills/PillWithInput/PillWithInput';
import { useShowToast } from '../../../shared/utility/Hooks';
import { useAddWorkTypeMutation } from '../../../store/management/managementApi';

interface IAddWorkTypeModalProps {
	currentWorkTypes: string[];
	isActive: boolean;
	closeModal: () => void;
}

export const AddWorkTypeModal: FC<IAddWorkTypeModalProps> = ({ currentWorkTypes, isActive, closeModal }) => {
	const [workTypeName, setWorkTypeName] = useState('');
	const [isWorkTypeNameValid, setIsWorkTypeNameValid] = useState(false);
	const [hourlyRate, setHourlyRate] = useState('');

	const addWorkTypeNameInputRef = useRef<HTMLInputElement>(null);

	const showToast = useShowToast();
	const [addWorkType] = useAddWorkTypeMutation();

	useEffect(() => {
		const newIsWorkTypeNameValid = currentWorkTypes
			.map((currentWorkType) => currentWorkType.toLowerCase())
			.includes(workTypeName.trim().toLowerCase());
		setIsWorkTypeNameValid(!newIsWorkTypeNameValid);
	}, [currentWorkTypes, workTypeName]);

	const createWorkType = () => {
		closeModal();
		addWorkType({
			type: workTypeName,
			cost: hourlyRate,
		})
			.unwrap()
			.then(() => {
				showToast('Тип работ добавлен');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	const handleHourlyRateKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (!/[0-9]/.test(event.key)) {
			event.preventDefault();
		}
	};

	const transformWorkType = (workType: string) => workType.replaceAll(/\s+/g, '');

	const transformShownWorkType = (workType: string) => (workType ? Number(workType).toLocaleString('ru-RU') : '');

	const changeHourlyRate = (_fieldName: string, fieldValue: string) => {
		setHourlyRate(fieldValue);
	};

	const handleModalClose = () => {
		closeModal();
		setWorkTypeName('');
		setHourlyRate('');
	};

	return (
		<>
			<S.AddWorkTypeModal size='660px' padding={0} active={isActive} onClose={handleModalClose}>
				<View padding={4}>
					<Dismissible closeAriaLabel='Закрыть' onClose={handleModalClose}>
						<Modal.Title>
							<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
								Новый тип работ
							</Text>
						</Modal.Title>
					</Dismissible>
				</View>
				<Divider />

				<View padding={4}>
					<View paddingBottom={16} attributes={{ style: { position: 'relative' } }}>
						<S.AddWorkTypeNameInput
							name='name'
							value={workTypeName}
							ref={addWorkTypeNameInputRef}
							placeholder='Название типа работ'
							onChange={(e) => setWorkTypeName(e.target.value)}
							autoComplete='off'
						/>
						{!isWorkTypeNameValid && (
							<S.AddWorkTypeNameError variant='caption-1' color='critical'>
								Тип работ с таким названием уже существует
							</S.AddWorkTypeNameError>
						)}
					</View>
					<View direction='row' gap={1} paddingBottom={1} wrap>
						<PillWithInput
							width='240px'
							name='hourlyRate'
							title='Установить ставку'
							icon='money-ruble-circle-line'
							placeholder='₽/час'
							handleKeyPress={handleHourlyRateKeyPress}
							transformInputValue={transformWorkType}
							transformShownValue={transformShownWorkType}
							onChange={changeHourlyRate}
						/>
					</View>
				</View>
				<Divider />

				<View direction='row' padding={4} justify='end' gap={1}>
					<Button
						color='primary'
						size='small'
						disabled={!workTypeName.trim() || !isWorkTypeNameValid || !hourlyRate}
						onClick={createWorkType}
					>
						<Text variant='caption-1'>Добавить</Text>
					</Button>
				</View>
			</S.AddWorkTypeModal>
		</>
	);
};
