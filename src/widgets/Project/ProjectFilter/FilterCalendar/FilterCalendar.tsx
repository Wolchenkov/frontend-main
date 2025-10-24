/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import ru from 'date-fns/locale/ru';
import { format } from 'date-fns';
import * as S from './FilterCalendar.styled';
import { SvgComponent } from '../../../../shared';
import { Button, Divider, DropdownMenu, Text, View, useToggle } from 'reshaped/bundle';

interface IFilterCalendarProps {
	value: null;
	onChange: ({ date_start }: { date_start: [string | null, string | null] | null }) => void;
	isTaskDetail?: boolean;
	date: [string | null, string | null] | null;
	isCreateTask?: boolean;
	isClientRole?: boolean;
}

export const FilterCalendar: FC<IFilterCalendarProps> = ({
	value,
	onChange,
	isTaskDetail,
	date,
	isCreateTask,
	isClientRole,
}) => {
	const { active: isMenuActive, activate: activateMenu, deactivate: deactivateMenu } = useToggle(false);

	const [startDate, setStartDate] = useState<Date | null>(date ? (date[0] ? new Date(date[0]) : null) : null);
	const [endDate, setEndDate] = useState<Date | null>(date ? (date[1] ? new Date(date[1]) : null) : null);
	const [activeFilter, setActiveFilter] = useState<[string | null, string | null] | null>(date);

	useEffect(() => {
		if (date) {
			setActiveFilter(date);
			setStartDate(date[0] ? new Date(date[0]) : null);
			setEndDate(date[1] ? new Date(date[1]) : null);
		}
	}, [date]);

	useEffect(() => {
		if (value === null && !isTaskDetail) {
			setActiveFilter(value);
			setStartDate(value);
			setEndDate(value);
		}
	}, [value]);

	useEffect(() => {
		if (
			!isTaskDetail ||
			(isTaskDetail &&
				((activeFilter?.[0] ? activeFilter[0]?.split('T')[0] : null) !== (date && date[0]) ||
					(activeFilter?.[1] ? activeFilter[1]?.split('T')[0] : null) !== (date && date[1])))
		) {
			onChange({ date_start: activeFilter !== null ? activeFilter : null });
		}
	}, [activeFilter]);

	const handleDateChange = (dates: [Date | null, Date | null]) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
	};

	const handleDateReset = () => {
		setStartDate(null);
		setEndDate(null);
		setActiveFilter(null);
		!isTaskDetail && deactivateMenu();
	};

	const handleDateSave = () => {
		if (startDate === null && endDate === null) {
			setActiveFilter(null);
		} else {
			setActiveFilter([startDate ? startDate.toISOString() : null, endDate ? endDate.toISOString() : null]);
		}
		deactivateMenu();
	};

	return (
		<DropdownMenu
			active={isMenuActive}
			onClose={deactivateMenu}
			position={isTaskDetail ? 'bottom-end' : 'bottom-start'}
			forcePosition
			width='568px'
		>
			<DropdownMenu.Trigger>
				{(attributes) =>
					isCreateTask ? (
						<S.PillButton
							{...attributes}
							variant='outline'
							size='small'
							startIcon={<SvgComponent name='calendar-check' />}
							active={isMenuActive}
							onClick={() => (isMenuActive ? deactivateMenu() : activateMenu())}
						>
							<S.MyText variant='caption-1'>
								{activeFilter === null
									? 'Дата окончания'
									: `${
											activeFilter[0] === null && activeFilter[1] === null
												? '—'
												: activeFilter[1] === null || activeFilter[0] === activeFilter[1]
												? format(new Date(activeFilter[0] as string), 'dd.MM')
												: `${format(new Date(activeFilter[0] as string), 'dd.MM')}—${format(
														new Date(activeFilter[1]),
														'dd.MM'
												  )}`
									  }`}
							</S.MyText>
						</S.PillButton>
					) : isTaskDetail ? (
						<S.TriggerButton
							{...attributes}
							variant='ghost'
							size='small'
							highlighted={isMenuActive}
							onClick={!isClientRole ? (isMenuActive ? deactivateMenu : activateMenu) : undefined}
						>
							<S.MyText variant='caption-1'>
								{activeFilter === null
									? '—'
									: `${
											activeFilter[0] === null && activeFilter[1] === null
												? '—'
												: activeFilter[1] === null || activeFilter[0] === activeFilter[1]
												? format(new Date(activeFilter[0] as string), 'dd.MM')
												: `${format(new Date(activeFilter[0] as string), 'dd.MM')}-${format(
														new Date(activeFilter[1]),
														'dd.MM'
												  )}`
									  }`}
							</S.MyText>
						</S.TriggerButton>
					) : (
						<S.FilterCalendarButton
							{...attributes}
							size='small'
							variant='ghost'
							endIcon={<SvgComponent name={isMenuActive ? 'arrow-up-fill' : 'arrow-down-fill'} />}
							onClick={isMenuActive ? deactivateMenu : activateMenu}
						>
							<S.FilterCalendarText variant='caption-1'>
								{activeFilter === null ? (
									<>
										Дата создания:&nbsp;
										<span>все</span>
									</>
								) : (
									`${format(new Date(activeFilter[0] as string), isTaskDetail ? 'dd.MM' : 'dd.MM.yy')}${
										activeFilter[1] !== null
											? `-${format(new Date(activeFilter[1]), isTaskDetail ? 'dd.MM' : 'dd.MM.yy')}`
											: ''
									}`
								)}
							</S.FilterCalendarText>
						</S.FilterCalendarButton>
					)
				}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<S.FilterCalendarDropdownMenuContentWrap>
					<S.FilterCalendarDatePickerWrapper>
						<DatePicker
							wrapperClassName='datePicker'
							locale={ru}
							onChange={handleDateChange}
							inline
							startDate={startDate}
							endDate={endDate}
							monthsShown={2}
							selectsRange
							renderCustomHeader={({ monthDate, customHeaderCount, decreaseMonth, increaseMonth }) => (
								<div>
									<Button
										variant='ghost'
										startIcon={<SvgComponent name='arrow-left-s' />}
										size='small'
										aria-label='Previous month'
										className={'react-datepicker__navigation react-datepicker__navigation--previous'}
										attributes={{ style: { display: `${customHeaderCount === 1 ? 'none' : 'block'}` } }}
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
										attributes={{ style: { display: `${customHeaderCount === 0 ? 'none' : 'block'}` } }}
										onClick={increaseMonth}
									/>
								</div>
							)}
						>
							<Divider />
							<View direction='row' justify='end' gap={1} attributes={{ style: { padding: '20px 0 0' } }}>
								<Button
									color='white'
									size='small'
									onClick={handleDateReset}
									disabled={startDate === null && endDate === null}
								>
									<Text variant='body-2' attributes={{ style: { fontWeight: 500, letterSpacing: '-0.02em' } }}>
										Сбросить
									</Text>
								</Button>
								<Button
									color='white'
									size='small'
									onClick={handleDateSave}
									disabled={startDate === null && endDate === null}
								>
									<Text
										color={startDate === null && endDate === null ? 'neutral' : 'primary'}
										variant='body-2'
										attributes={{ style: { fontWeight: 500, letterSpacing: '-0.02em' } }}
									>
										Сохранить
									</Text>
								</Button>
							</View>
						</DatePicker>
					</S.FilterCalendarDatePickerWrapper>
				</S.FilterCalendarDropdownMenuContentWrap>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
