import * as S from './StageTitle.styled';
import { FC, useState } from 'react';
import { Badge, Text } from 'reshaped/bundle';
import { StageMenu } from '../StageMenu/StageMenu';

interface IStageTitleProps {
	id: number;
	name: string;
	issues: ITask[];
	stages: string[];
	projectSlug?: string;
	isTemplate?: boolean;
	isMenuShown?: boolean;
}

export const StageTitle: FC<IStageTitleProps> = ({
	id,
	name,
	issues,
	stages,
	projectSlug,
	isTemplate,
	isMenuShown,
}) => {
	const [isTitleHovered, setIsTitleHovered] = useState(false);

	return (
		<S.StageTitle
			direction='row'
			align='center'
			gap={1}
			attributes={{
				onMouseEnter: () => setIsTitleHovered(true),
				onMouseLeave: () => setIsTitleHovered(false),
			}}
			isTemplate={isTemplate}
		>
			<Text variant='body-2' attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}>
				{name}
			</Text>
			<Badge color='primary' size='small' variant='faded'>
				{issues.length}
			</Badge>
			{(isMenuShown === undefined || isMenuShown === true) && (
				<StageMenu id={id} name={name} isVisible={isTitleHovered} stages={stages} projectSlug={projectSlug} />
			)}
		</S.StageTitle>
	);
};
