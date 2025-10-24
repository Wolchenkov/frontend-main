import { FC, useState } from 'react';
import * as S from '../Projects.styled';
import { Button, Divider, Icon, Progress } from 'reshaped/bundle';
import { SvgComponent } from '../../../../shared';
import { TypeWorkRow } from './TypeWorkRow';

interface IProjectRowProps {
	project: IProjectReportData;
	value: string;
	isLoadingTotalExport: boolean;
	loadingProjectExports: Set<string>;
	exportReport: (params?: Record<string, string | number>, extraData?: {project_name?: string}) => void;
}

export const ProjectRow: FC<IProjectRowProps> = ({ project, value, isLoadingTotalExport, loadingProjectExports, exportReport }) => {
	const { slug, name, time_amount_project, budget_balance, budget_amount, type_works, spent, progress, client } =
		project;

	const [activeTypeWork, setActiveTypeWork] = useState<string[]>([]);
	const [activeProjects, setActiveProjects] = useState<string[]>([]);

	function checkActiveProjects(slug: string) {
		setActiveProjects((prev) => (prev.includes(slug) ? prev.filter((el) => el !== slug) : prev.concat(slug)));
	}

	return (
		<>
			<S.Row>
				<S.ProjectNameContainer>
					<div style={{ width: '16px' }}>
						{type_works.length > 0 && (
							<Icon
								size={4}
								svg={<SvgComponent name='arrow-right-fill-black' onClick={() => checkActiveProjects(slug)} />}
								attributes={{
									style: { transform: `${activeProjects.includes(slug) ? 'rotate(90deg)' : 'none'}` },
								}}
							/>
						)}
					</div>
					<S.MyText500 variant='caption-1' attributes={{ style: { overflow: 'visible' } }}>
						{name}
					</S.MyText500>
				</S.ProjectNameContainer>

				<S.ClientNameContainer>
					<S.MyText500 variant='caption-1' attributes={{ style: { overflow: 'visible' } }}>
						{client.name}
					</S.MyText500>
				</S.ClientNameContainer>
				{value === 'За весь период' && (
					<S.FlexEndContainer>
						<S.MyText500 variant='caption-1'>{budget_amount?.toLocaleString('ru-RU')}</S.MyText500>
					</S.FlexEndContainer>
				)}
				<S.ActualTimeContainer>
					<S.MyText500 variant='caption-1'>{time_amount_project}</S.MyText500>
				</S.ActualTimeContainer>
				<S.FlexEndContainer>
					<S.MyText500 variant='caption-1'>
						{typeof spent === 'number' ? spent.toLocaleString('ru-RU') : spent}
					</S.MyText500>
				</S.FlexEndContainer>
				<S.BalanceAndProgressContainer>
					<S.FlexEndContainer>
						<S.MyText500 variant='caption-1' color={Number(budget_balance) < 0 ? 'critical' : 'neutral'}>
							{typeof budget_balance === 'number' ? budget_balance?.toLocaleString('ru-RU') : budget_balance}
						</S.MyText500>
					</S.FlexEndContainer>
					<S.ProgressContainer>
						{typeof budget_balance === 'number' && (
							<Progress
								value={Math.abs(progress)}
								size='small'
								color={Number(budget_balance) < 0 ? 'critical' : 'positive'}
								attributes={{ style: { width: '60px' } }}
							/>
						)}
					</S.ProgressContainer>
				</S.BalanceAndProgressContainer>
				<Button
					variant='ghost'
					size='small'
					startIcon={<SvgComponent name={isLoadingTotalExport ? 'download-line-disabled' : 'download-line'} />}
					loading={loadingProjectExports.has(slug)}
					disabled={isLoadingTotalExport}
					onClick={() => exportReport({project_id: slug}, {project_name: name})}
				/>
			</S.Row>
			<Divider />
			<S.TypeWorkContainer active={activeProjects.includes(slug)}>
				{activeProjects.includes(slug) &&
					type_works.map((typeWork) => (
						<TypeWorkRow
							key={slug + typeWork.type_work}
							typeWork={typeWork}
							slug={slug}
							activeTypeWork={activeTypeWork}
							setActiveTypeWork={setActiveTypeWork}
							value={value}
						/>
					))}
			</S.TypeWorkContainer>
		</>
	);
};
