import { useState, useEffect } from 'react';

import { useGetUserQuery } from '../../store/auth/authApi';
import { useLazyGetOurTeamsQuery } from '../../store/teams/teamsApi';
import { useLazyGetResourcePlanningQuery } from '../../store/resources/resourcesApi';

export const useResourcePlanningTableController = (activeTaskData: { id: number; projectSlug: string } | undefined) => {
	const { data: user } = useGetUserQuery();
	const [getTeams, { data: teams }] = useLazyGetOurTeamsQuery();
	const [getResourcePlanning, { data }] = useLazyGetResourcePlanningQuery();

	const [teamId, setTeamId] = useState<number>();
	const [dates, setDates] = useState<IResourcePlanningDates>();
	const [resourcePlanning, setResourcePlanning] = useState<IResource[]>();
	const [activeSort, setActiveSort] = useState({ date: '', order: '' });
	useEffect(() => {
		getTeams();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		user && setTeamId(user.teamId);
	}, [user]);

	useEffect(() => {
		if (data) {
			if (activeSort.order === 'desc') {
				setResourcePlanning(
					[...data.data].sort(
						(a, b) => b.list[activeSort.date].estimate_for_one_day - a.list[activeSort.date].estimate_for_one_day
					)
				);
			} else if (activeSort.order === 'asc') {
				setResourcePlanning(
					[...data.data].sort(
						(a, b) => a.list[activeSort.date].estimate_for_one_day - b.list[activeSort.date].estimate_for_one_day
					)
				);
			} else {
				setResourcePlanning([...data.data]);
			}
		}
	}, [activeSort, data]);

	useEffect(() => {
		if (resourcePlanning && resourcePlanning.length > 0) {
			setDates(resourcePlanning[0].list);
		}
	}, [resourcePlanning]);

	useEffect(() => {
		teamId && !activeTaskData && getResourcePlanning({ team: teamId });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [teamId, activeTaskData]);

	return {
		user,
		teams,
		resourcePlanning,
		dates,
		teamId,
		setTeamId,
		activeSort,
		setActiveSort,
	};
};
