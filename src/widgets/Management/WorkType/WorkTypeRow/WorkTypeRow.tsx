import React, { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import * as S from './WorkTypeRow.styled';
import { WorkTypeMenu } from '../WorkTypeMenu/WorkTypeMenu';
import { SvgComponent } from '../../../../shared';
import { useUpdateWorkTypeMutation } from '../../../../store/management/managementApi';

interface IWorkTypeRowProps {
	data: IManagementWorkType;
	currentWorkTypes: string[];
}

export const WorkTypeRow: FC<IWorkTypeRowProps> = ({ data, currentWorkTypes }) => {
	const { id, type, cost } = data;

	const [isRowHovered, setIsRowHovered] = useState(false);
	const [isHourlyRateHovered, setIsHourlyRateHovered] = useState(false);
	const [isEditHourlyRate, setIsEditHourlyRate] = useState(false);

	const [hourlyRate, setHourlyRate] = useState(cost);
	const [newHourlyRate, setNewHourlyRate] = useState('');

	const inputRef = useRef<HTMLInputElement>(null);
	const [updateWorkType] = useUpdateWorkTypeMutation();

	useEffect(() => {
		if (isEditHourlyRate) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 100);
		}
	}, [isEditHourlyRate]);

	const handleRowButtonClick = () => {
		if (isEditHourlyRate) {
			newHourlyRate && setHourlyRate(+newHourlyRate);
			newHourlyRate &&
				updateWorkType({
					typeWorkId: id,
					body: {
						type,
						cost: newHourlyRate,
					},
				});
			setNewHourlyRate('');
		}

		setIsEditHourlyRate(!isEditHourlyRate);
	};

	const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (!/[0-9]/.test(event.key)) {
			event.preventDefault();
		}
	};

	return (
		<S.TableRow
			isHovered={isRowHovered}
			onMouseEnter={() => setIsRowHovered(true)}
			onMouseLeave={() => {
				setIsRowHovered(false);
				setIsEditHourlyRate(false);
				setNewHourlyRate('');
			}}
		>
			<S.TableRowCell>
				<S.TableRowCellText variant='caption-1'>{type}</S.TableRowCellText>
			</S.TableRowCell>

			<S.TableRowCell
				onMouseEnter={() => setIsHourlyRateHovered(true)}
				onMouseLeave={() => setIsHourlyRateHovered(false)}
			>
				{isEditHourlyRate ? (
					<S.TableRowInput
						ref={inputRef}
						placeholder={hourlyRate.toLocaleString('ru-RU')}
						value={newHourlyRate ? Number(newHourlyRate).toLocaleString('ru-RU') : ''}
						onKeyPress={handleKeyPress}
						onChange={(e) => setNewHourlyRate(e.target.value.replaceAll(/\s+/g, ''))}
					/>
				) : (
					<S.TableRowCellText variant='caption-1'>{hourlyRate.toLocaleString('ru-RU')}</S.TableRowCellText>
				)}
				{isHourlyRateHovered && (
					<S.TableRowButton
						size='small'
						variant='ghost'
						startIcon={<SvgComponent name={isEditHourlyRate ? 'check-fill' : 'pencil-line'} />}
						onClick={handleRowButtonClick}
					/>
				)}
			</S.TableRowCell>
			<WorkTypeMenu isVisible={isRowHovered} data={data} currentWorkTypes={currentWorkTypes} />
		</S.TableRow>
	);
};
