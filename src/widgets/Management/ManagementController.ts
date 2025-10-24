import { useState } from 'react';

export interface ManagementTab {
	name: string;
	text: string;
	icon: string;
}

export const MANAGEMENT_TABS: ManagementTab[] = [
	{
		name: 'general',
		text: 'Общие',
		icon: 'settings',
	},
	{
		name: 'post',
		text: 'Должности',
		icon: 'award-line-dark',
	},
	{
		name: 'workType',
		text: 'Типы работ',
		icon: 'briefcase-line',
	},
	{
		name: 'weekdays',
		text: 'Рабочие дни',
		icon: 'calendar-line',
	},
];

export function useManagementController() {
	const [activeTab, setActiveTab] = useState<ManagementTab>(MANAGEMENT_TABS[0]);

	const handleTabChange = ({ value }: { value: string }): void => {
		const newValue = MANAGEMENT_TABS.find(({ name }) => name === value);

		if (newValue) {
			setActiveTab(newValue);
		}
	};

	return {
		activeTab,
		handleTabChange,
	};
}
