import { FC } from 'react';
import { format, isEqual } from 'date-fns';
import ru from 'date-fns/locale/ru';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { DropdownMenu, Text, Button } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import * as S from './CalendarMenu.styled';

interface ICalendarProps {
	dateFilter: { start: Date | null; end: Date | null };
	setDateFilter: React.Dispatch<
		React.SetStateAction<{
			start: Date | null;
			end: Date | null;
		}>
	>;
}

const CalendarMenu: FC<ICalendarProps> = ({ dateFilter, setDateFilter }) => {
	const onChange = (dates: [Date | null, Date | null]) => {
		const [start, end] = dates;
		setDateFilter({ start, end });
	};

	return (
		<DropdownMenu width='530px'>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<S.DateWrapper attributes={attributes}>
						{dateFilter.start ? (
							<>
								<Text variant='caption-1'>{format(dateFilter.start, 'dd.MM.yyyy', { locale: ru })}</Text>
								{!isEqual(dateFilter.start, dateFilter.end ?? 0) && (
									<>
										<Text variant='caption-1' attributes={{ style: { padding: '0 3px' } }}>
											–
										</Text>
										{dateFilter.end && (
											<Text variant='caption-1'>{format(dateFilter.end, 'dd.MM.yyyy', { locale: ru })}</Text>
										)}
									</>
								)}
							</>
						) : (
							<>
								<Text variant='caption-1'>Дата:</Text>
								<S.TextAll variant='caption-1'>все</S.TextAll>
							</>
						)}
						<S.ArrowDownWrapper>
							<SvgComponent name='arrow-down-s-fill' />
						</S.ArrowDownWrapper>
					</S.DateWrapper>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<S.DatePickerWrapper>
					<DatePicker
						wrapperClassName='datePicker'
						selected={dateFilter.start}
						onChange={onChange}
						startDate={dateFilter.start}
						endDate={dateFilter.end}
						selectsRange
						locale={ru}
						inline
						monthsShown={2}
						disabledKeyboardNavigation
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
						renderDayContents={(day, date) => <div>{format(date ? date : day, 'd', { locale: ru })}</div>}
					/>
				</S.DatePickerWrapper>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};

export default CalendarMenu;
