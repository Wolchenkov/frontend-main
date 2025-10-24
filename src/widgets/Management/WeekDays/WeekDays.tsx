import React, { FC, useState, useEffect } from 'react';
import * as S from './WeekDays.styled';
import { SvgComponent } from '../../../shared';
import { Actionable, Tooltip } from 'reshaped/bundle';
import { ManagementTimeZone } from './TimeZone/TimeZone';
import { ManagementUsualWeekDays } from './UsualWeekDays/UsualWeekDays';
import { ManagementHolidays } from './Holidays/Holidays';
import { ManagementExtraWeekDays } from './ExtraWeekDays/ExtraWeekDays';
import { useGetWeekDaysQuery } from '../../../store/management/managementApi';

export enum DateType {
	HOLIDAY = 'holiday',
	WORKDAY = 'workday',
}

export const ManagementWeekDays: FC = () => {
	const [timeZone, setTimeZone] = useState<{ region: string; timezone: string }>();
	const [usualWeekDays, setUsualWeekDays] = useState<string[]>();
	const [holidays, setHolidays] = useState<string[]>();
	const [extraWeekDays, setExtraWeekDays] = useState<string[]>();

	const { data: workDays } = useGetWeekDaysQuery();

	useEffect(() => {
		if (workDays) {
			setTimeZone(workDays.timeZone);
			setUsualWeekDays(workDays.workDays.map((item) => String(item)));
			setHolidays(workDays.notWorkDays);
			setExtraWeekDays(workDays.extraDays);
		}
	}, [workDays]);

	return (
		<>
			<S.Title variant='title-3'>Рабочие дни</S.Title>
			<S.Description variant='body-2'>
				Здесь вы можете настроить дни стандартной рабочей недели, а так же отметить дополнительные нерабочие дни
			</S.Description>

			{timeZone && (
				<S.Group>
					<S.GroupTitle variant='body-medium-1'>Часовой пояс</S.GroupTitle>
					<ManagementTimeZone regionData={timeZone} />
				</S.Group>
			)}

			{usualWeekDays && (
				<S.Group>
					<S.GroupTitle variant='body-medium-1'>Стандартные рабочие дни</S.GroupTitle>
					<ManagementUsualWeekDays usualWeekDays={usualWeekDays} />
				</S.Group>
			)}

			{holidays && (
				<S.Group>
					<S.GroupTitle variant='body-medium-1'>Нерабочие дни</S.GroupTitle>
					<ManagementHolidays
						holidays={holidays}
						setHolidays={setHolidays}
						busyDates={[...holidays, ...(extraWeekDays || [])]}
					/>
				</S.Group>
			)}

			{extraWeekDays && (
				<S.Group>
					<S.GroupTitle variant='body-medium-1'>
						Дополнительные рабочие дни
						<Tooltip
							position='bottom-start'
							text={<div style={{ width: '224px' }}>Например, если рабочий день выпал на календарный выходной</div>}
						>
							{(attributes) => (
								<Actionable
									attributes={{
										...attributes,
										style: { display: 'flex', alignItems: 'center', cursor: 'default' },
									}}
								>
									<SvgComponent name='question-line' />
								</Actionable>
							)}
						</Tooltip>
					</S.GroupTitle>
					<ManagementExtraWeekDays
						extraWeekDays={extraWeekDays}
						setExtraWeekDays={setExtraWeekDays}
						busyDates={[...(holidays ?? []), ...extraWeekDays]}
					/>
				</S.Group>
			)}
		</>
	);
};
