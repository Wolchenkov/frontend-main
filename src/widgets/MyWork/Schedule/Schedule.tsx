/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import * as S from './Schedule.styled';
import { Icon, useToggle } from 'reshaped/bundle';
import { useGetMyScheduleQuery } from '../../../store/myWork/myWorkApi';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { eachDayOfInterval, format } from 'date-fns';
import { SvgComponent } from '../../../shared';
import { ScheduleItem } from './Item/Item';
import { TaskModal } from '../../Project/TaskDetail/TaskModal';
import { useRouter } from 'next/router';
import { useLazyGetProjectIssuesQuery, useLazyGetProjectQuery } from '../../../store/projects/projectsApi';
import { ScheduleEmpty } from './Empty/Empty';

export const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

interface IMyWorkScheduleProps {
	dateInterval: IHistoryInterval | null;
}

export const MyWorkSchedule: FC<IMyWorkScheduleProps> = ({ dateInterval }) => {
	const [myWorkSchedule, setMyWorkSchedule] = useState<IMyWorkSchedule>();
	const [myWorkProject, setMyWorkProject] = useState<IOneProject>();
	const [myWorkProjectIssues, setMyWorkProjectIssues] = useState<ITask[]>();
	const [dates, setDates] = useState<number[]>();

	const { active: activeTaskModal, activate: activateTaskModal, deactivate: deactivateTaskModal } = useToggle(false);
	const [activeTaskData, setActiveTaskData] = useState<{ id: number; projectSlug: string } | undefined>();

	const { data: schedule } = useGetMyScheduleQuery(dateInterval ?? skipToken);
	const [getProject, { originalArgs: projectArgs, data: dataProject }] = useLazyGetProjectQuery();
	const [getProjectTasks, { data: dataProjectIssues }] = useLazyGetProjectIssuesQuery();

	const router = useRouter();

	useEffect(() => {
		if (schedule && dateInterval) {
			const startDate = new Date(dateInterval.from);
			const endDate = new Date(dateInterval.to);
			const datesArray = eachDayOfInterval({ start: startDate, end: endDate });
			const dates = datesArray.map((date) => Number(format(date, 'd')));
			setDates(dates);
			setMyWorkSchedule(schedule.data[0]);
		}
	}, [schedule]);

	useEffect(() => {
		if (dataProject) {
			setMyWorkProject(dataProject);
		}
	}, [dataProject]);

	useEffect(() => {
		if (dataProjectIssues) {
			setMyWorkProjectIssues(dataProjectIssues);
		}
	}, [dataProjectIssues]);

	useEffect(() => {
		if (activeTaskData !== undefined) {
			if (activeTaskData.projectSlug === projectArgs) {
				setMyWorkProject(dataProject);
				setMyWorkProjectIssues(dataProjectIssues);
			} else {
				getProject(activeTaskData.projectSlug);
				getProjectTasks(activeTaskData.projectSlug);
			}
			activateTaskModal();
			// Создание нового объекта query, чтобы не мутировать существующий
			const newQuery = { ...router.query, modal: activeTaskData.id };

			router.push({
				pathname: router.pathname,
				query: newQuery,
			});
		}
	}, [activeTaskData]);

	const handleTaskModalClose = () => {
		deactivateTaskModal();
		setActiveTaskData(undefined);
		setMyWorkProject(undefined);
		setMyWorkProjectIssues(undefined);
	};

	if (myWorkSchedule) {
		return (
			<>
				<S.TableHead>
					{dates &&
						daysOfWeek.map((day, index) => (
							<S.TableHeadText key={day} variant='caption-1' isWeekend={index === 5 || index === 6}>
								{day} {index === 5 || index === 6 ? '' : dates[index]}
							</S.TableHeadText>
						))}
					<S.TableHeadText variant='caption-1'>итого</S.TableHeadText>
				</S.TableHead>

				<S.TableRowTotal>
					<S.TableRowTotalCell>
						<S.TableRowTotalText variant='body-strong-2' attributes={{ style: { fontSize: '14px' } }}>
							Общее по задачам
						</S.TableRowTotalText>
					</S.TableRowTotalCell>
					{Object.entries(myWorkSchedule.total_time_by_date.list).map(
						([date, { is_less_time, is_ready_to_work, is_workDay, time, time_in_minute }]) => (
							<S.TableRowTotalCell key={date} isWeekend={!is_workDay}>
								{time_in_minute === 480 ? (
									<Icon size={4} svg={<SvgComponent name='check-fill' />} />
								) : (
									<S.TableRowTotalText
										variant='body-strong-2'
										color={!is_ready_to_work ? 'neutral-faded' : is_less_time ? 'critical' : 'neutral'}
									>
										{!is_ready_to_work ? 'Off' : time == null && is_workDay ? '00:00' : time}
									</S.TableRowTotalText>
								)}
							</S.TableRowTotalCell>
						)
					)}
					<S.TableRowTotalCell>
						<S.TableRowTotalText
							variant='body-strong-2'
							color={myWorkSchedule.total_time_by_date.is_less_time ? 'critical' : 'neutral'}
						>
							{myWorkSchedule.total_time_by_date.sum_time_all}
						</S.TableRowTotalText>
					</S.TableRowTotalCell>
				</S.TableRowTotal>

				{Object.entries(myWorkSchedule.projects).map(([projectName, projectData]) => (
					<ScheduleItem
						key={projectName}
						projectName={projectName}
						projectData={projectData}
						setActiveTaskData={setActiveTaskData}
					/>
				))}

				{activeTaskModal && myWorkProject && myWorkProjectIssues && (
					<TaskModal
						active={activeTaskModal}
						deactivate={handleTaskModalClose}
						dataProject={myWorkProject}
						tasksData={myWorkProjectIssues}
					/>
				)}
			</>
		);
	}
	return <>{dates && <ScheduleEmpty dates={dates} />}</>;
};
