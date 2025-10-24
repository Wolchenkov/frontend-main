import React, { FC, useState } from 'react';
import * as S from './Comment.styled';
import { Actionable, Tooltip, useToggle } from 'reshaped/bundle';
import { formatDateInComment, getInitials } from '../../../../shared/utility/Utils';
import { AvatarCustom, SvgComponent } from '../../../../shared';
import dynamic from 'next/dynamic';
import { File } from '../File/File';
import { useDeleteCommentMutation, useUpdateCommentInTaskMutation } from '../../../../store/projects/projectsApi';
import { useRouter } from 'next/router';
import { getFilteredMentions } from '../TaskModalController';
import { ConfirmModal } from '../../../../entities';
import { areAllBlocksEmpty } from '../../../../shared/utility/Utils/checkIsEditorBloksEmpty';

const Editor = dynamic(() => import('../../../../shared/ui/Editor/Editor'), {
	ssr: false,
});

interface ICommentProps {
	comment: IComment;
	user: IMember;
	allMembers: IMember[];
	refetchTaskData: any;
	taskState: ITaskDetail;
	projectSlugData: string;
}

export const CommentComponent: FC<ICommentProps> = ({
	comment,
	user,
	allMembers,
	refetchTaskData,
	taskState,
	projectSlugData,
}) => {
	const router = useRouter();
	const { slug: projectSlug } = router.query;

	const { author, text: commentText, created_at, files, id, type } = comment;
	const { id: userId } = user;

	const [updateComment] = useUpdateCommentInTaskMutation();

	const [text, setText] = useState(commentText);

	const [isEditMode, setIsEditMode] = useState(false);

	function editComment() {
		if (!areAllBlocksEmpty(text)) {
			const mentions = getFilteredMentions(text, allMembers);
			const body = { text: text ? text : null, mentions };
			const payload = {
				projectSlug: projectSlugData ?? projectSlug,
				body,
				issueId: taskState.id,
				commentId: comment.id,
			};
			updateComment(payload).then(() => {
				refetchTaskData();
				setIsEditMode(false);
			});
		} else {
			setIsEditMode(false);
			setText(commentText);
		}
	}

	const [deleteComment] = useDeleteCommentMutation();
	function delComment() {
		const payload = { projectSlug: projectSlugData ?? projectSlug, issueId: taskState.id, commentId: comment.id };
		deleteComment(payload).then(() => {
			refetchTaskData();
			deactivateDeleteModal();
		});
	}

	const { active: isDeleteModalActive, activate: activateDeleteModal, deactivate: deactivateDeleteModal } = useToggle();
	return (
		<>
			<S.Container>
				<S.Header>
					<S.LeftSideHeader>
						<AvatarCustom color='positive' src={author.avatar || undefined} initials={getInitials(author.user)} size={6} />
						<S.TextLowPriority600 variant='caption-2'>{author.user}</S.TextLowPriority600>
						{type === 'commentTime' && (
							<>
								<SvgComponent name='ellipse' />
								<SvgComponent name='time-line-lowPriority' />
								<S.TextLowPriority600 variant='caption-2' attributes={{ style: { marginLeft: 4 } }}>
									Время
								</S.TextLowPriority600>
							</>
						)}
						<SvgComponent name='ellipse' />
						<S.TextLowPriority600 variant='caption-2'>{formatDateInComment(created_at)}</S.TextLowPriority600>
					</S.LeftSideHeader>
					{userId === author.id && type !== 'commentTime' && (
						<S.RightSideHeader>
							<Tooltip position='top' text={isEditMode ? 'завершить редактирование' : 'редактировать'}>
								{(attributes) => (
									<Actionable attributes={{ ...attributes, style: { display: 'flex', alignItems: 'center' } }}>
										<SvgComponent
											name={isEditMode ? 'check-fill' : 'pencil-line-faded'}
											style={{ cursor: 'pointer', pointerEvents: 'all' }}
											onClick={isEditMode ? editComment : () => setIsEditMode(true)}
										/>
									</Actionable>
								)}
							</Tooltip>
							<Tooltip position='top' text={'удалить'}>
								{(attributes) => (
									<Actionable attributes={{ ...attributes, style: { display: 'flex', alignItems: 'center' } }}>
										<SvgComponent
											style={{ cursor: 'pointer', pointerEvents: 'all' }}
											onClick={activateDeleteModal}
											name='close-line-gray'
										/>
									</Actionable>
								)}
							</Tooltip>
						</S.RightSideHeader>
					)}
				</S.Header>
				{isEditMode ? (
					<>
						<Editor
							data={text}
							onChange={setText}
							placeholder={'Напишите отредактированный комментарий…'}
							tools={['list', 'underline', 'mention']}
							id={`editor-edit-comment-${id}`}
							mentionValues={allMembers.map((user) => ({
								key: user.name,
								value: String(user.id),
								avatar: user.avatar,
							}))}
						/>
					</>
				) : (
					<Editor
						data={text}
						onChange={setText}
						tools={['list', 'underline', 'mention']}
						id={`editor-edit-comment-${id}-readOnly`}
						mentionValues={allMembers.map((user) => ({ key: user.name, value: String(user.id), avatar: user.avatar }))}
						readOnly
					/>
				)}
				{files.length > 0 && (
					<S.FilesWrapper>
						{files.map((file) => (
							<File
								key={file.uuid}
								attachment={file}
								comment={comment}
								refetchTaskData={refetchTaskData}
								canDelete={userId !== author.id}
								taskState={taskState}
								projectSlugData={projectSlugData}
							/>
						))}
					</S.FilesWrapper>
				)}
			</S.Container>
			<ConfirmModal
				active={isDeleteModalActive}
				deactivate={deactivateDeleteModal}
				confirmDel={delComment}
				text='Вы действительно хотите удалить комментарий?'
			/>
		</>
	);
};

CommentComponent.displayName = 'Comment';
export const Comment = React.memo(CommentComponent);
