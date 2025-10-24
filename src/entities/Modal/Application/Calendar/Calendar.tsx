/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FC } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import ru from 'date-fns/locale/ru';
import * as S from './Calendar.styled';
import { Button, DropdownMenu, Text } from 'reshaped/bundle';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { useCalendarController } from './CalendarController';
import { SvgComponent } from '../../../../shared';

interface ICalendarProps {
	busyData: string[][];
	onChange: (fieldName: keyof INewApplication, fieldValue: INewApplication[keyof INewApplication]) => void;
}

export const Calendar: FC<ICalendarProps> = ({ busyData, onChange }) => {
	const {
		isDropdownActive,
		startDate,
		endDate,
		buttonTitle,
		busyDates,
		busyIntervals,
		handleButtonClick,
		handleDocumentClick,
		handleDateChange,
	} = useCalendarController({ busyData, onChange });

	return (
		<DropdownMenu position='bottom-start' width='284px' active={isDropdownActive} onClose={handleDocumentClick}>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<S.CalendarMenuButton
						variant='outline'
						size='medium'
						startIcon={<SvgComponent name='calendar-todo-line' />}
						onClick={handleButtonClick}
						attributes={{ ...attributes, style: { padding: '7px 22px 7px 7px', transform: 'none' } }}
					>
						<Text variant='body-2' attributes={{ style: { marginLeft: '4px', letterSpacing: '-0.02em' } }}>
							{buttonTitle}
						</Text>
					</S.CalendarMenuButton>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<S.CalendarMenuContentWrap>
					<S.CalendarMenuDatePickerWrapper>
						<DatePicker
							wrapperClassName='datePicker'
							locale={ru}
							onChange={handleDateChange}
							inline
							startDate={startDate}
							endDate={endDate}
							minDate={new Date()}
							excludeDates={busyDates}
							excludeDateIntervals={busyIntervals}
							selectsRange
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
						/>
					</S.CalendarMenuDatePickerWrapper>
				</S.CalendarMenuContentWrap>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
