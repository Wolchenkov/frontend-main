import React, { FC } from 'react';
import * as S from './Content.styled';
import { ManagementTab } from '../ManagementController';
import { ManagementGeneral } from '../General/General';
import { ManagementPost } from '../Post/Post';
import { ManagementWorkType } from '../WorkType/WorkType';
import { ManagementWeekDays } from '../WeekDays/WeekDays';

interface IManagementContentProps {
	activeTab: ManagementTab;
}

export const ManagementContent: FC<IManagementContentProps> = ({ activeTab }) => {
	const { name: tab } = activeTab;

	return (
		<S.ManagementContent>
			{tab === 'general' ? (
				<ManagementGeneral />
			) : tab === 'post' ? (
				<ManagementPost />
			) : tab === 'workType' ? (
				<ManagementWorkType />
			) : tab === 'weekdays' ? (
				<ManagementWeekDays />
			) : (
				<></>
			)}
		</S.ManagementContent>
	);
};
