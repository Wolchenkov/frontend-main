import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCommentTimeMutation } from '../../../store/projects/projectsApi';
import { useShowToast } from '../../../shared/utility/Hooks';

interface IAddTimeCommentControllerProps {
	onClose: () => void;
	timeRecordId: number;
	userId: number;
	active: boolean;
}

export const useAddTimeCommentController = ({
	onClose,
	timeRecordId,
	userId,
	active,
}: IAddTimeCommentControllerProps) => {
	const router = useRouter();
	const { slug } = router.query;
	const showToast = useShowToast();

	const [comment, setComment] = useState('');
	const [commentTime] = useCommentTimeMutation();

	useEffect(() => {
		active && setComment('');
	}, [active]);

	const sendComment = () => {
		const body = {
			text: {
				blocks: [{ id: 'time-comment', data: { text: comment }, type: 'paragraph' }],
				timestamp: Date.now(),
				version: '2.27.2',
			},
			mention: userId,
		};
		const payload = { projectSlug: slug, timeRecordId, body };

		commentTime(payload).then((response) => {
			if ('error' in response) {
				showToast(`Ошибка!`);
				return;
			}
			showToast(response.data.title, response.data.text);
			onClose();
		});
	};

	return {
		comment,
		setComment,
		sendComment,
	};
};
