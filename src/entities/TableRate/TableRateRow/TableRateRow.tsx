import React, { Dispatch, FC, KeyboardEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import * as S from './TableRateRow.styled';
import { Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';

interface ITableRateRowProps {
	data: fetchingDictionaryTypeWork;
	onChange: Dispatch<SetStateAction<fetchingDictionaryTypeWork[]>>;
}

export const TableRateRow: FC<ITableRateRowProps> = ({ data, onChange }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [rate, setRate] = useState(data.cost);
	const [newRate, setNewRate] = useState('');

	const rateRowInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEdit) {
			setTimeout(() => {
				rateRowInputRef.current?.focus();
			}, 100);
		}
	}, [isEdit]);

	useEffect(() => {
		onChange((oldRates) =>
			oldRates.map((oldRate) => {
				if (oldRate.id === data.id) {
					return { ...oldRate, cost: rate };
				} else {
					return oldRate;
				}
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rate]);

	const handleRowButtonClick = () => {
		if (isEdit) {
			newRate && setRate(+newRate);
			setNewRate('');
		}

		setIsEdit(!isEdit);
	};

	const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (!/[0-9]/.test(event.key)) {
			event.preventDefault();
		}
	};

	return (
		<S.TableRateRow onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} hover={isHovered}>
			<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
				{data.type}
			</Text>
			{isEdit ? (
				<S.TableRateRowInput
					ref={rateRowInputRef}
					placeholder={rate.toLocaleString('ru-RU')}
					value={newRate ? Number(newRate).toLocaleString('ru-RU') : ''}
					onKeyPress={handleKeyPress}
					onChange={(e) => setNewRate(e.target.value.replaceAll(/\s+/g, ''))}
				/>
			) : (
				<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
					{rate.toLocaleString('ru-RU')}
				</Text>
			)}
			{isHovered && (
				<S.TableRateRowButton
					size='small'
					variant='ghost'
					startIcon={isEdit ? <SvgComponent name='check-fill' /> : <SvgComponent name='pencil-line' />}
					onClick={handleRowButtonClick}
				/>
			)}
		</S.TableRateRow>
	);
};
