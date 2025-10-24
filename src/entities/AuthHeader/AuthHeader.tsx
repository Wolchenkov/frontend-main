import { FC } from 'react';
import { Icon } from 'reshaped/bundle';
import { SvgComponent } from '../../shared';
import * as S from './AuthHeader.styled';

interface IAuthHeaderProps {
	svgName: string;
	marginBottom: number;
	text: string;
}

export const AuthHeader: FC<IAuthHeaderProps> = ({ svgName, marginBottom, text }) => {
	return (
		<>
			<Icon size={12} svg={<SvgComponent name={svgName} />} attributes={{ style: { marginBottom: 16 } }} />
			<S.MyText variant='featured-2' margin={marginBottom}>
				{text}
			</S.MyText>
		</>
	);
};
