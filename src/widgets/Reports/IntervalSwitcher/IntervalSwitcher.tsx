import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import React from 'react';
import { Button, DropdownMenu, Text, Divider, View } from 'reshaped/bundle';
import { ArrowButton } from '../ArrowButton/ArrowButton';
import { useIntervalSwitcherController } from './IntervalSwitcherController';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import * as S from './IntervalSwitcher.styled';
import { SvgComponent } from '../../../shared';

interface IIntervalSwitcherProps {
	intervalValues: string[];
	reportsInterval: IHistoryInterval | null;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	setReportsInterval: Dispatch<SetStateAction<IHistoryInterval | null>>;
}

export const IntervalSwitcher: FC<IIntervalSwitcherProps> = ({
	intervalValues,
	reportsInterval,
	value,
	setValue,
	setReportsInterval,
}) => {
	const { setIntervalForReports, changePeriod, triggerValue } = useIntervalSwitcherController({
		reportsInterval,
		value,
		setValue,
		setReportsInterval,
	});

	const [showCalendar, setShowCalendar] = useState(false);
	const [customRange, setCustomRange] = useState<[Date | null, Date | null]>([null, null]);
	const [activeInput, setActiveInput] = useState<'start' | 'end' | null>(null);
	const [startInputValue, setStartInputValue] = useState('');
	const [endInputValue, setEndInputValue] = useState('');
	const [calendarKey, setCalendarKey] = useState(0); // Для принудительного обновления календаря

	useEffect(() => {
		if (value === 'Свой период' && reportsInterval?.from && reportsInterval?.to) {
			const from = new Date(reportsInterval.from);
			const to = new Date(reportsInterval.to);
			if (
				!customRange[0] ||
				!customRange[1] ||
				customRange[0].getTime() !== from.getTime() ||
				customRange[1].getTime() !== to.getTime()
			) {
				setCustomRange([from, to]);
				setStartInputValue(from.toLocaleDateString('ru-RU'));
				setEndInputValue(to.toLocaleDateString('ru-RU'));
				setActiveInput(null);
			}
		} else if (value === 'Свой период' && (!reportsInterval?.from || !reportsInterval?.to)) {
			setCustomRange([null, null]);
			setStartInputValue('');
			setEndInputValue('');
			setActiveInput('start');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, reportsInterval]);

	const handleCustomPeriod = () => {
		setValue('Свой период');
		setShowCalendar(true);
		setActiveInput('start');
		if (!reportsInterval?.from || !reportsInterval?.to) {
			setCustomRange([null, null]);
			setStartInputValue('');
			setEndInputValue('');
		}
	};

	const handleDateChange = (dates: [Date | null, Date | null]) => {
		setCustomRange(dates);

		if (dates[0]) {
			setStartInputValue(dates[0].toLocaleDateString('ru-RU'));
		} else {
			setStartInputValue('');
		}
		if (dates[1]) {
			setEndInputValue(dates[1].toLocaleDateString('ru-RU'));
		} else {
			setEndInputValue('');
		}

		if (!dates[0] && !dates[1]) {
			setActiveInput('start');
		} else if (dates[0] && !dates[1]) {
			setActiveInput('end');
		} else if (dates[0] && dates[1]) {
			setActiveInput(null);
		}
	};

	const formatDateInput = (value: string): string => {
		// Убираем все кроме цифр
		const numbers = value.replace(/\D/g, '');

		// Форматируем как ДД.ММ.ГГГГ
		if (numbers.length <= 2) {
			return numbers;
		} else if (numbers.length <= 4) {
			return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
		} else if (numbers.length <= 8) {
			return `${numbers.slice(0, 2)}.${numbers.slice(2, 4)}.${numbers.slice(4)}`;
		} else {
			return `${numbers.slice(0, 2)}.${numbers.slice(2, 4)}.${numbers.slice(4, 8)}`;
		}
	};

	const parseDate = (dateString: string): Date | null => {
		const parts = dateString.split('.');
		if (parts.length === 3) {
			const day = parseInt(parts[0]);
			const month = parseInt(parts[1]) - 1;
			const year = parseInt(parts[2]);

			if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
				const date = new Date(year, month, day);
				if (date.getDate() === day && date.getMonth() === month && date.getFullYear() === year) {
					return date;
				}
			}
		}
		return null;
	};

	const handleStartInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formattedValue = formatDateInput(e.target.value);
		setStartInputValue(formattedValue);

		const date = parseDate(formattedValue);
		if (date) {
			setCustomRange([date, customRange[1]]);
			setCalendarKey((prev) => prev + 1); // Принудительно обновляем календарь
			setActiveInput('end');
		} else {
			setCustomRange([null, customRange[1]]);
			setCalendarKey((prev) => prev + 1);
		}
	};

	const handleEndInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formattedValue = formatDateInput(e.target.value);
		setEndInputValue(formattedValue);

		const date = parseDate(formattedValue);
		if (date) {
			setCustomRange([customRange[0], date]);
			setCalendarKey((prev) => prev + 1); // Принудительно обновляем календарь
			setActiveInput(null);
		} else {
			setCustomRange([customRange[0], null]);
			setCalendarKey((prev) => prev + 1);
		}
	};

	const handleStartInputFocus = () => setActiveInput('start');
	const handleEndInputFocus = () => setActiveInput('end');

	const handleDateReset = () => {
		setCustomRange([null, null]);
		setStartInputValue('');
		setEndInputValue('');
		setReportsInterval({ from: '', to: '' });
		setShowCalendar(false);
		setActiveInput('start');
		setValue(intervalValues[0] || 'За весь период');
	};

	const handleDateSave = () => {
		if (customRange[0]) {
			setReportsInterval({
				from: customRange[0].toISOString().slice(0, 10),
				to: customRange[1] ? customRange[1].toISOString().slice(0, 10) : customRange[0].toISOString().slice(0, 10),
			});
		}
		setShowCalendar(false);
		setActiveInput(null);
	};

	const handleCalendarClose = () => {
		setShowCalendar(false);
		setActiveInput(null);
		if (!customRange[0]) {
			setCustomRange([null, null]);
			setStartInputValue('');
			setEndInputValue('');
			setReportsInterval({ from: '', to: '' });
			setValue(intervalValues[0] || 'За весь период');
		}
	};

	// Если выбран "Свой период" — показываем выпадающий календарь
	if (value === 'Свой период') {
		return (
			<DropdownMenu active={showCalendar} onClose={handleCalendarClose} position='bottom-end' width='284px'>
				<DropdownMenu.Trigger>
					{(attributes) => (
						<Button {...attributes} variant='outline' onClick={() => setShowCalendar((prev) => !prev)}>
							<S.TextTrigger variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
								<SvgComponent name='calendar-fill' />
								{triggerValue(value)}
								<SvgComponent name='arrow-down' />
							</S.TextTrigger>
						</Button>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<S.FilterCalendarDropdownMenuContentWrap>
						<S.CustomPeriodInputs>
							<S.CustomPeriodInputGroup>
								<Text variant='body-2' color='neutral'>
									Начало
								</Text>
								<S.CustomPeriodInput
									placeholder='ДД.ММ.ГГГГ'
									value={startInputValue}
									onChange={handleStartInputChange}
									onFocus={handleStartInputFocus}
									isActive={activeInput === 'start'}
								/>
							</S.CustomPeriodInputGroup>
							<S.CustomPeriodInputGroup>
								<Text variant='body-2' color='neutral'>
									Конец
								</Text>
								<S.CustomPeriodInput
									placeholder='ДД.ММ.ГГГГ'
									value={endInputValue}
									onChange={handleEndInputChange}
									onFocus={handleEndInputFocus}
									isActive={activeInput === 'end'}
								/>
							</S.CustomPeriodInputGroup>
						</S.CustomPeriodInputs>
						<S.FilterCalendarDatePickerWrapper>
							<DatePicker
								key={calendarKey}
								wrapperClassName='datePicker'
								locale={ru}
								onChange={handleDateChange}
								inline
								startDate={customRange[0]}
								endDate={customRange[1]}
								monthsShown={1}
								selectsRange
							/>
							<Divider />
							<View direction='row' justify='end' gap={1} attributes={{ style: { padding: '20px 0 0' } }}>
								<Button color='white' size='small' onClick={handleDateReset}>
									<Text variant='body-2' attributes={{ style: { fontWeight: 500, letterSpacing: '-0.02em' } }}>
										Отмена
									</Text>
								</Button>
								<Button color='white' size='small' onClick={handleDateSave} disabled={!customRange[0]}>
									<Text
										color={!customRange[0] ? 'neutral' : 'primary'}
										variant='body-2'
										attributes={{ style: { fontWeight: 500, letterSpacing: '-0.02em' } }}
									>
										Сохранить
									</Text>
								</Button>
							</View>
						</S.FilterCalendarDatePickerWrapper>
					</S.FilterCalendarDropdownMenuContentWrap>
				</DropdownMenu.Content>
			</DropdownMenu>
		);
	}

	// Обычный режим — показываем DropdownMenu со списком
	return (
		<>
			{intervalValues.length > 1 ? (
				<DropdownMenu width='197px' position='bottom-start'>
					<DropdownMenu.Trigger>
						{(attributes) => (
							<div>
								{value !== 'За весь период' && (
									<S.ButtonPrev
										variant='outline'
										startIcon={<ArrowButton disabled={false} direction='left' onClick={() => changePeriod('prev')} />}
									></S.ButtonPrev>
								)}
								<S.ButtonPeriod variant='outline' {...attributes} withRadius={value === 'За весь период'}>
									<S.TextTrigger variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
										<SvgComponent name='calendar-fill' />
										{triggerValue(value)}
										<SvgComponent name='arrow-down' />
									</S.TextTrigger>
								</S.ButtonPeriod>
								{value !== 'За весь период' && (
									<S.ButtonNext
										variant='outline'
										endIcon={<ArrowButton disabled={false} direction='right' onClick={() => changePeriod('next')} />}
									></S.ButtonNext>
								)}
							</div>
						)}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						{intervalValues.map((period, index) => (
							<DropdownMenu.Item key={index} onClick={() => setIntervalForReports(period)}>
								<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
									{period}
								</Text>
							</DropdownMenu.Item>
						))}
						<DropdownMenu.Item onClick={handleCustomPeriod}>
							<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
								Свой период
							</Text>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu>
			) : (
				<Button
					startIcon={
						value !== 'За весь период' ? (
							<ArrowButton disabled={false} direction='left' onClick={() => changePeriod('prev')} />
						) : undefined
					}
					endIcon={
						value !== 'За весь период' ? (
							<ArrowButton disabled={false} direction='right' onClick={() => changePeriod('next')} />
						) : undefined
					}
				>
					<S.TextTrigger variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
						<SvgComponent name='calendar-fill' />
						{triggerValue(value)}
						<SvgComponent name='arrow-down' />
					</S.TextTrigger>
				</Button>
			)}
		</>
	);
};
