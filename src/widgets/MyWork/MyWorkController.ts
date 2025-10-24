import { useState } from 'react';

export interface MyWorkTab {
	name: string;
	text: string;
	icon: string;
}

export const MY_WORK_TABS: MyWorkTab[] = [
	{
		name: 'tasks',
		text: 'Задачи',
		icon: 'list',
	},
	{
		name: 'schedule',
		text: 'Расписание',
		icon: 'calendar-line',
	},
	{
		name: 'readiness',
		text: 'Готовность к работе',
		icon: 'admin-line',
	},
	{
		name: 'approval',
		text: 'Согласование',
		icon: 'file',
	},
];

export enum Readiness {
	AGREED = 'agreed',
	ON_APPROVAL = 'OnApproval',
	REJECTED = 'rejected',
}

export const READINESS_STATUSES: {
	name: string;
	text: string;
	color?: 'critical' | 'positive' | 'primary';
}[] = [
	{
		name: Readiness.AGREED,
		text: 'Согласовано',
		color: 'positive',
	},
	{
		name: Readiness.ON_APPROVAL,
		text: 'На согласовании',
	},
	{
		name: Readiness.REJECTED,
		text: 'Отклонено',
		color: 'critical',
	},
];

export function useMyWorkController() {
	const [activeTab, setActiveTab] = useState<MyWorkTab>(MY_WORK_TABS[0]);

	const handleTabChange = ({ value }: { value: string }): void => {
		const newValue = MY_WORK_TABS.find(({ name }) => name === value);

		if (newValue) {
			setActiveTab(newValue);
		}
	};

	return {
		activeTab,
		handleTabChange,
	};
}
