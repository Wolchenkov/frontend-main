import React, { FC, useEffect, useRef, useState } from 'react';
import { Actionable, Button, Divider, DropdownMenu, Icon, Modal, View, useToggle } from 'reshaped/bundle';

import { SvgComponent } from '../../../shared';

import * as S from './AddNewTaskModal.styled';
import { PillPerson } from '../../Pills/PillPerson/PillPerson';
import { PillMultiPerson } from '../../Pills/PillMultiPerson/PillMultiPerson';
import {
	useGetCurrentProjectTypeWorkQuery,
	useGetIssuePrioritiesQuery,
} from '../../../store/dictionaries/dictionariesApi';
// eslint-disable-next-line import/no-restricted-paths
import { FilterCalendar } from '../../../widgets/Project/ProjectFilter/FilterCalendar/FilterCalendar';
import { convertTimeToMinutes, formatMinutesToHours, formatMinutesToHours00 } from '../../../shared/utility/Utils';
import { useCreateIssueMutation } from '../../../store/projects/projectsApi';

interface IAddNewTaskProps {
	active: boolean;
	onClose: () => void;
	dataProject: IOneProject;
	kanbanId?: number;
	parentId?: number;
	refetchTaskData?: any;
}

export const AddNewTaskModal: FC<IAddNewTaskProps> = ({
	active,
	onClose,
	dataProject,
	kanbanId,
	parentId,
	refetchTaskData,
}) => {
	const inputRef = useRef<HTMLInputElement>(null); // ссылка на инпут
	const projectSlug = dataProject.slug;

	const { data: priorities = [] } = useGetIssuePrioritiesQuery();
	const {
		active: isDropdownPriorityActive,
		activate: activateDropdownPriority,
		deactivate: deactivateDropdownPriority,
	} = useToggle(false); // приоритет

	const {
		active: isDropdownEstimateActive,
		activate: activateDropdownEstimate,
		deactivate: deactivateDropdownEstimate,
	} = useToggle(false); // оценка
	const { active: activeTypework, activate, deactivate } = useToggle(false); // дропдаун для типов работ

	const {
		active: isDropdownKanbanActive,
		activate: activateDropdownKanban,
		deactivate: deactivateDropdownKanban,
	} = useToggle(false); // дропдаун для канбан доски

	const { data: typesWork } = useGetCurrentProjectTypeWorkQuery(projectSlug);

	const [newTask, setNewTask] = useState<INewTaskState>({} as INewTaskState);

	useEffect(() => {
		if (active) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 100);
		}
	}, [active]);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setNewTask((prev) => ({ ...prev, name: e.target.value }));
	};

	// дата
	const formatDateToLocale = (date: string | undefined | null): string | null =>
		date ? new Date(date).toLocaleString('ru-RU').slice(0, 10) : null;

	function formatDate(date: string | null) {
		if (!date) return null;
		const dateParts = date.split('.');
		return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
	}

	const changeDate = (date: { date_start?: [string | null, string | null] | null }) => {
		const newStart = formatDate(formatDateToLocale(date.date_start?.[0]));
		const newDeadline = formatDate(formatDateToLocale(date.date_start?.[1]));

		if (newDeadline) {
			setNewTask((prev) => ({ ...prev, date_start: newStart, deadline: newDeadline }));
		} else {
			setNewTask((prev) => ({ ...prev, date_start: newStart, deadline: newStart }));
		}
	};

	// тип работ
	const [inputTimeValue, setInputTimeValue] = useState(formatMinutesToHours00(newTask.estimate) || '');
	const [typeWork, setTypeWork] = useState<fetchingTypeWork | undefined>(
		typesWork?.find((typeWork) => typeWork.id === newTask?.type_work_id)
	);
	const checkInput = (value: string, index: number) => {
		switch (index) {
			case 0:
			case 1:
			case 4:
				return /[0-9]/.test(value);
			case 2:
				return value === ':';
			case 3:
				return /[0-5]/.test(value);
			default:
				return false;
		}
	};
	const handleInputChange = (args: any) => {
		let value = args.value.replace(/[^0-9:]/g, '');
		if (value.length > 5) value = value.slice(0, 5);
		// Добавление двоеточия после первых двух чисел
		if (value.length === 2 && value[2] !== ':') value = value + ':';
		// Проверка каждого символа
		for (let i = 0; i < value.length; i++) {
			if (!checkInput(value[i], i)) {
				value = value.substring(0, i) + value.substring(i + 1);
			}
		}
		setInputTimeValue(value);
	};

	const changeProjectData = (fieldName: string, fieldValue: any) => {
		setNewTask((prev) => ({
			...prev,
			[fieldName]: fieldValue,
		}));
	};

	function closeModal() {
		setNewTask({} as INewTaskState);
		deactivateDropdownEstimate();
		deactivateDropdownPriority();
		deactivate();
		onClose();
		setInputTimeValue('');
		setTypeWork(undefined);
	}

	const [createIssue] = useCreateIssueMutation();

	function createTask() {
		const body = {
			...newTask,
			project_issue_kanban_id: newTask.project_issue_kanban_id ?? (kanbanId ? kanbanId : dataProject.Kanban[0].id),
			project_issue_priority_id: newTask.project_issue_priority_id ? newTask.project_issue_priority_id : 1,
			parent_id: parentId ? parentId : null,
		};
		const payload = { projectSlug, body };
		createIssue(payload).then(() => {
			closeModal();
			refetchTaskData && refetchTaskData();
		});
	}
	return (
		<>
			<S.MyModal size='660px' active={active} onClose={closeModal} padding={0}>
				<View padding={4} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
					<Modal.Title>
						<S.MyText variant='body-medium-2'>Новая задача</S.MyText>
					</Modal.Title>
					<SvgComponent
						name='close-line-modal'
						style={{ cursor: 'pointer', pointerEvents: 'all' }}
						onClick={closeModal}
					/>
				</View>
				<Divider />
				<View padding={4}>
					<S.MyInput
						value={newTask.name || ''}
						ref={inputRef}
						placeholder='Название задачи'
						onChange={(e) => handleOnChange(e)}
					/>
					<S.PillsWrapper>
						<PillPerson
							name='delegate_id'
							title='Исполнитель'
							icon='user-add-faded'
							members={dataProject.usersMember}
							onChange={changeProjectData}
						/>
						<PillMultiPerson
							name='subscribers'
							value={undefined}
							onChange={changeProjectData}
							title='Подписчики'
							declinedTitles={['участник', 'участника', 'участников']}
							icon='user-search-faded'
							members={dataProject.usersMember}
						/>
						<DropdownMenu width='240px' active={isDropdownPriorityActive} onClose={deactivateDropdownPriority}>
							<DropdownMenu.Trigger>
								{(attributes) => (
									<S.PillButton
										{...attributes}
										variant='outline'
										size='small'
										startIcon={<SvgComponent name='alert-line-faded' />}
										active={isDropdownPriorityActive}
										onClick={() =>
											isDropdownPriorityActive ? deactivateDropdownPriority() : activateDropdownPriority()
										}
									>
										<S.MyText variant='caption-1'>
											{newTask.project_issue_priority_id
												? priorities.find((el) => el.id === newTask.project_issue_priority_id)?.priority
												: 'Приоритет'}
										</S.MyText>
									</S.PillButton>
								)}
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								{priorities.map((priority) => (
									<DropdownMenu.Item
										key={priority.id}
										endSlot={<S.PriorityBadge color={priority.color} size={3} />}
										attributes={{ style: { letterSpacing: '-0.02em' } }}
										onClick={() => setNewTask((prev) => ({ ...prev, project_issue_priority_id: priority.id }))}
									>
										{priority.priority}
									</DropdownMenu.Item>
								))}
							</DropdownMenu.Content>
						</DropdownMenu>

						<FilterCalendar value={null} onChange={changeDate} date={null} isCreateTask />

						<DropdownMenu
							width='320px'
							position='bottom-end'
							active={isDropdownEstimateActive}
							onClose={
								isDropdownEstimateActive
									? () => {
											setTypeWork(undefined);
											deactivateDropdownEstimate();
											setInputTimeValue('');
									  }
									: () => activateDropdownEstimate()
							}
						>
							<DropdownMenu.Trigger>
								{(attributes) => (
									<S.PillButton
										{...attributes}
										variant='outline'
										size='small'
										startIcon={<SvgComponent name='time-line-faded' />}
										active={isDropdownEstimateActive}
										onClick={
											isDropdownEstimateActive
												? () => {
														setTypeWork(undefined);
														deactivateDropdownEstimate();
														setInputTimeValue('');
												  }
												: () => activateDropdownEstimate()
										}
									>
										{newTask.estimate ? (
											<S.MyText variant='caption-1'>{formatMinutesToHours(newTask.estimate)}</S.MyText>
										) : (
											<S.MyText variant='caption-1'>Оценка</S.MyText>
										)}
									</S.PillButton>
								)}
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<View padding={4} direction='row' gap={2} width='320px'>
									<S.MyInputTime
										name='estimate'
										value={inputTimeValue}
										placeholder='00:00'
										onChange={(args) => {
											handleInputChange(args);
										}}
										startIcon={<SvgComponent name='time-line-16' />}
										inputAttributes={{ autoComplete: 'off' }}
									/>
									<DropdownMenu active={activeTypework} onClose={() => deactivate} width='148px' position='bottom-end'>
										<DropdownMenu.Trigger>
											{(attributes) => (
												<Actionable {...attributes} onClick={() => (activeTypework ? deactivate() : activate())}>
													<S.MyInputEstimate
														inputAttributes={{ autoComplete: 'off' }}
														value={typeWork?.type || 'Выберите тип работ'}
														active={activeTypework}
														name='typeWork'
														startIcon={<SvgComponent name='briefcase-line' />}
														endIcon={<SvgComponent name={activeTypework ? 'chevron-up' : 'chevron-down'} />}
													/>
												</Actionable>
											)}
										</DropdownMenu.Trigger>
										<DropdownMenu.Content>
											<S.PillDropdownMenuContentWrap>
												{typesWork?.map((type) => (
													<DropdownMenu.Item
														key={type.id}
														onClick={() => {
															setTypeWork(type);
															deactivate();
														}}
													>
														{type.type}
													</DropdownMenu.Item>
												))}
											</S.PillDropdownMenuContentWrap>
										</DropdownMenu.Content>
									</DropdownMenu>
									<View paddingTop={4} direction='row' justify='end' align='end' width='100%' gap={1}>
										<Button
											size='small'
											onClick={() => {
												setTypeWork(undefined);
												deactivateDropdownEstimate();
												setInputTimeValue('');
												deactivate();
											}}
										>
											Отменить
										</Button>
										<Button
											disabled={!typeWork || inputTimeValue.length !== 5}
											size='small'
											color='primary'
											onClick={() => {
												if (inputTimeValue) {
													setNewTask((prev) => ({
														...prev,
														type_work_id: typeWork?.id,
														estimate: convertTimeToMinutes(inputTimeValue),
													}));
												} else {
													setNewTask((prev) => ({
														...prev,
														type_work_id: null,
														estimate: null,
													}));
												}

												deactivateDropdownEstimate();
											}}
										>
											Сохранить
										</Button>
									</View>
								</View>
							</DropdownMenu.Content>
						</DropdownMenu>
						<DropdownMenu width='240px' active={isDropdownKanbanActive} onClose={deactivateDropdownKanban}>
							<DropdownMenu.Trigger>
								{(attributes) => (
									<S.PillButton
										{...attributes}
										variant='outline'
										size='small'
										startIcon={<SvgComponent name='flag-line-faded' />}
										active={isDropdownKanbanActive}
										onClick={() => (isDropdownKanbanActive ? deactivateDropdownKanban() : activateDropdownKanban())}
									>
										<S.MyText variant='caption-1'>
											{dataProject.Kanban.find((el) => el.id === (newTask.project_issue_kanban_id ?? kanbanId))?.name ||
												'Этап'}
										</S.MyText>
									</S.PillButton>
								)}
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								{dataProject.Kanban.map((kanban) => (
									<DropdownMenu.Item
										key={kanban.id}
										onClick={() => setNewTask((prev) => ({ ...prev, project_issue_kanban_id: kanban.id }))}
									>
										{kanban.name}
									</DropdownMenu.Item>
								))}
							</DropdownMenu.Content>
						</DropdownMenu>
					</S.PillsWrapper>
				</View>
				<Divider />

				<View direction='row' align='center' padding={4} attributes={{ style: { justifyContent: 'space-between' } }}>
					<div
						onClick={() =>
							setNewTask((prev) => ({ ...prev, hide_from_client: newTask.hide_from_client ? false : true }))
						}
						style={{ display: 'flex', alignItems: 'center' }}
					>
						<Icon
							svg={<SvgComponent name={`${newTask.hide_from_client ? 'checkbox-checked' : 'checkbox-default'}`} />}
							size={5}
							attributes={{ style: { marginRight: '8px' } }}
						/>
						<S.MyText variant='caption-1'>Скрыть от клиента</S.MyText>
					</div>
					<Button
						onClick={createTask}
						disabled={newTask?.name ? newTask?.name?.trim().length === 0 : true}
						color='primary'
						size='small'
					>
						Добавить
					</Button>
				</View>
			</S.MyModal>
		</>
	);
};
