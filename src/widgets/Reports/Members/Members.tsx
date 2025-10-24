import React, { FC } from 'react';
import * as S from './Members.styled';
import { Divider, Loader, Text } from 'reshaped/bundle';
import { MemberRow } from './Rows/MemberRow';
import { BarChart } from './Chart/BarChart';
import { ChartBadge } from './Chart/ChartBadge';
import { SvgComponent } from '../../../shared';
import { useMembersController } from './MembersController';

export enum ReportType {
	DISPOSAL = 'disposal',
	DEVIATION = 'deviation',
	ESTIMATE = 'estimate',
	TIME_RECORD = 'timeRecord',
}

export const TITLE_MAP: { [key in ReportType]: [string, string?] } = {
	disposal: ['Коэф. утилизации, %', 'Доля оплаченных часов к затраченному времени'],
	deviation: ['Отклонение за период, %', 'Отклонение фактически затраченных часов относительно планируемых'],
	estimate: ['Общая оценка, ч'],
	timeRecord: ['Всего потрачено, ч'],
};

export const TABLE_HEADERS = [
	{ title: 'Исполнитель', width: '236px' },
	{ title: 'Команда', width: '160px' },
	{ title: 'Закрыто задач', width: '132px', center: true },
	{ title: 'Оценка', width: '116px', center: true },
	{ title: 'Факт', width: '116px', center: true },
	{ title: 'Отклонение', width: '116px', center: true },
	{ title: 'Утилизация', width: '116px', center: true },
];

interface IMembersProps {
	reportsInterval: IHistoryInterval | null;
	activeFilter: fetchingDictionary | null;
	setIsExportDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Members: FC<IMembersProps> = ({ reportsInterval, activeFilter, setIsExportDisabled }) => {
	const { isFetching, reportsData, checkActiveUsers, activeUsers } = useMembersController({
		reportsInterval,
		activeFilter,
		setIsExportDisabled,
	});

	return (
		<>
			{!isFetching ? (
				reportsData &&
				(reportsData?.data.length > 0 ? (
					<>
						{reportsData.chart.values.length > 0 && reportsInterval !== null && (
							<S.ChartContainer>
								<Text variant='title-3' attributes={{ style: { marginBottom: 32 } }}>
									Утилизация, %
								</Text>
								<BarChart values={reportsData.chart.values} threshold={reportsData.chart.threshold} />
								<S.ChartBadgesContainer>
									{reportsData.list.map(({ type, num, last }) => {
										const [title, titleTooltip] = TITLE_MAP[type as ReportType];
										return (
											<ChartBadge key={type} title={title} titleTooltip={titleTooltip} value={num} profit={last} />
										);
									})}
								</S.ChartBadgesContainer>
							</S.ChartContainer>
						)}
						<S.TableContainer>
							<S.Table>
								<S.Header>
									{TABLE_HEADERS.map(({ title, width, center }) => (
										<S.HeaderText
											key={title}
											variant='caption-1'
											color='neutral-faded'
											attributes={{ style: { width, justifyContent: center ? 'center' : undefined } }}
										>
											{title}
										</S.HeaderText>
									))}
								</S.Header>
								<Divider />
								{reportsData.data.map((member) => (
									<MemberRow
										key={member.id}
										member={member}
										checkActiveUsers={checkActiveUsers}
										activeUsers={activeUsers}
									/>
								))}
							</S.Table>
						</S.TableContainer>
					</>
				) : (
					<S.LoaderContainer>
						<SvgComponent name='empty-report' />
						<Text variant='body-1' attributes={{ style: { fontWeight: 600, letterSpacing: '-0.02em' } }}>
							Нет данных для формирования отчета
						</Text>
					</S.LoaderContainer>
				))
			) : (
				<S.LoaderContainer>
					<Loader size='medium' />
				</S.LoaderContainer>
			)}
		</>
	);
};
