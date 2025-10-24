import { FC } from 'react';
import { View, useToggle } from 'reshaped/bundle';
import ProjectTimeTable from '../../../entities/ProjectTimeTable/ProjectTimeTable';
import { TaskModal } from '../TaskDetail/TaskModal';

interface IProjectTimeProps {
	showTimeFilters: boolean;
	dataProject: IOneProject | undefined;
}

const ProjectTime: FC<IProjectTimeProps> = ({ showTimeFilters, dataProject }) => {
	const { active: activeTaskModal, activate: activateTaskModal, deactivate: deactivateTaskModal } = useToggle(false);

	return (
		<View paddingEnd={5} paddingStart={5}>
			<ProjectTimeTable showTimeFilters={showTimeFilters} activateTaskModal={activateTaskModal} />
			{dataProject && (
				<TaskModal active={activeTaskModal} deactivate={deactivateTaskModal} dataProject={dataProject} tasksData={[]} />
			)}
		</View>
	);
};

export default ProjectTime;
