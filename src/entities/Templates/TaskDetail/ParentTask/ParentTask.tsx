import { Dispatch, FC, SetStateAction } from 'react';
import { Divider, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../../shared';

interface IParentTaskProps {
	taskState: ITaskDetail;
	setActiveModal: Dispatch<SetStateAction<number | undefined>>;
}

export const ParentTask: FC<IParentTaskProps> = ({ taskState, setActiveModal }) => {
	return (
		<>
			{taskState.parent?.completed_on ? (
				<></>
			) : (
				<>
					<Divider attributes={{ style: { margin: '20px 0' } }} />

					<Text
						variant='caption-1'
						color='neutral-faded'
						attributes={{ style: { fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 8 } }}
					>
						Родительская задача
					</Text>

					<div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 0', marginBottom: 20 }}>
						<SvgComponent name='git-merge-fill' />
						<div onClick={() => setActiveModal(taskState.parent?.id)}>
							<Text
								variant='caption-1'
								attributes={{ style: { fontWeight: 500, letterSpacing: '-0.01em', cursor: 'pointer' } }}
							>
								{taskState.parent?.name}
							</Text>
						</div>
					</div>
				</>
			)}
		</>
	);
};
