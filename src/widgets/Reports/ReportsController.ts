import { useEffect, useState } from 'react';
import { getDateInterval } from '../../shared/utility/Utils';
import { useGetOurTeamsQuery } from '../../store/teams/teamsApi';
import { format } from 'date-fns';

export const REPOTRS_TABS = [
	{
		name: 'projects',
		text: 'Проекты',
	},
	{
		name: 'members',
		text: 'Исполнители',
	},
	{
		name: 'clients',
		text: 'Клиенты',
	},
	{
		name: 'timeTable',
		text: 'Расписание',
	},
];

export const useReportsController = () => {
	const [mainTabValue, setMainTabValue] = useState(REPOTRS_TABS[0]);
	const [isFilterOpened, setIsFilterOpened] = useState(false);

	const [intervalValues, setIntervalValues] = useState(['За весь период', 'Месяц', 'Квартал', 'Год']);
	const [value, setValue] = useState<string>('За весь период');
	const [reportsInterval, setReportsInterval] = useState<IHistoryInterval | null>(null);
	const [isExportDisabled, setIsExportDisabled] = useState(true);

	useEffect(() => {
		if (mainTabValue.name === 'projects') {
			setIntervalValues(['За весь период', 'Месяц', 'Квартал', 'Год']);
			setValue('За весь период');
			setReportsInterval(null);
		}
		if (mainTabValue.name === 'members') {
			setIntervalValues(['За весь период', 'День', 'Неделя', 'Месяц', 'Квартал', 'Год']);
			setValue('За весь период');
			setReportsInterval(null);
		}
		if (mainTabValue.name === 'clients') {
			setIntervalValues(['За весь период', 'Квартал', 'Год']);
			setValue('За весь период');
			setReportsInterval(null);
		}
		if (mainTabValue.name === 'timeTable') {
			setIntervalValues(['Неделя']);
			setValue('Неделя');
			const [from, to] = getDateInterval('Неделя');
			setReportsInterval({ from, to });
		}
		setIsFilterOpened(false);
		setActiveFilter(null);
		setIsExportDisabled(true);
	}, [mainTabValue]);

	// фильтры
	const { data: teams } = useGetOurTeamsQuery();
	const [options, setOptions] = useState<fetchingDictionary[]>();
	const [shownOptions, setShownOptions] = useState<fetchingDictionary[] | undefined>(options);
	const [searchValue, setSearchValue] = useState<string | null>(null);
	const [activeFilter, setActiveFilter] = useState<fetchingDictionary | null>(null);

	useEffect(() => {
		searchValue &&
			setShownOptions(options?.filter((option) => option.value.toLowerCase().includes(searchValue.toLowerCase())));
	}, [searchValue, options]);

	useEffect(() => {
		teams && setOptions(teams);
	}, [teams]);

	function filterButtonClick() {
		if (isFilterOpened) {
			setIsFilterOpened(false);
			setActiveFilter(null);
		} else {
			setIsFilterOpened(true);
		}
	}

	//export
	const [isLoadingExport, setIsLoadingExport] = useState(false);
	const [loadingProjectExports, setLoadingProjectExports] = useState<Set<string>>(new Set());

	function exportReport(
		params?: Record<string, string | number>,
		extraData?: { project_name?: string }
	) {
		const projectId = params?.project_id?.toString();

		if (projectId) {
			setLoadingProjectExports(prev => new Set(prev).add(projectId));
		} else {
			setIsLoadingExport(true);
		}

		const reportDetails = {
			projects: { title: 'Отчет по проектам', urlPath: 'project' },
			members: { title: 'Отчет по исполнителям', urlPath: 'executor' },
			clients: { title: 'Отчет по клиентам', urlPath: 'clients' },
			timeTable: { title: 'Отчет по расписанию', urlPath: 'schedule' },
		};

		const reportType = mainTabValue.name as keyof typeof reportDetails;
		// eslint-disable-next-line prefer-const
		let { title, urlPath } = reportDetails[reportType];
		if (projectId)  {
			title = `Отчет по проекту ${extraData?.project_name}`;
		}

		const queryParams = [];

		// Добавляем параметры из передаваемого объекта
		if (params) {
			for (const [key, value] of Object.entries(params)) {
				queryParams.push(`${key}=${encodeURIComponent(value)}`);
			}
		}

		// Добавляем наименование периода
		if (value !== 'За весь период') {
      queryParams.push(`period_title=${encodeURIComponent(value.toLowerCase())}`);
    }

		// Добавляем временной интервал
		if (reportsInterval) {
			queryParams.push(`date_start=${reportsInterval.from}`);
			queryParams.push(`date_end=${reportsInterval.to}`);
		}

		// Добавляем фильтр по команде для определенных отчетов
		let team = '';
		if (reportType !== 'clients' && activeFilter) {
				team = ` для команды ${activeFilter.value}`;
				queryParams.push(`team_id=${activeFilter.id}`);
		}

		const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
		const url = `/report/${urlPath}/export${queryString}`;

		fetch(process.env.NEXT_PUBLIC_HTTP_SERVICE_URL + url, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		})
		.then((response) => response.blob())
		.then((blob) => {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;

			const period = value === 'За весь период' ? ` ${value.toLowerCase()}` : ` за ${value.toLowerCase()}`;
			let dateRange = '';
			if (reportsInterval?.from && reportsInterval?.to) {
				const fromDate = new Date(reportsInterval.from);
				const toDate = new Date(reportsInterval.to);
				dateRange = ` с ${format(fromDate, 'dd.MM.yyyy')} по ${format(toDate, 'dd.MM.yyyy')}`;
			}
			const fileName = `${title}${team}${period}${dateRange}.xlsx`;

			a.download = fileName;
			document.body.appendChild(a);
			a.click();

			if (projectId) {
				setLoadingProjectExports(prev => {
					const newSet = new Set(prev);
					newSet.delete(projectId);
					return newSet;
				});
			} else {
				setIsLoadingExport(false);
			}

			window.URL.revokeObjectURL(url);
		});
	}

	return {
		setMainTabValue,
		isExportDisabled,
		reportsInterval,
		setReportsInterval,
		intervalValues,
		value,
		setValue,
		mainTabValue,
		isFilterOpened,
		filterButtonClick,
		setShownOptions,
		setSearchValue,
		options,
		activeFilter,
		searchValue,
		setActiveFilter,
		shownOptions,
		setIsExportDisabled,
		exportReport,
		isLoadingExport,
		loadingProjectExports
	};
};
