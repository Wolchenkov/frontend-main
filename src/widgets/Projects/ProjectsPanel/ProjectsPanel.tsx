import React, { FC } from 'react';
import * as S from './ProjectsPanel.styled';
import { Button, Tabs, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { HandlerObject, ProjectTab } from '../../Project/ProjectController';
import { PROJECTS_TABS } from '../ProjectsController';
import { AddDocumentButton } from '../../../features';
import { UserRole } from '../../../shared/utility/Constants/userRole';

interface IProjectsPanelProps {
	openModal: () => void;
	handleTabChange: (obj: HandlerObject) => void;
	mainTabValue: ProjectTab;
	currentFolder: IFolder;
	userRole: string | undefined;
}

export const ProjectsPanel: FC<IProjectsPanelProps> = ({
	openModal,
	handleTabChange,
	mainTabValue,
	currentFolder,
	userRole,
}) => {
	return (
		<S.ProjectsPanel>
			<Tabs variant='pills' value={mainTabValue.name} onChange={handleTabChange}>
				<Tabs.List>
					{PROJECTS_TABS.filter((tab) => tab.access.includes(userRole as UserRole)).map((tab) => (
						<Tabs.Item key={tab.name} icon={<SvgComponent name={tab.icon} />} value={tab.name}>
							<Text
								variant='body-2'
								attributes={{
									style: { letterSpacing: '-0.02em' },
								}}
							>
								{tab.text}
							</Text>
						</Tabs.Item>
					))}
				</Tabs.List>
			</Tabs>
			{mainTabValue.name === 'list' && (
				<S.ProjectsPanelRight>
					{userRole && !(userRole === UserRole.CLIENT || userRole === UserRole.MEMBER) && (
						<Button
							color='primary'
							startIcon={<SvgComponent name='add-white' />}
							size='small'
							onClick={openModal}
							attributes={{ style: { letterSpacing: '-0.02em' } }}
						>
							Новый проект
						</Button>
					)}
					{/* {userRole && userRole !== UserRole.CLIENT && (
						<Button
							color='neutral'
							size='small'
							// onClick={() => { }}
							attributes={{ style: { letterSpacing: '-0.02em' } }}
						>
							Группировать
						</Button>
					)} */}
					{/* <Button
						color='neutral'
						startIcon={<SvgComponent name='filter' />}
						size='small'
						// onClick={() => { }}
					/> */}
				</S.ProjectsPanelRight>
			)}
			{mainTabValue.name === 'documents' && (
				<S.ProjectsPanelRight>
					<AddDocumentButton currentFolder={currentFolder} type='groups' />
				</S.ProjectsPanelRight>
			)}
		</S.ProjectsPanel>
	);
};
