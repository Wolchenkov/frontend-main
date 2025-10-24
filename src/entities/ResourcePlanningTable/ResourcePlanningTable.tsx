import { FC } from 'react';

import ResourcePlanningTableHead from './ResourcePlanningTableHead/ResourcePlanningTableHead';
import ResourcePlanningTableRow from './ResourcePlanningTableRow/ResourcePlanningTableRow';

import { Loader } from 'reshaped/bundle';
import * as S from './ResourcePlanningTable.styled';

import { useResourcePlanningTableController } from './ResourcePlanningTableController';

interface IResourcePlanningTable {
	activateTaskModal: () => void;
	activeTaskData: { id: number; projectSlug: string } | undefined;
	setActiveTaskData: React.Dispatch<React.SetStateAction<{ id: number; projectSlug: string } | undefined>>;
}

const ResourcePlanningTable: FC<IResourcePlanningTable> = ({
	activateTaskModal,
	activeTaskData,
	setActiveTaskData,
}) => {
	const { user, teams, resourcePlanning, dates, teamId, setTeamId, activeSort, setActiveSort } =
		useResourcePlanningTableController(activeTaskData);

	return (
		<>
			{!user || !resourcePlanning ? (
				<S.LoaderContainer>
					<Loader size='medium' />
				</S.LoaderContainer>
			) : (
				<S.Table>
					<ResourcePlanningTableHead
						teams={teams}
						teamId={teamId}
						setTeamId={setTeamId}
						dates={dates}
						activeSort={activeSort}
						setActiveSort={setActiveSort}
					/>
					{resourcePlanning.map((resource: IResource, index: number) => (
						<ResourcePlanningTableRow
							key={resource.id}
							resource={resource}
							isLast={resourcePlanning.length - 1 === index}
							activateTaskModal={activateTaskModal}
							setActiveTaskData={setActiveTaskData}
						/>
					))}
				</S.Table>
			)}
		</>
	);
};

export default ResourcePlanningTable;
