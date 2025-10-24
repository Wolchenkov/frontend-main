import { Dispatch, SetStateAction } from 'react';
import { formatDate, getDateInterval } from '../../../shared/utility/Utils';

interface IIntervalSwitcherProps {
	reportsInterval: IHistoryInterval | null;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	setReportsInterval: Dispatch<SetStateAction<IHistoryInterval | null>>;
}

const INTERVAL_TYPES = {
	ALL_TIME: 'За весь период',
	DAY: 'День',
	WEEK: 'Неделя',
	MONTH: 'Месяц',
	YEAR: 'Год',
	QUARTER: 'Квартал',
	CUSTOM: 'Свой период',
};

export const useIntervalSwitcherController = ({
	reportsInterval,
	value,
	setValue,
	setReportsInterval,
}: IIntervalSwitcherProps) => {
	function triggerValue(value: string) {
		if (value === INTERVAL_TYPES.ALL_TIME) {
			return value;
		} else if (value === INTERVAL_TYPES.CUSTOM) {
			if (reportsInterval?.from && reportsInterval?.to) {
				return `Свой период: ${new Date(reportsInterval.from).toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric', year: 'numeric' })} - ${new Date(reportsInterval.to).toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric', year: 'numeric' })}`;
			}
			return 'Свой период';
		} else if (value === INTERVAL_TYPES.DAY) {
			const today = new Date();
			const reportsIntervalDate = new Date(reportsInterval?.from as string);
			// обнулить время для корректного сравнения
			today.setHours(0, 0, 0, 0);
			reportsIntervalDate.setHours(0, 0, 0, 0);
			return reportsIntervalDate.getTime() !== today.getTime()
				? new Date(reportsInterval?.from as string).toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric' })
				: 'Сегодня';
		} else if (value === INTERVAL_TYPES.WEEK) {
			if (reportsInterval?.from && reportsInterval?.to) {
				return (
					value +
					': ' +
					new Date(reportsInterval?.from).toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric' }) +
					' - ' +
					new Date(reportsInterval?.to).toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric' })
				);
			}
			return value;
		} else if (value === INTERVAL_TYPES.MONTH) {
			if (reportsInterval?.from && reportsInterval?.to)
				return (
					value +
					': ' +
					new Date(reportsInterval?.from)
						.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
						.replace(' г.', '')
				);
			return value;
		} else if (value === INTERVAL_TYPES.YEAR) {
			if (reportsInterval?.from && reportsInterval?.to)
				return value + ': ' + new Date(reportsInterval?.from).toLocaleDateString('ru-RU', { year: 'numeric' });
			return value;
		} else if (value === INTERVAL_TYPES.QUARTER) {
			if (reportsInterval?.from && reportsInterval?.to) {
				return (
					value +
					': ' +
					new Date(reportsInterval?.from).toLocaleDateString('ru-RU', {
						day: 'numeric',
						month: 'numeric',
						year: 'numeric',
					}) +
					' - ' +
					new Date(reportsInterval?.to).toLocaleDateString('ru-RU', {
						day: 'numeric',
						month: 'numeric',
						year: 'numeric',
					})
				);
			}
			return value;
		}
		return value; // Fallback
	}

	function isButtonLeftDisabled() {
		// const projectStartTime = new Date(projectStart as string);
		const projectStartTime = new Date('2021-09-12T04:52:51.000000Z' as string); // исправить
		const historyIntervalStartTime = new Date(reportsInterval?.from as string);
		projectStartTime.setHours(0, 0, 0, 0);
		historyIntervalStartTime.setHours(0, 0, 0, 0);
		if (value === INTERVAL_TYPES.ALL_TIME || value === INTERVAL_TYPES.CUSTOM) {
			return true;
		} else {
			return projectStartTime.getTime() >= historyIntervalStartTime.getTime();
		}
	}

	function isButtonRightDisabled() {
		const today = new Date();
		const historyIntervalEndTime = new Date(reportsInterval?.to as string);
		today.setHours(0, 0, 0, 0);
		historyIntervalEndTime.setHours(0, 0, 0, 0);
		if (value === INTERVAL_TYPES.ALL_TIME || value === INTERVAL_TYPES.CUSTOM) {
			return true;
		} else {
			return historyIntervalEndTime.getTime() >= today.getTime();
		}
	}

	function changePeriod(direction: string) {
		let reportsIntervalStart = new Date(reportsInterval?.from as string);
		let reportsIntervalEnd = new Date(reportsInterval?.to as string);
		let offset;
		switch (value) {
			case INTERVAL_TYPES.DAY:
				offset = direction === 'next' ? 24 * 60 * 60 * 1000 : -24 * 60 * 60 * 1000;
				reportsIntervalStart = new Date(reportsIntervalStart.getTime() + offset);
				reportsIntervalEnd = new Date(reportsIntervalEnd.getTime() + offset);
				break;
			case INTERVAL_TYPES.WEEK:
				offset = direction === 'next' ? 7 * 24 * 60 * 60 * 1000 : -7 * 24 * 60 * 60 * 1000;
				reportsIntervalStart = new Date(reportsIntervalStart.getTime() + offset);
				reportsIntervalEnd = new Date(reportsIntervalEnd.getTime() + offset);
				break;
			case INTERVAL_TYPES.MONTH:
				offset = direction === 'next' ? 1 : -1;
				reportsIntervalStart.setDate(1);
				reportsIntervalStart.setMonth(reportsIntervalStart.getMonth() + offset);
				reportsIntervalEnd = new Date(reportsIntervalStart.getFullYear(), reportsIntervalStart.getMonth() + 1, 0);
				break;
			case INTERVAL_TYPES.YEAR:
				offset = direction === 'next' ? 1 : -1;
				reportsIntervalStart = new Date(reportsIntervalStart.setFullYear(reportsIntervalStart.getFullYear() + offset));
				reportsIntervalEnd = new Date(reportsIntervalEnd.setFullYear(reportsIntervalEnd.getFullYear() + offset));
				break;
			case INTERVAL_TYPES.QUARTER:
				offset = direction === 'next' ? 3 : -3;
				reportsIntervalStart.setMonth(reportsIntervalStart.getMonth() + offset);
				reportsIntervalStart.setDate(1);
				reportsIntervalEnd = new Date(reportsIntervalStart.getFullYear(), reportsIntervalStart.getMonth() + 3, 0);
				break;
			case INTERVAL_TYPES.CUSTOM:
				// Для кастомного периода не меняем период, так как он задается пользователем
				return;
		}

		setReportsInterval({ from: formatDate(reportsIntervalStart), to: formatDate(reportsIntervalEnd) });
	}

	function setIntervalForReports(period: string) {
		setValue(period);
		if (period === INTERVAL_TYPES.ALL_TIME) {
			setReportsInterval(null);
		} else if (period === INTERVAL_TYPES.CUSTOM) {
			// Для кастомного периода не устанавливаем интервал, он будет установлен через модал
			// setReportsInterval остается как есть
		} else if (period === INTERVAL_TYPES.DAY) {
			setReportsInterval({ from: formatDate(new Date()), to: formatDate(new Date()) });
		} else {
			const [from, to] = getDateInterval(period);
			setReportsInterval({ from, to });
		}
	}

	return { setIntervalForReports, changePeriod, isButtonRightDisabled, isButtonLeftDisabled, triggerValue };
};
