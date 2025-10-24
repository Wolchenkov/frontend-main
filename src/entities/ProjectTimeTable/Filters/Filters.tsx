import { FC } from 'react';
import CalendarMenu from '../CalendarMenu/CalendarMenu';
import UserMenu from '../UserMenu/UserMenu';

import { Text, Button, Switch } from 'reshaped/bundle';
import * as S from './Filters.styled';

interface IFiltersProps {
	timeRecords: ITimeRecord[] | undefined;
	userFilter: {
		id: number;
		avatar: string;
		name: string;
	} | null;
	setUserFilter: React.Dispatch<
		React.SetStateAction<{
			id: number;
			avatar: string;
			name: string;
		} | null>
	>;
	showApproved: boolean;
	setShowApproved: React.Dispatch<React.SetStateAction<boolean>>;
	dateFilter: {
		start: Date | null;
		end: Date | null;
	};
	setDateFilter: React.Dispatch<
		React.SetStateAction<{
			start: Date | null;
			end: Date | null;
		}>
	>;
}

const Filters: FC<IFiltersProps> = ({
	timeRecords,
	userFilter,
	setUserFilter,
	showApproved,
	setShowApproved,
	dateFilter,
	setDateFilter,
}) => {
	return (
		<S.FiltersWrapper>
			<div>
				<UserMenu userFilter={userFilter} setUserFilter={setUserFilter} timeRecords={timeRecords} />
				<CalendarMenu dateFilter={dateFilter} setDateFilter={setDateFilter} />
			</div>
			<div>
				<Text variant='caption-1'>Показывать согласованные</Text>
				<Switch
					name='switch'
					attributes={{ style: { marginLeft: '8px' } }}
					checked={showApproved}
					onChange={({ checked }) => setShowApproved(checked)}
				/>
				<Button
					size='small'
					attributes={{ style: { marginLeft: '24px' } }}
					onClick={() => {
						setShowApproved(false);
						setDateFilter({ start: null, end: null });
						setUserFilter(null);
					}}
				>
					Сбросить
				</Button>
			</div>
		</S.FiltersWrapper>
	);
};

export default Filters;
