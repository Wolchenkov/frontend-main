import { FC } from 'react';
import * as S from './TimeRecordsEmpty.styled';
import { Avatar } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';

const TimeRecordsEmpty: FC = () => {
	return (
		<S.TimeRecordsEmpty>
			<Avatar squared={true} icon={<SvgComponent name='time-line-2' />} />
			<S.TimeRecordsEmptyTitle variant='body-1'>По задачам пока нет отметок времени</S.TimeRecordsEmptyTitle>
			<S.TimeRecordsEmptyText variant='caption-1' color='neutral-faded'>
				Первая запись появится после того, как исполнитель отметит время в задаче
			</S.TimeRecordsEmptyText>
		</S.TimeRecordsEmpty>
	);
};

export default TimeRecordsEmpty;
