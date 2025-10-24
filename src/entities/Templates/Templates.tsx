/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState, UIEvent } from 'react';
import * as S from './Templates.styled';
import { skipToken } from '@reduxjs/toolkit/query';
import { useLazyGetProjectIssuesQuery, useLazyGetProjectQuery } from '../../store/projects/projectsApi';
import { List } from './List/List';
import { Info } from './Info/Info';
import { Empty } from './Empty/Empty';
import { Button, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../shared';
import { useRouter } from 'next/router';
import { useApplyTemplateMutation } from '../../store/templates/templatesApi';
import { useShowToast } from '../../shared/utility/Hooks';
import { UserRole } from '../../shared/utility/Constants/userRole';

interface ITemplatesProps {
	templates: ITemplateGroup[];
	userData: IMember;
	isTemplateChoice: boolean;
}

export const Templates: FC<ITemplatesProps> = ({ templates, userData, isTemplateChoice }) => {
	const { teamId: userTeamId, role } = userData;

	const [activeTemplate, setActiveTemplate] = useState<{ name: string; slug: string } | undefined>(
		templates?.[0]?.projects?.[0]
	);
	const [activeTemplateId, setActiveTemplateId] = useState<number | undefined>();
	const [activeTemplateKanban, setActiveTemplateKanban] = useState<ITemplateKanban[]>([]);
	const [showBottomDivider, setShowBottomDivider] = useState<boolean>(false);

	const [getTemplate, { data: template }] = useLazyGetProjectQuery();
	const [getTemplateIssues, { data: templateIssues }] = useLazyGetProjectIssuesQuery();

	const [applyTemplate] = useApplyTemplateMutation();
	const showToast = useShowToast();
	const router = useRouter();
	const projectSlug = router.query?.projectSlug as string;

	const handleApplyTemplate = () => {
		applyTemplate({
			projectSlug: projectSlug,
			templateSlug: activeTemplate?.slug as string,
		})
			.unwrap()
			.then(() => {
				setTimeout(() => {
					window.location.href = `/project/${projectSlug}`;
				}, 500);
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	const handleScroll = (e: UIEvent<HTMLDivElement>) => {
		if (e) {
			if (e.currentTarget.scrollTop > 0) {
				setShowBottomDivider(true);
			} else setShowBottomDivider(false);
		}
	};

	useEffect(() => {
		if (!templates.length) return;
		const activeTemplateIndex = templates
			.map(({ projects }) => projects)
			.flat()
			.findIndex(({ slug }) => slug === activeTemplate?.slug);
		if (activeTemplateIndex === -1) {
			setActiveTemplate(templates?.[0]?.projects?.[0]);
		}
	}, [templates]);

	useEffect(() => {
		if (template) {
			const templateTeamId = (
				templates.find((templateItem) =>
					templateItem.projects.find((project) => project.slug === template.slug)
				) as ITemplateGroup
			)?.team_id;
			setActiveTemplateId(templateTeamId);
		}
	}, [template]);

	useEffect(() => {
		if (!activeTemplate) return;
		getTemplate(activeTemplate?.slug ?? skipToken);
		getTemplateIssues(activeTemplate?.slug ?? skipToken);
	}, [activeTemplate]);

	useEffect(() => {
		if (template && templateIssues) {
			const kanban = template?.Kanban;

			if (kanban.length === 0) {
				setActiveTemplateKanban([]);
				return;
			}

			const detailedKanban = [...kanban].map((kanbanGroup: any) => {
				const projectIssues = kanbanGroup.projectIssue
					.map((issueID: number) => {
						return templateIssues.find(({ id }: any) => id === issueID);
					})
					.filter((projectIssue: ITask | undefined) => projectIssue !== undefined);

				return {
					id: kanbanGroup.id,
					name: kanbanGroup.name,
					issues: projectIssues,
				};
			});

			setActiveTemplateKanban(detailedKanban);
		}
	}, [template, templateIssues]);

	return (
		<>
			{isTemplateChoice ? (
				<S.TemplatesHeader showBottomDivider={showBottomDivider}>
					<S.TemplatesHeaderLeft>
						<Button
							onClick={() => router.back()}
							color='white'
							size='small'
							startIcon={<SvgComponent name='arrow-left-s' />}
						>
							<Text variant='body-2' attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}>
								Назад
							</Text>
						</Button>
					</S.TemplatesHeaderLeft>
					<S.TemplatesHeaderRight>
						<S.TemplatesHeaderRightWrap>
							<Text variant='title-2' attributes={{ style: { marginLeft: '8px', letterSpacing: '-0.015em' } }}>
								{activeTemplate?.name}
							</Text>
						</S.TemplatesHeaderRightWrap>
						<Button
							color='primary'
							size='small'
							attributes={{ style: { marginRight: 4, position: 'absolute', right: 0, top: 0 } }}
							onClick={handleApplyTemplate}
						>
							<Text variant='body-2' attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}>
								Выбрать шаблон
							</Text>
						</Button>
					</S.TemplatesHeaderRight>
				</S.TemplatesHeader>
			) : (
				<></>
			)}
			{templates.length && templates.map(({ projects }) => projects).flat().length ? (
				<S.TemplatesWrap isTemplateChoice={isTemplateChoice} onScroll={handleScroll}>
					<List
						templates={[...templates].sort((a, b) => +(b.team_id === userTeamId) - +(a.team_id === userTeamId))}
						activeTemplate={activeTemplate}
						userTeamId={userTeamId}
						userRole={userData.role?.name}
						setActiveTemplate={setActiveTemplate}
					/>
					{template && activeTemplate && activeTemplateId && (
						<Info
							template={template}
							activeTemplate={activeTemplate}
							templateKanban={activeTemplateKanban}
							templateNames={
								(templates.find(({ team_id }) => team_id === userTeamId) as ITemplateGroup)?.projects?.map(
									({ name }) => name
								) || []
							}
							isUserTeamTemplate={role?.name === UserRole.ADMIN || activeTemplateId === userTeamId}
							isTemplateChoice={isTemplateChoice}
							templateIssues={templateIssues}
						/>
					)}
				</S.TemplatesWrap>
			) : (
				<Empty />
			)}
		</>
	);
};
