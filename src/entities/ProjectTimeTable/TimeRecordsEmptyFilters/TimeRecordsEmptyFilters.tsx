import { FC } from 'react';
import * as S from './TimeRecordsEmptyFilters.styled';
import { Avatar } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';

const TimeRecordsEmptyFilters: FC = () => {
	return (
		<S.TimeRecordsEmptyFilters>
			<Avatar squared={true} icon={<SvgComponent name='time-line-2' />} />
			<S.TimeRecordsEmptyFiltersTitle variant='body-1'>
				С выбранными фильтрами ничего не нашлось <span>Поменяйте фильтры!</span>
			</S.TimeRecordsEmptyFiltersTitle>
		</S.TimeRecordsEmptyFilters>
	);
};

export default TimeRecordsEmptyFilters;
