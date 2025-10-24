import { FC } from 'react';
import { Text } from 'reshaped/bundle';
import * as S from './Footer.styled';

export const Footer: FC = () => {
	return (
		<S.StyledFooter>
			<S.MyText color='neutral-faded' variant='caption-1'>
				Если у вас возникли проблемы со входом в таск-трекер, напишите нам —{' '}
				<Text
					as='span'
					color='primary'
					variant='caption-1'
					attributes={{ style: { fontWeight: '500', letterSpacing: '-0.01em' } }}
				>
					<a style={{ textDecoration: 'none' }} href='mailto:support@brave.ru'>
						support@brave.ru
					</a>
				</Text>
			</S.MyText>
		</S.StyledFooter>
	);
};
