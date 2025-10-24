/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from 'react';
import * as S from './Empty.styled';
import { daysOfWeek } from '../Schedule';

interface IScheduleEmptyProps {
	dates: number[];
}

export const ScheduleEmpty: FC<IScheduleEmptyProps> = ({ dates }) => {
	return (
		<>
			<S.TableHead>
				{daysOfWeek.map((day, index) => (
					<S.TableHeadText key={day} variant='caption-1' isWeekend={index === 5 || index === 6}>
						{day} {index === 5 || index === 6 ? '' : dates[index]}
					</S.TableHeadText>
				))}
				<S.TableHeadText variant='caption-1'>итого</S.TableHeadText>
			</S.TableHead>

			<S.TableRowTotal>
				<S.TableRowTotalCell>
					<S.TableRowTotalText variant='body-strong-2' attributes={{ style: { fontSize: '14px' } }}>
						Общее по задачам
					</S.TableRowTotalText>
				</S.TableRowTotalCell>
				{daysOfWeek.map((day, index) => (
					<S.TableRowTotalCell key={day} isWeekend={index === 5 || index === 6}>
						<S.TableRowTotalText variant='body-strong-2'>
							{index === 5 || index === 6 ? '' : '00:00'}
						</S.TableRowTotalText>
					</S.TableRowTotalCell>
				))}
				<S.TableRowTotalCell>
					<S.TableRowTotalText variant='body-strong-2'>00:00</S.TableRowTotalText>
				</S.TableRowTotalCell>
			</S.TableRowTotal>
		</>
	);
};
