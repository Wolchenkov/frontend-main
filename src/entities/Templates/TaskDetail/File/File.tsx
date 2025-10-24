import { FC } from 'react';
import * as S from './File.styled';
import { SvgComponent } from '../../../../shared';
import { Text, useToggle } from 'reshaped/bundle';
import { ConfirmModal } from '../../../../entities';
import { useUpdateIssueMutation } from '../../../../store/projects/projectsApi';
import { fileTypes } from '../../../../shared/utility/Constants/fileTypes';
import { formatFileSize } from '../../../../shared/utility/Utils';
import { useShowToast } from '../../../../shared/utility/Hooks';
import FileDetailModal from '../../../../entities/Modal/FileDetailModal/FileDetailModal';

interface IFileProps {
	attachment: IFileInTask;
	taskState: ITaskDetail;
	refetchTaskData: any;
	canDelete: boolean;
	projectSlug: string;
}

export const File: FC<IFileProps> = ({ attachment, taskState, refetchTaskData, canDelete, projectSlug }) => {
	const [updateIssue] = useUpdateIssueMutation();
	const showToast = useShowToast();

	//удаление файла из задачи
	const {
		active: isActiveConfirmModal,
		activate: activateConfirmModal,
		deactivate: deactivateConfirmModal,
	} = useToggle();

	function delFile(uuid: string) {
		const body = {
			attachment: taskState.attachment
				.map((attachment) => ({ uuid: attachment.uuid }))
				.filter((el) => el.uuid !== uuid),
		};
		const payload = { projectSlug, body, projectIssueId: taskState.id };
		updateIssue(payload).then(() => {
			refetchTaskData();
			deactivateConfirmModal();
			showToast('Файл успешно удален');
		});
	}

	const { active: isActiveDetailModal, activate: activateDetailModal, deactivate: deactivateDetailModal } = useToggle();

	return (
		<>
			<S.File onClick={activateDetailModal}>
				<SvgComponent name={fileTypes[attachment.extension] || 'sticky-note'} />
				<Text variant='caption-1' attributes={{ style: { fontWeight: 500, letterSpacing: '-0.01em' } }}>
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
					<div
						onClick={(e) => {
							e.stopPropagation();
							activateConfirmModal();
						}}
						style={{ width: '16px', display: 'flex', alignItems: 'center' }}
					>
						<SvgComponent name='close-line' style={{ cursor: 'pointer', pointerEvents: 'all' }} />
					</div>
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
