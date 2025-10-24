/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useGetClientsQuery, useLazyGetMoreClientsQuery } from '../../../store/reports/reportsApi';

interface IClients {
	reportsInterval: IHistoryInterval | null;
	setIsExportDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useClientsController = ({ reportsInterval, setIsExportDisabled }: IClients) => {
	const { data: reports, isFetching } = useGetClientsQuery(reportsInterval ? { reportsInterval } : '');
	const [reportsData, setReportsData] = useState<IClientReport>();
	const [activeClients, setActiveClients] = useState<number[]>([]);

	function checkActiveClients(id: number) {
		setActiveClients((prev) => (prev.includes(id) ? prev.filter((clientId) => clientId !== id) : prev.concat(id)));
	}

	useEffect(() => {
		if (reports) {
			setReportsData(reports);
			const interval = setInterval(() => setIsExportDisabled(false), 200);
			return () => clearInterval(interval);
		}
	}, [reports]);

	const clientContainerRef = useRef<HTMLDivElement>(null);
	const [getMoreClients, { data: moreProjectsData }] = useLazyGetMoreClientsQuery();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (moreProjectsData && reportsData) {
			setReportsData((prev) => ({
				data: [...(prev?.data ?? []), ...moreProjectsData.data],
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
			if (
				container.scrollHeight - container.scrollTop < container.clientHeight + 13 &&
				reportsData?.meta.next_page_url
			) {
				setIsLoading(true);
				getMoreClients(reportsData?.meta.next_page_url).then(() => setIsLoading(false));
			}
		};

		const container = clientContainerRef.current;
		if (container) {
			container.addEventListener('scroll', handleScroll);
			return () => container.removeEventListener('scroll', handleScroll);
		}
	}, [getMoreClients, reportsData?.meta.next_page_url]);

	return { isFetching, reportsData, clientContainerRef, checkActiveClients, activeClients, isLoading };
};
