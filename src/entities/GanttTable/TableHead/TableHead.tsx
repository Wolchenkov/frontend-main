import { FC } from 'react';
import { isWeekend, format } from 'date-fns';
import ru from 'date-fns/locale/ru';

import { Text } from 'reshaped/bundle';
import * as S from './TableHead.styled';

import { MONTHS } from '../../../shared/utility/Constants/months';

interface ITableHeadProps {
	interval: [string, Date[]][] | undefined;
}

export const TableHead: FC<ITableHeadProps> = ({ interval }) => {
	return (
		<S.TableHead>
			<S.Stage>
				<Text variant='caption-1'>Этап/задача</Text>
			</S.Stage>
			{interval?.map((month) => (
				<S.Month key={month[0]}>
					<S.MonthName>
						<Text variant='caption-1'>{MONTHS[Number(month[0])]}</Text>
					</S.MonthName>
					<S.Days>
						{month[1].map((date, i) => (
							<div key={month[0] + i}>
								<Text variant='caption-1' color={isWeekend(date) ? 'disabled' : undefined}>
									{format(date, 'd', { locale: ru })}
								</Text>
							</div>
						))}
					</S.Days>
				</S.Month>
			))}
		</S.TableHead>
	);
};
