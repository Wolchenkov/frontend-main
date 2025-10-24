/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { HandlerObject, ProjectTabList } from '../Project/ProjectController';
import { useEffect, useState } from 'react';
import { UserRole } from '../../shared/utility/Constants/userRole';

export const PROJECTS_TABS: ProjectTabList = [
	{
		name: 'list',
		text: 'Список',
		icon: 'list',
		access: [UserRole.CLIENT, UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		name: 'documents',
		text: 'Документы',
		icon: 'file',
		access: [UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		name: 'templates',
		text: 'Шаблоны',
		icon: 'survey-line',
		access: [UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
];

export function useProjectsController(projectsTabs: ProjectTabList) {
	const [mainTabValue, setMainTabValue] = useState(projectsTabs[0]);
	const [isTemplateChoice, setIsTemplateChoice] = useState(false);
	const [currentFolder, setCurrentFolder] = useState({ id: 0, name: 'Документы' });
	const router = useRouter();

	const handleTabChange = (obj: HandlerObject): void => {
		const newValue = projectsTabs.find(({ name }) => name === obj.value);

		if (newValue) {
			setMainTabValue(newValue);
		}
	};

	useEffect(() => {
		const tab = router.query?.tab;
		const templateChoice = router.query?.templateChoice;

		if (tab === 'templates') {
			setMainTabValue(projectsTabs[2]);
		}

		if (templateChoice === 'true') {
			setIsTemplateChoice(true);
		}
	}, [router]);

	return {
		handleTabChange,
		mainTabValue,
		isTemplateChoice,
		currentFolder,
		setCurrentFolder,
	};
}
