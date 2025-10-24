import { FC, useState, useEffect } from 'react';
import * as S from './MyWork.styled';
import { Text, useToggle } from 'reshaped/bundle';
import { useMyWorkController } from './MyWorkController';
import { MyWorkPanel } from './Panel/Panel';
import { MyWorkContent } from './Content/Content';
import { getDateInterval } from '../../shared/utility/Utils';

interface IMyWorkProps {
	user: IMember;
}

export const MyWork: FC<IMyWorkProps> = ({ user }) => {
	const [dateInterval, setDateInterval] = useState<IHistoryInterval | null>(null);
	const { activeTab, handleTabChange } = useMyWorkController();

	const {
		active: isApplicationModalActive,
		activate: activateApplicationModal,
		deactivate: deactivateApplicationModal,
	} = useToggle(false);

	useEffect(() => {
		const [from, to] = getDateInterval('Неделя');
		setDateInterval({ from, to });
	}, [activeTab]);

	return (
		<S.MyWork>
			<Text variant='title-2' attributes={{ style: { margin: '20px 20px 24px', letterSpacing: '-0.015em' } }}>
				Моя работа
			</Text>
			<MyWorkPanel
				user={user}
				activeTab={activeTab}
				changeTab={handleTabChange}
				dateInterval={dateInterval}
				setDateInterval={setDateInterval}
				activateApplicationModal={activateApplicationModal}
			/>
			<MyWorkContent
				user={user}
				activeTab={activeTab}
				dateInterval={dateInterval}
				isApplicationModalActive={isApplicationModalActive}
				deactivateApplicationModal={deactivateApplicationModal}
			/>
		</S.MyWork>
	);
};
