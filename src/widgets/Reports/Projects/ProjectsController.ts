/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useGetProjectsQuery, useLazyGetMoreProjectQuery } from '../../../store/reports/reportsApi';

interface IProjectsProps {
	reportsInterval: IHistoryInterval | null;
	activeFilter: fetchingDictionary | null;
	setIsExportDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useProjectsController = ({ reportsInterval, activeFilter, setIsExportDisabled }: IProjectsProps) => {
	const { data: reports, isFetching } = useGetProjectsQuery(
		reportsInterval || activeFilter ? { reportsInterval, id: activeFilter?.id } : ''
	);
	const [reportsData, setReportsData] = useState<IProjectReport>();

	useEffect(() => {
		if (reports) {
			setReportsData(reports);
			const interval = setInterval(() => setIsExportDisabled(false), 200);
			return () => clearInterval(interval);
		}
	}, [reports]);

	const projectsContainerRef = useRef<HTMLDivElement>(null);
	const [getMoreProjects, { data: moreProjectsData }] = useLazyGetMoreProjectQuery();
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
				container.scrollHeight - container.scrollTop < container.clientHeight + 7 &&
				reportsData?.meta.next_page_url
			) {
				setIsLoading(true);
				getMoreProjects(reportsData?.meta.next_page_url).then(() => setIsLoading(false));
			}
		};

		const container = projectsContainerRef.current;
		if (container) {
			container.addEventListener('scroll', handleScroll);
			return () => container.removeEventListener('scroll', handleScroll);
		}
	}, [getMoreProjects, reportsData?.meta.next_page_url]);
	return { isFetching, reportsData, projectsContainerRef, isLoading };
};
