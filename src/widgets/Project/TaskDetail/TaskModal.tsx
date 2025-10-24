import * as S from './TaskModal.styled';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { Actionable, Button, Divider, DropdownMenu, Loader, Tabs, Text, Tooltip, useToggle } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { format } from 'date-fns';
import { Timer } from '../../../entities/Timer/Timer';
import { TaskSummary } from './Summary/TaskSummary';
import { ChildTask } from './ChildTask/ChildTask';
import { ParentTask } from './ParentTask/ParentTask';
import { AddChildTask } from './AddChildTask/AddChildTask';
import { COMMENT_TYPES, useTaskModalController } from './TaskModalController';
import { File } from './File/File';
import { ConfirmModal } from '../../../entities';
import { EditTrackedTimeModal } from '../../../entities/Modal/EditTrackedTime/EditTrackedTimeModal';
import { FileComment } from './File/FileComment';
import { formatMinutes } from '../../../shared/utility/Utils/formatTime';
import { areAllBlocksEmpty } from '../../../shared/utility/Utils/checkIsEditorBloksEmpty';
import { RenderComments } from './Comment/RenderComments';

const Editor = dynamic(() => import('../../../shared/ui/Editor/Editor'), {
	ssr: false,
});

interface TaskModalProps {
	active: boolean;
	deactivate: () => void;
	dataProject: IOneProject;
	tasksData: ITask[] | undefined;
}
export const TaskModal: FC<TaskModalProps> = ({ active, deactivate, dataProject, tasksData }) => {
	const {
		onClose,
		taskState,
		setTaskState,
		trackedTime,
		isBackendRunning,
		isDeletableTimer,
		setIsDeletableTimer,
		setIsBackendRunning,
		refetchTaskData,
		description,
		setDescription,
		changeStatus,
		isCompleted,
		isLoading,
		isLoadingUser,
		handleClick,
		handleFileChange,
		sortedChildren,
		handleDuplicateIssue,
		handleDeleteIssue,
		fileInput,
		isChildren,
		isModalConfirmActive,
		activateConfirmModal,
		deactivateConfirmModal,
		setCommentText,
		commentText,
		name,
		setName,
		textAreaRef,
		isClientRole,
		isMemberRole,
		refetchUser,
		handleCommentFileClick,
		fileCommentInput,
		handleFileCommentChange,
		fileComment,
		delFileComment,
		allMembers,
		onPublishComment,
		editorKey,
		tabValue,
		handleTabChange,
		hasFileComments,
		currentUser,
		descriptionKey,
	} = useTaskModalController({ deactivate, dataProject });

	const {
		active: activeEditTrackedTimeModal,
		activate: activateEditTrackedTimeModal,
		deactivate: deactivateEditTrackedTimeModal,
	} = useToggle(false);

	return (
		<S.TaskModal padding={0} size='905px' active={active} position='end' onClose={onClose}>
			{!isLoading && !isLoadingUser && taskState ? (
				<S.TaskModalWrapper>
					<S.TaskModalMainContent>
						<S.TaskModalTopInfo>
							<Text variant='caption-2' color='neutral-faded' attributes={{ style: { fontWeight: 600 } }}>
								{dataProject?.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</Text>
							<Text variant='caption-2' attributes={{ style: { fontWeight: 600, color: '#898B8F' } }}>
								{`${taskState.created_name}\u00A0\u00A0 Создано ${format(new Date(taskState.created_at), 'dd.MM.yy')}`}
							</Text>
						</S.TaskModalTopInfo>
						<Button
							disabled={isClientRole}
							startIcon={isCompleted ? undefined : <SvgComponent name='check-fill' />}
							variant={isCompleted ? 'solid' : 'outline'}
							attributes={{ style: { marginBottom: 36 } }}
							color={isCompleted ? 'positive' : 'white'}
							onClick={isChildren && !isCompleted ? () => activateConfirmModal() : () => changeStatus(taskState)}
						>
							<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
								{isCompleted ? 'Завершена' : 'Завершить'}
							</Text>
						</Button>
						<ConfirmModal
							active={isModalConfirmActive}
							deactivate={deactivateConfirmModal}
							confirmDel={() => changeStatus(taskState)}
							text='Вы не выполнили подзадачи. Все равно завершить эту задачу?'
						/>
						<div>
							<S.NameInput
								ref={textAreaRef}
								value={name}
								name='name'
								placeholder='Название задачи'
								spellCheck={false}
								autoComplete='off'
								onChange={!isClientRole ? (e) => setName(e.target.value) : undefined}
							/>
						</div>
						<Editor
							key={descriptionKey}
							data={description}
							onChange={setDescription}
							placeholder={'Описание задачи'}
							tools={['underline']}
							id={`editor-description-${taskState.id}`}
							readOnly={isClientRole}
						/>
						<S.FilesWrapper>
							{taskState &&
								taskState.attachment.map((attachment) => (
									<File
										key={attachment.uuid}
										attachment={attachment}
										taskState={taskState}
										refetchTaskData={refetchTaskData}
										canDelete={isClientRole}
										projectSlugData={dataProject.slug}
									/>
								))}
						</S.FilesWrapper>
						{!isClientRole && (
							<S.ActionButtonContainer onClick={handleClick}>
								<SvgComponent name='attachment' />
								<Text
									variant='caption-1'
									color='neutral-faded'
									attributes={{ style: { fontWeight: 500, letterSpacing: '-0.01em' } }}
								>
									Прикрепить файл
								</Text>
								<input
									type='file'
									ref={fileInput}
									multiple
									style={{ display: 'none' }}
									onChange={handleFileChange}
									onClick={(e) => (e.currentTarget.value = '')}
								/>
							</S.ActionButtonContainer>
						)}
						<Divider attributes={{ style: { margin: '20px 0' } }} />
						{taskState.parent && <ParentTask taskState={taskState} projectSlug={dataProject.slug} />}
						{sortedChildren?.length ? (
							<Text
								variant='caption-1'
								color='neutral-faded'
								attributes={{ style: { fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 8 } }}
							>
								Подзадачи
							</Text>
						) : null}
						{sortedChildren &&
							sortedChildren?.map((child) => (
								<ChildTask
									key={child.id}
									child={child}
									setTaskState={setTaskState}
									dataProject={dataProject}
									refetchTaskData={refetchTaskData}
								/>
							))}
						{!isClientRole && (
							<AddChildTask
								refetchTaskData={refetchTaskData}
								taskState={taskState}
								tasksData={tasksData}
								dataProject={dataProject}
							/>
						)}
						<div id='editor-new-comment-container'>
							<S.GlobalStyle />
							{taskState.comments.length > 0 && <Divider attributes={{ style: { margin: '20px -20px' } }} />}

							{taskState && (
								<S.CommentsWrapper>
									{hasFileComments ? (
										<>
											<Tabs variant='pills' onChange={handleTabChange}>
												<Tabs.List>
													{COMMENT_TYPES.map((tab) => (
														<Tabs.Item key={tab.name} value={tab.name} icon={<SvgComponent name={tab.icon} />}>
															<Text variant='body-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
																{tab.text}
															</Text>
														</Tabs.Item>
													))}
												</Tabs.List>
											</Tabs>
											<RenderComments
												comments={taskState.comments}
												currentUser={currentUser}
												allMembers={allMembers}
												refetchTaskData={refetchTaskData}
												taskState={taskState}
												projectSlugData={dataProject.slug}
												tabName={tabValue.name}
											/>
										</>
									) : (
										<RenderComments
											comments={taskState.comments}
											currentUser={currentUser}
											allMembers={allMembers}
											refetchTaskData={refetchTaskData}
											taskState={taskState}
											projectSlugData={dataProject.slug}
											tabName='comment'
										/>
									)}
								</S.CommentsWrapper>
							)}

							<Divider attributes={{ style: { margin: '0 -20px 20px' } }} />

							{dataProject && ( // создание коммента
								<Editor
									key={editorKey}
									data={commentText}
									onChange={setCommentText}
									placeholder={'Напишите комментарий…'}
									tools={['list', 'underline', 'mention']}
									id='editor-new-comment'
									mentionValues={allMembers.map((user) => ({
										key: user.name,
										value: String(user.id),
										avatar: user.avatar,
									}))}
								/>
							)}
							<S.FilesWrapper>
								{fileComment?.map((file) => (
									<FileComment key={file.id} file={file} delFile={delFileComment} />
								))}
							</S.FilesWrapper>
							<S.ButtonsWrapper isFocusInComment={true}>
								<Button
									size='small'
									variant='ghost'
									color='white'
									startIcon={<SvgComponent name='attachment' />}
									onClick={handleCommentFileClick}
								/>
								<Button size='small' onClick={onPublishComment} disabled={areAllBlocksEmpty(commentText)}>
									Отправить
								</Button>
							</S.ButtonsWrapper>
							<input
								type='file'
								ref={fileCommentInput}
								multiple
								style={{ display: 'none' }}
								onChange={handleFileCommentChange}
								onClick={(e) => (e.currentTarget.value = '')}
							/>
						</div>
					</S.TaskModalMainContent>
					<S.TaskModalSummaryContent>
						<S.TaskModalOptions>
							{!isClientRole && (
								<DropdownMenu width='300px' position='bottom-end'>
									<DropdownMenu.Trigger>
										{(attributes) => (
											<Button
												{...attributes}
												attributes={{ style: { marginRight: '12px' } }}
												variant='ghost'
												size='small'
												startIcon={<SvgComponent name='more-fill' />}
											/>
										)}
									</DropdownMenu.Trigger>
									<DropdownMenu.Content>
										<DropdownMenu.Item
											endSlot={<SvgComponent name='file-copy' />}
											attributes={{ style: { letterSpacing: '-0.02em' } }}
											onClick={handleDuplicateIssue}
										>
											Дублировать
										</DropdownMenu.Item>
										<DropdownMenu.Item
											endSlot={<SvgComponent name='close-fill' />}
											attributes={{ style: { letterSpacing: '-0.02em' } }}
											onClick={handleDeleteIssue}
										>
											Удалить
										</DropdownMenu.Item>
									</DropdownMenu.Content>
								</DropdownMenu>
							)}
							<SvgComponent
								name='close-line-modal'
								onClick={onClose}
								style={{ cursor: 'pointer', pointerEvents: 'all' }}
							/>
						</S.TaskModalOptions>
						<S.TaskModalTimerWrapper>
							{!isClientRole && (
								<>
									<Timer
										trackedTime={trackedTime}
										setIsBackendRunning={setIsBackendRunning}
										isBackendRunning={isBackendRunning}
										isDeletableTimer={isDeletableTimer}
										setIsDeletableTimer={setIsDeletableTimer}
										refetchTaskData={refetchTaskData}
										refetchUser={refetchUser}
										projectBudgetType={taskState.project_type_budget}
									/>
									<Tooltip position='bottom-end' text='Общее время'>
										{(attributes) => (
											<Actionable attributes={attributes}>
												<S.TaskModalTrackedTime
													onClick={
														taskState.time_records.length > 0 && !isClientRole ? activateEditTrackedTimeModal : undefined
													}
												>
													{taskState.time_records.length > 0 ? formatMinutes(taskState.time_records.reduce((total, {time_amount}) => total + time_amount, 0)) + ' ч' : '00:00 ч'}
												</S.TaskModalTrackedTime>
											</Actionable>
										)}
									</Tooltip>
									{activeEditTrackedTimeModal && (
										<EditTrackedTimeModal
											taskState={taskState}
											refetchTaskData={refetchTaskData}
											active={activeEditTrackedTimeModal}
											deactivate={deactivateEditTrackedTimeModal}
										/>
									)}
								</>
							)}
						</S.TaskModalTimerWrapper>
						<TaskSummary
							taskState={taskState}
							setTaskState={setTaskState}
							dataProject={dataProject}
							refetchTaskData={refetchTaskData}
							isClientRole={isClientRole}
							isMemberRole={isMemberRole}
						/>
					</S.TaskModalSummaryContent>
				</S.TaskModalWrapper>
			) : (
				<S.LoaderContainer>
					<Loader size='medium' />
				</S.LoaderContainer>
			)}
		</S.TaskModal>
	);
};
