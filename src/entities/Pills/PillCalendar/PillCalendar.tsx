/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Dispatch, FC, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import ru from 'date-fns/locale/ru';
import * as S from './PillCalendar.styled';
import { Actionable, Button, DropdownMenu, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { format } from 'date-fns';
import { usePillCalendarController } from './PillCalendarController';

interface IPillCalendarProps {
	name: string;
	value?: string | null;
	title: string;
	icon?: string;
	minDate?: Date;
	maxDate?: Date;
	onChange: (fieldName: string, fieldValue: string | null) => void;
	setDateLimit?: Dispatch<SetStateAction<Date | undefined>>;
	inTask?: boolean;
}

export const PillCalendar: FC<IPillCalendarProps> = ({
	name,
	value,
	title,
	icon,
	minDate,
	maxDate,
	setDateLimit,
	onChange,
	inTask,
}) => {
	const {
		pillRef,
		isPillActive,
		isDropdownActive,
		date,
		dropDownMaxHeight,
		handlePillButtonClick,
		handleModalClose,
		handleDateChange,
	} = usePillCalendarController(name, onChange, setDateLimit, value);

	return (
		<DropdownMenu
			position='bottom-start'
			forcePosition
			width='284px'
			active={isDropdownActive}
			onClose={handleModalClose}
		>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<div ref={pillRef}>
						{inTask ? (
							<Actionable {...attributes} onClick={handlePillButtonClick}>
								<S.MyInput
									inputAttributes={{ autoComplete: 'off' }}
									value={date ? format(date, 'dd.MM') : title}
									active={isPillActive}
									name='typeWork'
									startIcon={<SvgComponent name='calendar-todo-line' />}
								/>
							</Actionable>
						) : (
							<S.PillButton
								{...attributes}
								variant='outline'
								size='small'
								startIcon={icon ? <SvgComponent name={icon} /> : <></>}
								active={isPillActive}
								onClick={handlePillButtonClick}
							>
								<Text
									variant='caption-1'
									attributes={{
										style: { fontWeight: '500', letterSpacing: '-0.01em', marginLeft: `${icon ? '0' : '-4px'}` },
									}}
								>
									{inTask ? (date ? format(date, 'dd.MM') : title) : date ? format(date, 'dd.MM.yyyy') : title}
								</Text>
							</S.PillButton>
						)}
					</div>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<S.PillDropdownMenuContentWrap maxHeight={dropDownMaxHeight}>
					<S.PillDatePickerWrapper>
						<DatePicker
							wrapperClassName='datePicker'
							locale={ru}
							selected={date}
							onChange={() => {}}
							onSelect={handleDateChange}
							inline
							minDate={minDate}
							maxDate={maxDate}
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
					</S.PillDatePickerWrapper>
				</S.PillDropdownMenuContentWrap>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
