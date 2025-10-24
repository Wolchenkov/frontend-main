/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import ru from 'date-fns/locale/ru';
import * as S from './DateWithCalendar.styled';
import { Button, DropdownMenu, Text, Divider, View, useToggle } from 'reshaped/bundle';
import { format } from 'date-fns';
import { SvgComponent } from '../../../../shared';
import { DateType } from '../WeekDays';
import {
	useAddHolidayMutation,
	useDeleteHolidayMutation,
	useAddExtraWeekDayMutation,
	useDeleteExtraWeekDayMutation,
} from '../../../../store/management/managementApi';

interface IPillCalendarProps {
	type: DateType;
	value: string | null;
	dates: Date[];
	setDates: Dispatch<SetStateAction<string[] | undefined>>;
}

export const DateWithCalendar: FC<IPillCalendarProps> = ({ type, value, dates, setDates }) => {
	const [isPillActive, setIsPillActive] = useState(false);
	const { active: isDropdownActive, activate: activateDropdown, deactivate: deactivateDropdown } = useToggle(false);

	const [pillTitle, setPillTitle] = useState<Date | null>(value === null ? null : new Date(value));
	const [date, setDate] = useState<Date | null>(value === null ? null : new Date(value));

	const [addHoliday] = useAddHolidayMutation();
	const [deleteHoliday] = useDeleteHolidayMutation();

	const [addExtraWeekDay] = useAddExtraWeekDayMutation();
	const [deleteExtraWeekDay] = useDeleteExtraWeekDayMutation();

	useEffect(() => {
		!isDropdownActive && setDate(pillTitle);
	}, [isDropdownActive, pillTitle]);

	const handlePillButtonClick = () => {
		setIsPillActive(!isPillActive);
		isDropdownActive ? deactivateDropdown() : activateDropdown();
	};

	const handleModalClose = () => {
		setIsPillActive(false);
		deactivateDropdown();
	};

	const handleDateReset = () => {
		handleModalClose();

		if ((date as Date).setHours(0, 0, 0, 0) !== (pillTitle as Date).setHours(0, 0, 0, 0)) return;

		setDates((prevState) => (prevState ?? []).filter((item) => item !== format(date as Date, 'yyyy-MM-dd')));
		type === DateType.HOLIDAY
			? deleteHoliday({ date: format(date as Date, 'yyyy-MM-dd') })
			: deleteExtraWeekDay({ date: format(date as Date, 'yyyy-MM-dd') });
	};

	const handleDateSave = () => {
		handleModalClose();

		if (pillTitle && (date as Date).setHours(0, 0, 0, 0) === pillTitle.setHours(0, 0, 0, 0)) return;

		if (pillTitle) {
			setPillTitle(date);
			setDates((prevState) =>
				(prevState ?? []).map((item) =>
					item === format(pillTitle, 'yyyy-MM-dd') ? format(date as Date, 'yyyy-MM-dd') : item
				)
			);
			type === DateType.HOLIDAY
				? deleteHoliday({ date: format(pillTitle, 'yyyy-MM-dd') })
				: deleteExtraWeekDay({ date: format(pillTitle, 'yyyy-MM-dd') });
			type === DateType.HOLIDAY
				? addHoliday({ date: format(date as Date, 'yyyy-MM-dd') })
				: addExtraWeekDay({ date: format(date as Date, 'yyyy-MM-dd') });
		} else {
			setDates((prevState) => [...(prevState ?? []), format(date as Date, 'yyyy-MM-dd')]);
			type === DateType.HOLIDAY
				? addHoliday({ date: format(date as Date, 'yyyy-MM-dd') })
				: addExtraWeekDay({ date: format(date as Date, 'yyyy-MM-dd') });
		}
	};

	return (
		<DropdownMenu position='bottom-start' width='284px' active={isDropdownActive} onClose={handleModalClose}>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<S.DropdownButton
						{...attributes}
						variant='outline'
						size='small'
						active={isPillActive}
						onClick={handlePillButtonClick}
					>
						<Text
							variant='caption-1'
							attributes={{
								style: { fontWeight: '500', lineHeight: '20px', letterSpacing: '-0.01em' },
							}}
						>
							{pillTitle ? format(pillTitle, 'd MMMM yyyy', { locale: ru }) : '+'}
						</Text>
					</S.DropdownButton>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<S.DropdownMenuContentWrap>
					<S.DatePickerWrapper>
						<DatePicker
							wrapperClassName='datePicker'
							locale={ru}
							selected={date}
							onChange={(newDate) => setDate(newDate)}
							inline
							excludeDates={dates}
							renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
								<div>
									<Button
										variant='ghost'
										startIcon={<SvgComponent name='arrow-left-s' />}
										size='small'
										aria-label='Previous month'
										className={'react-datepicker__navigation react-datepicker__navigation--previous'}
										onClick={decreaseMonth}
									/>
									<Text
										variant='caption-1'
										className='react-datepicker__current-month'
										attributes={{
											style: { fontSize: '12px', lineHeight: '20px', fontWeight: 500, letterSpacing: '-0.01em' },
										}}
									>
										{format(monthDate, 'LLLL yyyy', { locale: ru })}
									</Text>
									<Button
										variant='ghost'
										startIcon={<SvgComponent name='arrow-right-s' />}
										size='small'
										aria-label='Next month'
										className={'react-datepicker__navigation react-datepicker__navigation--next'}
										onClick={increaseMonth}
									/>
								</div>
							)}
						>
							<Divider />
							<View direction='row' justify='center' gap={1} attributes={{ style: { padding: '16px 0 4px' } }}>
								<Button color='white' size='small' disabled={date === null} onClick={handleDateReset}>
									<Text variant='body-2' attributes={{ style: { fontWeight: 500, letterSpacing: '-0.02em' } }}>
										Сбросить
									</Text>
								</Button>
								<Button color='white' size='small' disabled={date === null} onClick={handleDateSave}>
									<Text
										color={'primary'}
										variant='body-2'
										attributes={{ style: { fontWeight: 500, letterSpacing: '-0.02em' } }}
									>
										Сохранить
									</Text>
								</Button>
							</View>
						</DatePicker>
					</S.DatePickerWrapper>
				</S.DropdownMenuContentWrap>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
