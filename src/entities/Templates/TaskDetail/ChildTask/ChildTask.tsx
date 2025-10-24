import React, { Dispatch, FC, SetStateAction } from 'react';
import { SvgComponent } from '../../../../shared';
import * as S from './ChildTask.styled';

interface IChildTaskProps {
	child: ITaskInTask;
	refetchTaskData: any;
	setActiveModal: Dispatch<SetStateAction<number | undefined>>;
}

export const ChildTask: FC<IChildTaskProps> = ({ child, setActiveModal }) => {
	return (
		<S.ChildRow>
			<SvgComponent name='git-merge-fill-rotated' />
			<div onClick={() => setActiveModal(child.id)}>
				<S.ChildRowText variant='caption-1'>{child.name}</S.ChildRowText>
			</div>
		</S.ChildRow>
	);
};
