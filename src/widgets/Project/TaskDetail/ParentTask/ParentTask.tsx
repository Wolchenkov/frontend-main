import { FC } from 'react';
import { Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../../shared';
import Link from 'next/link';
import { formatProjectDate } from '../../../../shared/utility/Utils';

export const ParentTask: FC<{ taskState: ITaskDetail; projectSlug: string }> = ({ taskState, projectSlug }) => {
	return (
		<>
			<Text
				variant='caption-1'
				color='neutral-faded'
				attributes={{ style: { fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 8 } }}
			>
				Родительская задача
			</Text>
			<div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 0', marginBottom: 20 }}>
				<SvgComponent name='git-merge-fill' />
				<Link href={`/project/${projectSlug}?modal=${taskState.parent?.id}`}>
					<div>
						<Text
							variant='caption-1'
							attributes={{ style: { fontWeight: 500, letterSpacing: '-0.01em', cursor: 'pointer' } }}
						>
							{taskState.parent?.name}
						</Text>
					</div>
				</Link>
				{taskState.parent?.date_start && (
					<Text
						variant='caption-1'
						color='neutral-faded'
						attributes={{ style: { fontWeight: 500, letterSpacing: '-0.01em' } }}
					>
						{formatProjectDate(taskState.parent?.date_start)}
					</Text>
				)}
			</div>
		</>
	);
};
