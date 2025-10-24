import { useMemo, useState } from 'react';
import { parse, eachDayOfInterval, addDays } from 'date-fns';

export const useGanttTableController = (data: IGanttItem[]) => {
	const [showPlan, setShowPlan] = useState(false);

	const start = useMemo(() => {
		const filtered = data.filter((el) => el.time_line.start_point);

		if (filtered.length > 0) {
			const a = filtered.reduce((a, b) => (a.time_line.start_point > b.time_line.start_point ? b : a)).time_line
				.start_point;
			const b = filtered.reduce((a, b) => (a.time_line.plan_start_point > b.time_line.plan_start_point ? b : a)).time_line
				.plan_start_point;
			const result = a > b ? b : a;

			return addDays(parse(result, 'yyyy-MM-dd', new Date()), -1);
		} else {
			return;
		}
	}, [data]);

	const end = useMemo(() => {
		const filtered = data.filter((el) => el.time_line.end_point);

		if (filtered.length > 0) {
			const a = filtered.reduce((a, b) => (a.time_line.end_point < b.time_line.end_point ? b : a)).time_line.end_point;
			const b = filtered.reduce((a, b) => (a.time_line.plan_end_point < b.time_line.plan_end_point ? b : a)).time_line
				.plan_end_point;
			const result = a < b ? b : a;

			return addDays(parse(result, 'yyyy-MM-dd', new Date()), 1);
		} else {
			return;
		}
	}, [data]);

	const interval = useMemo(() => {
		let dates;

		if (start && end) {
			dates = eachDayOfInterval({ start, end });
		} else {
			dates = eachDayOfInterval({ start: Date.now(), end: addDays(Date.now(), 100) });
		}

		const groupDatesByMonth = Object.entries(
			dates.reduce((accumulator, currentValue) => {
				const month = currentValue.getMonth();
				if (!accumulator[month]) {
					accumulator[month] = [];
				}
				accumulator[month].push(currentValue);
				return accumulator;
			}, {} as { [key: string]: Date[] })
		).sort((a, b) => new Date(a[1][0]).getFullYear() - new Date(b[1][0]).getFullYear());
		return groupDatesByMonth;
	}, [start, end]);

	return { interval, start, showPlan, setShowPlan };
};
