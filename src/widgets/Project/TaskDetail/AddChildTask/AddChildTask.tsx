import React, { FC } from 'react';
import { Actionable, Button, Divider, DropdownMenu, Icon, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../../shared';
import { AddNewTaskModal } from '../../../../entities';
import * as S from './AddChildTask.styled';
import { useAddChildTaskController } from './AddChildTaskController';

interface AddChildTaskProps {
	refetchTaskData: any;
	taskState: ITaskDetail;
	tasksData: ITask[] | undefined;
	dataProject: IOneProject;
}

export const AddChildTask: FC<AddChildTaskProps> = ({ refetchTaskData, taskState, tasksData, dataProject }) => {
	const {
		isActiveDropdown,
		deactivateDropdown,
		activateDropdown,
		activateAddTaskModal,
		isActiveTasksDropdown,
		deactivateTasksDropdown,
		activateTasksDropdown,
		filter,
		setFilter,
		shownOptions,
		selectedOption,
		setSelectedOption,
		isActiveAddTaskModal,
		deactivateAddTaskModal,
	} = useAddChildTaskController({ refetchTaskData, taskState, tasksData, dataProject });
	return (
		<>
			<DropdownMenu width='400px' active={isActiveDropdown} onClose={deactivateDropdown} forcePosition>
				<DropdownMenu.Trigger>
					{(attributes) => (
						<Actionable {...attributes} onClick={() => (isActiveDropdown ? deactivateDropdown() : activateDropdown())}>
							<S.AddFileContainer>
								<SvgComponent name='add' />
								<S.MyText variant='caption-1' color='neutral-faded'>
									Добавить подзадачу
								</S.MyText>
							</S.AddFileContainer>
						</Actionable>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Section>
						<DropdownMenu.Item onClick={activateAddTaskModal}>Создать подзадачу</DropdownMenu.Item>
					</DropdownMenu.Section>
					<DropdownMenu.Section>
						<DropdownMenu
							width='400px'
							position='bottom-end'
							active={isActiveTasksDropdown}
							onClose={deactivateTasksDropdown}
							forcePosition
						>
							<DropdownMenu.Trigger>
								{(attributes) => (
									<Button
										{...attributes}
										onClick={() => (isActiveTasksDropdown ? deactivateTasksDropdown() : activateTasksDropdown())}
										fullWidth
										attributes={{ style: { display: 'flex', justifyContent: 'space-between' } }}
										variant='ghost'
										endIcon={<SvgComponent name={isActiveTasksDropdown ? 'chevron-up' : 'chevron-down'} />}
									>
										<Text align='start'>Выбрать из списка</Text>
									</Button>
								)}
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<S.PillInput
									size='medium'
									name='project-id'
									placeholder='Поиск...'
									value={filter}
									onChange={({ value }) => setFilter(value)}
									inputAttributes={{ autoComplete: 'off' }}
								/>
								<Divider />
								<S.PillDropdownMenuContentWrap>
									{(shownOptions as ITask[]).map((issue) => (
										<DropdownMenu.Item
											key={issue.id}
											attributes={{
												style: {
													marginTop: '4px',
													background: `${selectedOption && selectedOption.id === issue.id ? '#E9E9EB' : ''}`,
												},
											}}
											onClick={() => setSelectedOption(issue)}
										>
											<S.PillDropdownItemContent>
												<S.PillDropdownItemText variant='body-2'>{issue.name}</S.PillDropdownItemText>
												{selectedOption && selectedOption.id === issue.id && (
													<Icon
														size={4}
														svg={<SvgComponent name='check-fill' />}
														attributes={{
															style: {
																flexShrink: 0,
																position: 'absolute',
																top: '50%',
																right: '0',
																transform: 'translateY(-50%)',
															},
														}}
													/>
												)}
											</S.PillDropdownItemContent>
										</DropdownMenu.Item>
									))}
								</S.PillDropdownMenuContentWrap>
							</DropdownMenu.Content>
						</DropdownMenu>
					</DropdownMenu.Section>
				</DropdownMenu.Content>
			</DropdownMenu>
			<AddNewTaskModal
				active={isActiveAddTaskModal}
				onClose={deactivateAddTaskModal}
				dataProject={dataProject}
				parentId={taskState.id}
				refetchTaskData={refetchTaskData}
				kanbanId={taskState.project_issue_kanban_id}
			/>
		</>
	);
};
