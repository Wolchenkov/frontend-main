import React, { Dispatch, FC, SetStateAction } from 'react';
import { View } from 'reshaped/bundle';
import { DateWithCalendar } from '../DateWithCalendar/DateWithCalendar';
import { DateType } from '../WeekDays';

interface IHolidaysProps {
	busyDates: string[];
	holidays: string[];
	setHolidays: Dispatch<SetStateAction<string[] | undefined>>;
}

export const ManagementHolidays: FC<IHolidaysProps> = ({ busyDates, holidays, setHolidays }) => {
	// const [myHolidays, setMyHoliDays] = useState<string[]>(holidays);

	return (
		<div>
			<View direction='row' gap={1}>
				{holidays.map((day) => (
					<DateWithCalendar
						key={day}
						value={day}
						type={DateType.HOLIDAY}
						dates={busyDates.map((item) => new Date(item))}
						setDates={setHolidays}
					/>
				))}
				<DateWithCalendar
					value={null}
					type={DateType.HOLIDAY}
					dates={busyDates.map((item) => new Date(item))}
					setDates={setHolidays}
				/>
			</View>
		</div>
	);
};
