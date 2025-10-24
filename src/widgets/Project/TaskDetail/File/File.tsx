import { FC } from 'react';
import * as S from './File.styled';
import { SvgComponent } from '../../../../shared';
import { Icon, Text, useToggle } from 'reshaped/bundle';
import { ConfirmModal } from '../../../../entities';
import { useRouter } from 'next/router';
import { useUpdateCommentInTaskMutation, useUpdateIssueMutation } from '../../../../store/projects/projectsApi';
import { fileTypes } from '../../../../shared/utility/Constants/fileTypes';
import { formatFileSize } from '../../../../shared/utility/Utils';
import { useShowToast } from '../../../../shared/utility/Hooks';
import FileDetailModal from '../../../../entities/Modal/FileDetailModal/FileDetailModal';
interface IFileProps {
	attachment: IFileInTask;
	taskState: ITaskDetail;
	comment?: IComment;
	refetchTaskData: any;
	canDelete: boolean;
	projectSlugData?: string;
}

export const File: FC<IFileProps> = ({
	attachment,
	taskState,
	refetchTaskData,
	canDelete,
	comment,
	projectSlugData,
}) => {
	const [updateIssue] = useUpdateIssueMutation();
	const [updateComment] = useUpdateCommentInTaskMutation();
	const router = useRouter();
	const { slug: projectSlug } = router.query;
	const showToast = useShowToast();

	//удаление файла из задачи
	const {
		active: isActiveConfirmModal,
		activate: activateConfirmModal,
		deactivate: deactivateConfirmModal,
	} = useToggle();

	function delFile(uuid: string) {
		if (comment) {
			const body = {
				attachment: comment.files.map((attachment) => ({ uuid: attachment.uuid })).filter((el) => el.uuid !== uuid),
			};
			const payload = {
				projectSlug: projectSlugData ?? projectSlug,
				body,
				issueId: taskState.id,
				commentId: comment.id,
			};
			updateComment(payload).then(() => {
				refetchTaskData();
				deactivateConfirmModal();
				showToast('Файл успешно удален');
			});
		} else {
			const body = {
				attachment: taskState.attachment
					.map((attachment) => ({ uuid: attachment.uuid }))
					.filter((el) => el.uuid !== uuid),
			};
			const payload = { projectSlug: projectSlugData ?? projectSlug, body, projectIssueId: taskState.id };
			updateIssue(payload).then(() => {
				refetchTaskData();
				deactivateConfirmModal();
				showToast('Файл успешно удален');
			});
		}
	}

	const { active: isActiveDetailModal, activate: activateDetailModal, deactivate: deactivateDetailModal } = useToggle();

	return (
		<>
			<S.File inComment={comment && comment.files.length > 0} onClick={activateDetailModal}>
				<Icon svg={<SvgComponent name={fileTypes[attachment.extension] || 'sticky-note'} />} size={4} />
				<Text
					variant='caption-1'
					attributes={{
						style: { fontWeight: 500, letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis' },
					}}
				>
					{attachment.file_name}
				</Text>
				<Text
					variant='caption-1'
					color='neutral-faded'
					attributes={{ style: { fontWeight: 500, letterSpacing: '-0.01em', marginRight: 8 } }}
				>
					{formatFileSize(attachment.size)}
				</Text>
				{!canDelete && (
					<S.DeleteIcon
						onClick={(e) => {
							e.stopPropagation();
							activateConfirmModal();
						}}
					>
						<SvgComponent name='close-line' />
					</S.DeleteIcon>
				)}
			</S.File>
			<ConfirmModal
				active={isActiveConfirmModal}
				deactivate={deactivateConfirmModal}
				text='Вы действительно хотите удалить файл?'
				confirmDel={() => delFile(attachment.uuid)}
			/>
			<FileDetailModal active={isActiveDetailModal} deactivate={deactivateDetailModal} attachment={attachment} />
		</>
	);
};
