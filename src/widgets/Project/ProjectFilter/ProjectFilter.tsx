import React, { FC } from 'react';
import * as S from './ProjectFilter.styled';
import { FilterStatus } from './FilterStatus/FilterStatus';
import { FilterPriority } from './FilterPriority/FilterPriority';
import { FilterUser } from './FilterUser/FilterUser';
import { FilterCalendar } from './FilterCalendar/FilterCalendar';
import { Button, View } from 'reshaped/bundle';
import { useAppDispatch, useAppSelector } from '../../../store';
import { setFilter, selectFilter, selectIsFilterOpened } from '../../../store/tasks/tasksSlice';

interface IProjectFilterProps {
	users: IMember[];
}

export const ProjectFilter: FC<IProjectFilterProps> = ({ users }) => {
	const dispatch = useAppDispatch();
	const changeFilter = (
		newFilter:
			| object
			| { status: number | null }
			| { delegate_id: number | null }
			| { priority: number | null }
			| { date_start: [Date | null, Date | null] | null }
	) => dispatch(setFilter(newFilter));
	const filter = useAppSelector(selectFilter);
	const isFilterOpened = useAppSelector(selectIsFilterOpened);

	return (
		<>
			{isFilterOpened && (
				<S.ProjectFilter>
					<View direction='row' gap={4}>
						<FilterStatus value={filter.status as null} onChange={changeFilter} />
						<FilterUser value={filter.delegate_id as null} users={users} onChange={changeFilter} />
						<FilterPriority value={filter.priority as null} onChange={changeFilter} />
						<FilterCalendar value={filter.date_start as null} onChange={changeFilter} date={null} />
					</View>
					{!!Object.values(filter).filter((value) => value !== null).length && (
						<Button
							size='small'
							attributes={{ style: { letterSpacing: '-0.02em', transform: 'none' } }}
							onClick={() => changeFilter({})}
						>
							Сбросить
						</Button>
					)}
				</S.ProjectFilter>
			)}
		</>
	);
};
