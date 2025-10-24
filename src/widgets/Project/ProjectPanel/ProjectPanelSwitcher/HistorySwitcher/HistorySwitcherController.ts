import { useEffect, useState } from 'react';
import { formatDate, getDateInterval } from '../../../../../shared/utility/Utils';

interface IHistorySwitcherProps {
	setHistoryInterval: React.Dispatch<React.SetStateAction<IHistoryInterval | null>>;
	historyInterval: IHistoryInterval | null;
	projectStart: string | undefined;
}

export function useHistorySwitcherController({
	setHistoryInterval,
	historyInterval,
	projectStart,
}: IHistorySwitcherProps) {
	const [value, setValue] = useState('За весь период');

	useEffect(() => {
		setIntervalForHistory(value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	function triggerValue(value: string) {
		if (value === 'За весь период') {
			return value;
		} else if (value === 'День') {
			const today = new Date();
			const historyIntervalDate = new Date(historyInterval?.from as string);
			// обнулить время для корректного сравнения
			today.setHours(0, 0, 0, 0);
			historyIntervalDate.setHours(0, 0, 0, 0);
			return historyIntervalDate.getTime() !== today.getTime()
				? new Date(historyInterval?.from as string).toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric' })
				: 'Сегодня';
		} else if (value === 'Неделя') {
			if (historyInterval?.from && historyInterval?.to) {
				return (
					value +
					': ' +
					new Date(historyInterval?.from).toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric' }) +
					' - ' +
					new Date(historyInterval?.to).toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric' })
				);
			}
		} else if (value === 'Месяц') {
			if (historyInterval?.from && historyInterval?.to)
				return (
					value +
					': ' +
					new Date(historyInterval?.from)
						.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
						.replace(' г.', '')
				);
		} else if (value === 'Год') {
			if (historyInterval?.from && historyInterval?.to)
				return value + ': ' + new Date(historyInterval?.from).toLocaleDateString('ru-RU', { year: 'numeric' });
		}
	}

	function setIntervalForHistory(period: string) {
		setValue(period);
		if (period === 'За весь период') {
			setHistoryInterval(null);
		}
		if (period === 'День') {
			setHistoryInterval({ from: formatDate(new Date()), to: formatDate(new Date()) });
		}
		if (period === 'Неделя' || period === 'Месяц' || period === 'Год') {
			const [from, to] = getDateInterval(period);
			setHistoryInterval({ from, to });
		}
	}

	function isButtonLeftDisabled() {
		const projectStartTime = new Date(projectStart as string);
		const historyIntervalStartTime = new Date(historyInterval?.from as string);
		projectStartTime.setHours(0, 0, 0, 0);
		historyIntervalStartTime.setHours(0, 0, 0, 0);
		if (value === 'За весь период') {
			return true;
		} else {
			return projectStartTime.getTime() >= historyIntervalStartTime.getTime();
		}
	}

	function isButtonRightDisabled() {
		const today = new Date();
		const historyIntervalEndTime = new Date(historyInterval?.to as string);
		today.setHours(0, 0, 0, 0);
		historyIntervalEndTime.setHours(0, 0, 0, 0);
		if (value === 'За весь период') {
			return true;
		} else {
			return historyIntervalEndTime.getTime() >= today.getTime();
		}
	}

	function changePeriod(direction: string) {
		let historyIntervalStart = new Date(historyInterval?.from as string);
		let historyIntervalEnd = new Date(historyInterval?.to as string);
		let offset;
		switch (value) {
			case 'День':
				offset = direction === 'next' ? 24 * 60 * 60 * 1000 : -24 * 60 * 60 * 1000;
				historyIntervalStart = new Date(historyIntervalStart.getTime() + offset);
				historyIntervalEnd = new Date(historyIntervalEnd.getTime() + offset);
				break;
			case 'Неделя':
				offset = direction === 'next' ? 7 * 24 * 60 * 60 * 1000 : -7 * 24 * 60 * 60 * 1000;
				historyIntervalStart = new Date(historyIntervalStart.getTime() + offset);
				historyIntervalEnd = new Date(historyIntervalEnd.getTime() + offset);
				break;
			case 'Месяц':
				offset = direction === 'next' ? 1 : -1;
				historyIntervalStart.setDate(1);
				historyIntervalStart.setMonth(historyIntervalStart.getMonth() + offset);
				historyIntervalEnd = new Date(historyIntervalStart.getFullYear(), historyIntervalStart.getMonth() + 1, 0);
				break;
			case 'Год':
				offset = direction === 'next' ? 1 : -1;
				historyIntervalStart = new Date(historyIntervalStart.setFullYear(historyIntervalStart.getFullYear() + offset));
				historyIntervalEnd = new Date(historyIntervalEnd.setFullYear(historyIntervalEnd.getFullYear() + offset));
				break;
		}

		setHistoryInterval({ from: formatDate(historyIntervalStart), to: formatDate(historyIntervalEnd) });
	}

	return { triggerValue, value, setIntervalForHistory, isButtonLeftDisabled, changePeriod, isButtonRightDisabled };
}
