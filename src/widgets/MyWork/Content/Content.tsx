import React, { FC } from 'react';
import { MyWorkTab } from '../MyWorkController';
import { MyWorkTasks } from '../Tasks/Tasks';
import { MyWorkSchedule } from '../Schedule/Schedule';
import { MyWorkReadiness } from '../Readiness/Readiness';
import { MyWorkApproval } from '../Approval/Approval';
import { UserRole } from '../../../shared/utility/Constants/userRole';

interface IMyWorkContentProps {
	user: IMember;
	activeTab: MyWorkTab;
	dateInterval: IHistoryInterval | null;
	isApplicationModalActive: boolean;
	deactivateApplicationModal: () => void;
}

export const MyWorkContent: FC<IMyWorkContentProps> = ({
	user,
	activeTab,
	dateInterval,
	isApplicationModalActive,
	deactivateApplicationModal,
}) => {
	const { name: tab } = activeTab;

	return (
		<>
			{tab === 'tasks' ? (
				<MyWorkTasks />
			) : tab === 'schedule' ? (
				<MyWorkSchedule dateInterval={dateInterval} />
			) : tab === 'readiness' ? (
				<MyWorkReadiness
					isApplicationModalActive={isApplicationModalActive}
					deactivateApplicationModal={deactivateApplicationModal}
				/>
			) : tab === 'approval' && (user.role?.name === UserRole.ADMIN || user.role?.name === UserRole.UNITMASTER) ? (
				<MyWorkApproval />
			) : (
				<></>
			)}
		</>
	);
};
