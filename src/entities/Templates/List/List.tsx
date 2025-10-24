import React, { FC, Fragment } from 'react';
import * as S from './List.styled';
import { Item } from '../Item/Item';

interface IListProps {
	templates: ITemplateGroup[];
	activeTemplate: { name: string; slug: string } | undefined;
	userTeamId: number;
	userRole: string | undefined;
	setActiveTemplate: (activeTemplate: { name: string; slug: string }) => void;
}

export const List: FC<IListProps> = ({ templates, activeTemplate, userTeamId, userRole, setActiveTemplate }) => {
	return (
		<S.List>
			<>
				{templates.map((templatesItem) => {
					return (
						<Fragment key={templatesItem.id}>
							{templatesItem.projects.length ? (
								<S.Group key={templatesItem.id}>
									<S.GroupName>{templatesItem.name}</S.GroupName>
									<>
										{templatesItem.projects.map((project) => (
											<Item
												key={project.slug}
												template={project}
												activeTemplate={activeTemplate}
												isUserTeamTemplate={userTeamId === templatesItem.team_id}
												userRole={userRole}
												setActiveTemplate={setActiveTemplate}
											/>
										))}
									</>
								</S.Group>
							) : (
								<></>
							)}
						</Fragment>
					);
				})}
			</>
		</S.List>
	);
};
