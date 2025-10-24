import React, { FC } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import ru from 'date-fns/locale/ru';
import * as S from './PillCalendarExpenses.styled';
import { Actionable, Button, DropdownMenu, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { format } from 'date-fns';
import { usePillCalendarExpensesController } from './PillCalendarExpensesController';

interface IPillCalendarProps {
	title: string;
	icon?: string;
	onChange: (fieldValue: INewProjectState[keyof INewProjectState]) => void;
	selectedDate: number | string | undefined;
}

export const PillCalendarExpenses: FC<IPillCalendarProps> = ({ title, icon, onChange, selectedDate }) => {
	const {
		pillRef,
		isPillActive,
		isDropdownActive,
		date,
		dropDownMaxHeight,
		handlePillButtonClick,
		handleModalClose,
		handleDateChange,
	} = usePillCalendarExpensesController(onChange, selectedDate);

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
						<Actionable {...attributes} onClick={handlePillButtonClick}>
							<S.MyInput
								inputAttributes={{ autoComplete: 'off', style: { cursor: 'pointer' } }}
								value={title}
								active={isPillActive}
								name='data_start'
								startIcon={icon ? <SvgComponent name={icon} /> : <></>}
							/>
						</Actionable>
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
							onChange={handleDateChange}
							onSelect={handleDateChange}
							inline
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
