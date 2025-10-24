import React, { FC, useState } from 'react';
import * as S from './UsualWeekDays.styled';
import { Checkbox, CheckboxGroup, View } from 'reshaped/bundle';
import { useUpdateWeekDaysMutation } from '../../../../store/management/managementApi';

const DAYS = [
	{
		name: '1',
		text: 'Пн',
	},
	{
		name: '2',
		text: 'Вт',
	},
	{
		name: '3',
		text: 'Ср',
	},
	{
		name: '4',
		text: 'Чт',
	},
	{
		name: '5',
		text: 'Пт',
	},
	{
		name: '6',
		text: 'Сб',
	},
	{
		name: '7',
		text: 'Вс',
	},
];

interface IUsualWeekDaysProps {
	usualWeekDays: string[];
}

export const ManagementUsualWeekDays: FC<IUsualWeekDaysProps> = ({ usualWeekDays }) => {
	const [weekDays, setWeekDays] = useState<string[]>(usualWeekDays);

	const [updateWeekDays] = useUpdateWeekDaysMutation();

	return (
		<CheckboxGroup
			name='usualWeekDays'
			value={weekDays}
			onChange={({ value }) => {
				setWeekDays(value);
				updateWeekDays({ workdays: value.map((item) => +item) });
			}}
		>
			<View direction='row' gap={3}>
				{DAYS.map((day) => {
					return (
						<View key={day.name} gap={1} as='label'>
							<S.CheckboxText variant='caption-1' color='neutral-faded'>
								{day.text}
							</S.CheckboxText>
							<Checkbox value={day.name} />
						</View>
					);
				})}
			</View>
		</CheckboxGroup>
	);
};
