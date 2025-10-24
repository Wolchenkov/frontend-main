import React, { Dispatch, FC, SetStateAction } from 'react';
import * as S from './Projects.styled';
import { Divider, Loader, Text } from 'reshaped/bundle';
import { ProjectRow } from './Rows/ProjectRow';
import { useProjectsController } from './ProjectsController';
import { SvgComponent } from '../../../shared';

export const TABLE_HEADERS = [
	{ title: 'Проект/задача', width: '280px' },
	{ title: 'Клиент', width: '158px' },
	{ title: 'Бюджет всего, ₽', width: '126px', end: true },
	{ title: 'Факт, ч', width: '126px', center: true },
	{ title: 'Потрачено, ₽', width: '126px', end: true },
	{ title: 'Остаток, ₽', width: '126px', end: true },
	{ title: '', width: '28px', end: true },
];

interface IProjectsProps {
	reportsInterval: IHistoryInterval | null;
	activeFilter: fetchingDictionary | null;
	value: string;
	isLoadingExport: boolean;
	loadingProjectExports: Set<string>;
	setIsExportDisabled: Dispatch<SetStateAction<boolean>>;
	exportReport: (params?: Record<string, string | number>, extraData?: {project_name?: string}) => void;
}

export const Projects: FC<IProjectsProps> = ({ activeFilter, value, reportsInterval, isLoadingExport, loadingProjectExports, setIsExportDisabled, exportReport }) => {
	const { isFetching, reportsData, projectsContainerRef, isLoading } = useProjectsController({
		reportsInterval,
		activeFilter,
		setIsExportDisabled,
	});

	return (
		<>
			<S.TableContainer ref={projectsContainerRef}>
				{!isFetching ? (
					reportsData && reportsData?.data?.length > 0 ? (
						<>
							<S.Table>
								<S.Header>
									{TABLE_HEADERS.map(({ title, width, center, end }, index) => {
										if (value !== 'За весь период' && index === 2) {
											return null;
										}
										return (
											<S.HeaderText
												key={title}
												variant='caption-1'
												color='neutral-faded'
												attributes={{ style: { width, justifyContent: center ? 'center' : end ? 'end' : undefined } }}
											>
												{title}
											</S.HeaderText>
										);
									})}
								</S.Header>
								<Divider />
								{reportsData.data.map((project) => (
									<ProjectRow project={project} key={project.slug} value={value} isLoadingTotalExport={isLoadingExport} loadingProjectExports={loadingProjectExports} exportReport={exportReport} />
								))}
							</S.Table>
							{isLoading && (
								<S.LazyLoadingContainer>
									<Loader size='medium' />
								</S.LazyLoadingContainer>
							)}
						</>
					) : (
						<S.LoaderContainer>
							<SvgComponent name='empty-report' />
							<Text variant='body-1' attributes={{ style: { fontWeight: 600, letterSpacing: '-0.02em' } }}>
								Нет данных для формирования отчета
							</Text>
						</S.LoaderContainer>
					)
				) : (
					<S.LoaderContainer>
						<Loader size='medium' />
					</S.LoaderContainer>
				)}
			</S.TableContainer>
		</>
	);
};
