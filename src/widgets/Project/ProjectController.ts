/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetHistoryQuery } from '../../store/history/historyApi';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useGetExpensesQuery } from '../../store/expenses/expensesApi';
import { useAppDispatch } from '../../store';
import { setFilter } from '../../store/tasks/tasksSlice';
import { useGetUserQuery } from '../../store/auth/authApi';
import { UserRole } from '../../shared/utility/Constants/userRole';
import { useUpdateProjectViewMutation } from '../../store/projects/projectsApi';

interface ProjectType {
	name: string;
	type: string;
	icon: string;
}

export interface HandlerObject {
	value: string;
	name?: string | undefined;
}

export interface ProjectTab {
	name: string;
	text: string;
	icon: string;
	access: UserRole[];
}

export type ProjectTabList = ProjectTab[];

export type ProjectTypeList = ProjectType[];

export const PROJECT_TYPES = [
	{
		name: 'string',
		type: 'list',
		icon: 'menu-2-fill',
	},
	{
		name: 'kanban',
		type: 'kanban',
		icon: 'columns',
	},
	{
		name: 'gant',
		type: 'gantt',
		icon: 'menu-4-line',
	},
];

export const PROJECT_TABS: ProjectTabList = [
	{
		name: 'tasks',
		text: 'Задачи',
		icon: 'list',
		access: [UserRole.CLIENT, UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		name: 'members',
		text: 'Участники',
		icon: 'user',
		access: [UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		name: 'documents',
		text: 'Документы',
		icon: 'file',
		access: [UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		name: 'history',
		text: 'История',
		icon: 'history-fill',
		access: [UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		name: 'expenses',
		text: 'Расходы',
		icon: 'money-ruble-circle-line',
		access: [UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		name: 'time',
		text: 'Время',
		icon: 'time-line',
		access: [UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
];

export function useProjectController(
	projectTypes: ProjectTypeList,
	projectTabs: ProjectTabList,
	data: IOneProject | undefined
) {
	const router = useRouter();
	const { slug: projectSlug } = router.query;

	const { data: user } = useGetUserQuery();
	const [isClientRole, setIsClientRole] = useState(true);
	const [isMemberRole, setIsMemberRole] = useState(true);

	useEffect(() => {
		if (user && 'role' in user) {
			setIsClientRole(user.role?.name === UserRole.CLIENT);
			setIsMemberRole(user.role?.name === UserRole.MEMBER);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const [projectId, setProjectId] = useState(data?.id);
	const [tabValue, setTabValue] = useState(projectTypes.find(({ name }) => name === data?.view_mode) || projectTypes[0]);
	const [mainTabValue, setMainTabValue] = useState(projectTabs[0]);
	const [showTimeFilters, setShowTimeFilters] = useState(false);

	const [changeProjectViewMode] = useUpdateProjectViewMutation();
	const handleTabChange = (obj: HandlerObject): void => {
		const newValue = projectTypes.find(({ type }) => type === obj.value);
		if (newValue) {
			setTabValue(newValue);
			(user?.role?.name === UserRole.ADMIN || user?.role?.name === UserRole.UNITMASTER) && changeProjectViewMode({
				projectSlug,
				body: { view_mode: newValue.name },
			});
		}
	};
	useEffect(() => {
		if (projectId === data?.id) return;
		setProjectId(data?.id);
		setTabValue(projectTypes.find(({ name }) => name === data?.view_mode) || projectTypes[0]);
	}, [data]);

	const handleMainTabChange = (obj: { value: string }): void => {
		const newValue = projectTabs.find(({ name }) => name === obj.value);
		if (newValue) {
			setMainTabValue(newValue);
		}
	};

	const dispatch = useAppDispatch();

	//участники
	const [members, setMembers] = useState({
		clients: [...(data?.clientMembers ?? [])],
		members: [...(data?.usersMember ?? [])],
	});

	useEffect(() => {
		setMembers({
			clients: [...(data?.clientMembers ?? [])],
			members: [...(data?.usersMember ?? [])],
		});
	}, [data]);

	useEffect(() => {
		dispatch(setFilter({}));
	}, [projectSlug]);

	//история
	const [historyInterval, setHistoryInterval] = useState<IHistoryInterval | null>(null);

	const {
		data: history,
		refetch: refetchHistory,
		isLoading: isLoadingHistory,
	} = useGetHistoryQuery(
		typeof projectSlug === 'string' && !isClientRole && mainTabValue.name === 'history'
			? { projectSlug, historyInterval }
			: skipToken
	);
	const [historyData, setHistoryData] = useState<IHistory>();

	useEffect(() => {
		setHistoryData(history);
	}, [history]);

	// расходы
	const { data: expenses, refetch: refetchExpenses } = useGetExpensesQuery(
		typeof projectSlug === 'string' && !isClientRole && mainTabValue.name === 'expenses' ? { projectSlug } : skipToken
	);
	const [expensesData, setExpensesData] = useState<IOneExpense[]>();

	useEffect(() => {
		setExpensesData(expenses);
	}, [expenses]);

	useEffect(() => {
		if (mainTabValue.name === 'expenses') {
			refetchExpenses();
		}
		if (mainTabValue.name === 'history') {
			refetchHistory();
		}
	}, [mainTabValue]);

	//документы
	const [currentFolder, setCurrentFolder] = useState({ id: 0, name: 'Документы' });

	return {
		tabValue,
		mainTabValue,
		handleTabChange,
		handleMainTabChange,
		members,
		setMembers,
		historyInterval,
		setHistoryInterval,
		expensesData,
		setExpensesData,
		isLoadingHistory,
		historyData,
		setHistoryData,
		showTimeFilters,
		setShowTimeFilters,
		currentFolder,
		setCurrentFolder,
		user,
		isClientRole,
		isMemberRole,
	};
}
