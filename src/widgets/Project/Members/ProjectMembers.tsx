import { FC, useEffect, useState } from 'react';
import ProjectMembersTable from '../../../entities/ProjectMembersTable/ProjectMembersTable';
import {
	useGetProjectClientMembersQuery,
	useGetProjectMembersQuery,
} from '../../../store/dictionaries/dictionariesApi';
import styled from 'styled-components';

export const MainContainer = styled.main`
	display: flex;
	align-items: center;
	flex-direction: column;
	height: calc(100vh - 144px);
	overflow: auto;
	padding: 0 20px 20px;
	gap: 32px;
	width: 100%;
	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar {
		width: 4px;
		background-color: transparent;
		border-radius: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(207, 208, 211, 0.5);
	}
`;

interface IProjectMembersProps {
	dataProject: IOneProject | undefined;
	members: IMembersState;
	setMembers: React.Dispatch<React.SetStateAction<IMembersState>>;
}

const ProjectMembers: FC<IProjectMembersProps> = ({ dataProject, members, setMembers }) => {
	const [projectData, setProjectData] = useState<IOneProject | undefined>(dataProject);
	const { data: allOurMembers } = useGetProjectMembersQuery();
	const { data: allClientMembers } = useGetProjectClientMembersQuery();

	useEffect(() => {
		if (dataProject) setProjectData({ ...dataProject });
	}, [dataProject, allOurMembers]);

	const commonProps = { setMembers, members, dataProject: projectData };

	return (
		<MainContainer>
			<ProjectMembersTable
				{...commonProps}
				isClientTeam={false}
				allMembers={allOurMembers}
				managerId={dataProject?.manager_id}
			/>
			<ProjectMembersTable {...commonProps} isClientTeam={true} allMembers={allClientMembers} />
		</MainContainer>
	);
};

export default ProjectMembers;
