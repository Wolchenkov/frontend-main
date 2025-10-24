import { useEffect, useState } from 'react';
import { useGetMembersQuery } from '../../../store/reports/reportsApi';

interface IMembersProps {
	reportsInterval: IHistoryInterval | null;
	activeFilter: fetchingDictionary | null;
	setIsExportDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useMembersController = ({ reportsInterval, activeFilter, setIsExportDisabled }: IMembersProps) => {
	const { data: reports, isFetching } = useGetMembersQuery(
		reportsInterval || activeFilter ? { reportsInterval, id: activeFilter?.id } : ''
	);

	const [reportsData, setReportsData] = useState<IMemberReport>();
	const [activeUsers, setActiveUsers] = useState<number[]>([]);

	useEffect(() => {
		if (reports) {
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

	useEffect(() => {
		setActiveUsers([]);
	}, [isFetching]);

	function checkActiveUsers(id: number) {
		setActiveUsers((prev) => (prev.includes(id) ? prev.filter((userID) => userID !== id) : prev.concat(id)));
	}
	return { isFetching, reportsData, checkActiveUsers, activeUsers };
};
