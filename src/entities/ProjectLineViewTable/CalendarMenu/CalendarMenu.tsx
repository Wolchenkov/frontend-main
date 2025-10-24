/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FC } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import ru from 'date-fns/locale/ru';
import * as S from './CalendarMenu.styled';
import { Button, DropdownMenu, Icon, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { useCalendarMenuController } from './CalendarMenuController';
import { UserRole } from '../../../shared/utility/Constants/userRole';

interface ICalendarMenuProps {
	issueId: number;
	date?: string | null;
	minDate?: string;
	isFinished?: string | null | boolean;
	refetchTaskData?: any;
	isTaskDetail?: boolean;
	projectSlugData?: string;
	userRole?: string | undefined;
}

export const CalendarMenu: FC<ICalendarMenuProps> = ({
	issueId,
	date,
	minDate,
	isFinished,
	refetchTaskData,
	isTaskDetail,
	projectSlugData,
	userRole,
}) => {
	const {
		isDropdownActive,
		startDate,
		endDate,
		handleButtonClick,
		isDateExpired,
		handleDateChange,
		handleDocumentClick,
	} = useCalendarMenuController(issueId, date, minDate, refetchTaskData, projectSlugData);

	return (
		<>
			{isFinished || (userRole && userRole === UserRole.CLIENT) ? (
				<>
					{endDate ? (
						<Text
							variant='caption-1'
							color={isFinished ? 'disabled' : isDateExpired() ? 'critical' : 'neutral'}
							attributes={{ style: { lineHeight: '20px', fontWeight: 500, letterSpacing: '-0.01em' } }}
						>
							{format(new Date(endDate), isTaskDetail ? 'dd.MM.yy' : 'dd.MM.yyyy')}
						</Text>
					) : (
						<Icon size={4} svg={<SvgComponent name={isFinished ? 'calendar-line-disabled' : 'calendar-line'} />} />
					)}
				</>
			) : (
				<DropdownMenu position='bottom' width='284px' active={isDropdownActive} onClose={handleDocumentClick}>
					<DropdownMenu.Trigger>
						{(attributes) => (
							<S.CalendarMenuButton
								{...attributes}
								variant='ghost'
								size='small'
								startIcon={
									endDate ? (
										<></>
									) : isDropdownActive ? (
										<SvgComponent name='calendar-line-active' />
									) : (
										<SvgComponent name='calendar-line' />
									)
								}
								onClick={handleButtonClick}
							>
								<Text
									variant='caption-1'
									color={isDateExpired() ? 'critical' : isDropdownActive ? 'primary' : 'neutral'}
									attributes={{
										style: { fontWeight: '500', letterSpacing: '-0.01em' },
									}}
								>
									{endDate ? format(new Date(endDate), isTaskDetail ? 'dd.MM.yy' : 'dd.MM.yyyy') : ''}
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
									selectsRange
									renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
										<div>
											<Button
												variant='ghost'
												startIcon={<SvgComponent name='arrow-left-s' />}
												size='small'
												aria-label='Previous month'
												className={'react-datepicker__navigation react-datepicker__navigation--previous'}
												onClick={(event) => {
													event.stopPropagation();
													decreaseMonth();
												}}
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
												onClick={(event) => {
													event.stopPropagation();
													increaseMonth();
												}}
											/>
										</div>
									)}
								/>
							</S.CalendarMenuDatePickerWrapper>
						</S.CalendarMenuContentWrap>
					</DropdownMenu.Content>
				</DropdownMenu>
			)}
		</>
	);
};
