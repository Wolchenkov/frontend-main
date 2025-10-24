/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import * as S from './ProjectsTemplates.styled';
import { useGetTemplatesQuery } from '../../../store/templates/templatesApi';
import { Loader } from 'reshaped/bundle';
import { Templates } from '../../../entities';

interface IProjectsTemplatesProps {
	isTemplateChoice: boolean;
	user: IMember | undefined;
}

export const ProjectsTemplates: FC<IProjectsTemplatesProps> = ({ isTemplateChoice, user }) => {
	const [projectsTemplates, setProjectsTemplates] = useState<ITemplateGroup[] | undefined>(undefined);

	const {
		data: templates,
		refetch: refetchTemplates,
		isSuccess: isTemplatesSuccess,
		isFetching: isTemplatesFetching,
	} = useGetTemplatesQuery();

	useEffect(() => {
		refetchTemplates();
	}, []);

	useEffect(() => {
		if (isTemplatesSuccess) {
			setProjectsTemplates(templates);
		}
	}, [isTemplatesSuccess, templates]);

	return (
		<>
			{isTemplatesFetching ? (
				<S.ProjectsTemplatesLoader>
					<Loader size='medium' />
				</S.ProjectsTemplatesLoader>
			) : (
				projectsTemplates &&
				user && (
					<Templates
						templates={[...projectsTemplates].sort(
							(a, b) => +(b.team_id === user.teamId) - +(a.team_id === user.teamId)
						)}
						userData={user}
						isTemplateChoice={isTemplateChoice}
					/>
				)
			)}
		</>
	);
};
