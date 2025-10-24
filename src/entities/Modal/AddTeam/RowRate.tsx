import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Divider } from 'reshaped/bundle';
import * as S from './RowRate.styled';
import CustomNumberInput from '../../CustomInput/CustomNumberInput';
import { SvgComponent } from '../../../shared';

// interface IFetchingTypesData {
// 	id: number;
// 	cost: number;
// }

interface IRowRateprops {
	id: number;
	cost: number;
	type: string;
	setFetchingTypesData: React.Dispatch<React.SetStateAction<fetchingTypeWork[]>>;
}

export const RowRate: FC<IRowRateprops> = ({ id, cost, type, setFetchingTypesData }) => {
	const [isEditHourlyRate, setIsEditHourRate] = useState(false); //стейт для редактирования стоимости работы
	const [hoverHourlyRate, setHoverHourlyRate] = useState(false); // стейт для hover над ячейкой стоимости работы
	const [hourlyRate, setHourlyRate] = useState<string>(cost.toString());
	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setHourlyRate(e.target.value);
	};

	function handleChangeHourlyRate() {
		setIsEditHourRate(!isEditHourlyRate);
		setFetchingTypesData((prev) => {
			return prev.map((item) => {
				if (item.id === id) {
					return { ...item, cost: Number(hourlyRate.replace(/\s/g, '')) };
				}
				return item;
			});
		});
	}

	const CustomNumberInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditHourlyRate) {
			setTimeout(() => {
				CustomNumberInputRef.current?.focus();
			}, 100);
		}
	}, [isEditHourlyRate]);
	return (
		<>
			<S.Container
				onMouseEnter={() => setHoverHourlyRate(true)}
				onMouseLeave={() => setHoverHourlyRate(false)}
				backgroundColor={hoverHourlyRate}
			>
				<S.MyText variant='caption-1'>{type}</S.MyText>
				<S.RateContainer>
					{isEditHourlyRate ? (
						<CustomNumberInput
							ref={CustomNumberInputRef}
							placeholder={Number(hourlyRate).toLocaleString('ru-RU')}
							onChange={(e) => handleOnChange(e)}
						/>
					) : (
						<S.MyText variant='caption-1' attributes={{ style: { width: 34 } }}>
							{Number(hourlyRate.replace(/\s/g, '')).toLocaleString('ru-RU')}
						</S.MyText>
					)}
					{hoverHourlyRate && (
						<Button
							onClick={isEditHourlyRate ? handleChangeHourlyRate : () => setIsEditHourRate(true)}
							color='neutral'
							size='small'
							startIcon={<SvgComponent name={isEditHourlyRate ? 'check-fill' : 'pencil-line'} />}
						/>
					)}
				</S.RateContainer>
			</S.Container>
			<Divider />
		</>
	);
};
