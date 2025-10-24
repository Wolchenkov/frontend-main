import React, { FC } from 'react';
import * as S from './Empty.styled';
import { Avatar } from 'reshaped/bundle';
import { SvgComponent } from '../../../../shared';

export const ApprovalEmpty: FC = () => {
	return (
		<S.Empty>
			<Avatar squared={true} icon={<SvgComponent name='file-list' />} />
			<S.EmptyTitle variant='body-1'>За данный период заявлений не поступало</S.EmptyTitle>
		</S.Empty>
	);
};
