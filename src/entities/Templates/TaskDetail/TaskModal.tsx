import * as S from './TaskModal.styled';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { Loader, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { TaskSummary } from './Summary/TaskSummary';
import { ChildTask } from './ChildTask/ChildTask';
import { ParentTask } from './ParentTask/ParentTask';
import { useTaskModalController } from './TaskModalController';
import { File } from './File/File';

const Editor = dynamic(() => import('../../../shared/ui/Editor/Editor'), {
	ssr: false,
});

interface TaskModalProps {
	active: boolean;
	deactivate: () => void;
	dataProject: IOneProject;
	projectSlug: string;
	modalId: number | undefined;
	isUserTeamTemplate: boolean;
}

export const TaskModal: FC<TaskModalProps> = ({
	active,
	deactivate,
	dataProject,
	projectSlug,
	modalId,
	isUserTeamTemplate,
}) => {
	const {
		taskState,
		setTaskState,
		refetchTaskData,
		description,
		setDescription,
		isLoading,
		isLoadingUser,
		sortedChildren,
		name,
		setName,
		isClientRole,
		isMemberRole,
		setActiveModal,
	} = useTaskModalController({ projectSlug, modalId });

	return (
		<S.TaskModal size='905px' active={active} position='end' onClose={deactivate}>
			{!isLoading && !isLoadingUser && taskState ? (
				<S.TaskModalWrapper>
					<S.TaskModalMainContent>
						<S.NameInput
							name='name'
							value={name}
							placeholder='Название задачи'
							inputAttributes={{
								autoComplete: 'off',
								spellCheck: 'false',
								readOnly: !isClientRole && isUserTeamTemplate ? false : true,
							}}
							onChange={(arg) => setName(arg.value)}
						/>

						{description !== undefined && (
							<Editor
								data={description}
								onChange={setDescription}
								placeholder={'Описание задачи'}
								tools={['underline']}
								id='editor-description'
								readOnly={isClientRole || !isUserTeamTemplate}
							/>
						)}

						<S.FilesWrapper>
							{taskState &&
								taskState.attachment.map((attachment: IFileInTask) => (
									<File
										key={attachment.uuid}
										attachment={attachment}
										taskState={taskState}
										refetchTaskData={refetchTaskData}
										canDelete={isClientRole || !isUserTeamTemplate}
										projectSlug={projectSlug}
									/>
								))}
						</S.FilesWrapper>

						{taskState.parent ? <ParentTask taskState={taskState} setActiveModal={setActiveModal} /> : <></>}

						{sortedChildren?.length ? (
							<>
								<Text
									variant='caption-1'
									color='neutral-faded'
									attributes={{ style: { fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 8 } }}
								>
									Подзадачи
								</Text>
								{sortedChildren.map((child) => (
									<ChildTask
										key={child.id}
										child={child}
										refetchTaskData={refetchTaskData}
										setActiveModal={setActiveModal}
									/>
								))}
							</>
						) : (
							<></>
						)}
					</S.TaskModalMainContent>

					<S.TaskModalSummaryContent>
						<S.TaskModalOptions>
							<SvgComponent
								name='close-line-modal'
								onClick={deactivate}
								style={{ cursor: 'pointer', pointerEvents: 'all' }}
							/>
						</S.TaskModalOptions>
						<TaskSummary
							taskState={taskState}
							setTaskState={setTaskState}
							dataProject={dataProject}
							refetchTaskData={refetchTaskData}
							isClientRole={isClientRole}
							isMemberRole={isMemberRole}
							isUserTeamTemplate={isUserTeamTemplate}
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
