import { useEffect, useRef, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useGetScheduleQuery, useLazyGetMoreScheduleQuery } from '../../../store/reports/reportsApi';
import { eachDayOfInterval, format } from 'date-fns';

interface ITimeTableProps {
	reportsInterval: IHistoryInterval | null;
	activeFilter: fetchingDictionary | null;
	setIsExportDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTimeTableController = ({ reportsInterval, activeFilter, setIsExportDisabled }: ITimeTableProps) => {
	const [dates, setDates] = useState<number[]>();
	const { data: reports, isFetching } = useGetScheduleQuery(
		reportsInterval || activeFilter ? { reportsInterval, id: activeFilter?.id } : skipToken
	);

	const [reportsData, setReportsData] = useState<ISchedule>();
	const [activeUsers, setActiveUsers] = useState<number[]>([]);

	useEffect(() => {
		setActiveUsers([]);
	}, [isFetching]);

	useEffect(() => {
		if (reports && reportsInterval) {
			const startDate = new Date(reportsInterval.from);
			const endDate = new Date(reportsInterval.to);
			const datesArray = eachDayOfInterval({ start: startDate, end: endDate });
			const dates = datesArray.map((date) => Number(format(date, 'd')));
			setDates(dates);
			setReportsData(reports);
			if (reports?.data.length !== 0) {
				const interval = setInterval(() => setIsExportDisabled(false), 200);
				return () => clearInterval(interval);
			} else {
				setIsExportDisabled(true);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reports]);

	const timeTableContainerRef = useRef<HTMLDivElement>(null);
	const [getMoreTimeTable, { data: moreProjectsData }] = useLazyGetMoreScheduleQuery();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (moreProjectsData && reportsData) {
			setReportsData((prev) => ({
				data: [...(prev?.data ?? []), ...moreProjectsData.data],
				links: {
					...moreProjectsData.links,
				},
				meta: {
					...moreProjectsData.meta,
				},
			}));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [moreProjectsData]);

	useEffect(() => {
		const handleScroll = (e: any) => {
			const container = e.target;
			if (container.scrollHeight - container.scrollTop < container.clientHeight + 7 && reportsData?.links.next) {
				setIsLoading(true);
				getMoreTimeTable(reportsData?.links.next).then(() => setIsLoading(false));
			}
		};

		const container = timeTableContainerRef.current;
		if (container) {
			container.addEventListener('scroll', handleScroll);
			return () => container.removeEventListener('scroll', handleScroll);
		}
	}, [getMoreTimeTable, reportsData?.links.next]);

	return { isFetching, reportsData, dates, timeTableContainerRef, activeUsers, setActiveUsers, isLoading };
};
