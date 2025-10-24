import { FC } from 'react';
import { Modal, View, Text, Divider, Button } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { CustomTextArea } from '../../CustomTextArea/CustomTextArea';
import { useAddTimeCommentController } from './AddTimeCommentController';

interface IAddTimeCommentProps {
	active: boolean;
	onClose: () => void;
	size: string;
	projectIssue: { id: number; name: string };
	timeRecordId: number;
	userId: number;
}

export const AddTimeComment: FC<IAddTimeCommentProps> = ({
	active,
	onClose,
	size,
	projectIssue,
	timeRecordId,
	userId,
}) => {
	const { comment, setComment, sendComment } = useAddTimeCommentController({
		onClose,
		timeRecordId,
		userId,
		active,
	});

	return (
		<Modal size={size} active={active} onClose={onClose} padding={0}>
			<View padding={4} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
				<Modal.Title>
					<Text variant='body-medium-2'>Комментарий по задаче {projectIssue.name}</Text>
				</Modal.Title>
				<SvgComponent name='close-line-modal' style={{ cursor: 'pointer', pointerEvents: 'all' }} onClick={onClose} />
			</View>
			<Divider />
			<div style={{ padding: '16px' }}>
				<CustomTextArea
					placeholder='Комментарий по треку времени'
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					style={{ minHeight: '64px' }}
				/>
			</div>
			<Divider />
			<View direction='row' align='center' padding={4} attributes={{ style: { justifyContent: 'flex-end' } }}>
				<Button onClick={sendComment} color='primary' size='small' disabled={!comment}>
					Отправить
				</Button>
			</View>
		</Modal>
	);
};
