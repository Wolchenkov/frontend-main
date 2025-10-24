import React, { Dispatch, FC, SetStateAction } from 'react';
import { View } from 'reshaped/bundle';
import { DateWithCalendar } from '../DateWithCalendar/DateWithCalendar';
import { DateType } from '../WeekDays';

interface IExtraWeekDaysProps {
	busyDates: string[];
	extraWeekDays: string[];
	setExtraWeekDays: Dispatch<SetStateAction<string[] | undefined>>;
}

export const ManagementExtraWeekDays: FC<IExtraWeekDaysProps> = ({ busyDates, extraWeekDays, setExtraWeekDays }) => {
	// const [myExtraWeekDays, setMyExtraWeekDays] = useState<string[]>(extraWeekDays);

	return (
		<div>
			<View direction='row' gap={1}>
				{extraWeekDays.map((day) => (
					<DateWithCalendar
						key={day}
						value={day}
						type={DateType.WORKDAY}
						dates={busyDates.map((item) => new Date(item))}
						setDates={setExtraWeekDays}
					/>
				))}
				<DateWithCalendar
					value={null}
					type={DateType.WORKDAY}
					dates={busyDates.map((item) => new Date(item))}
					setDates={setExtraWeekDays}
				/>
			</View>
		</div>
	);
};
