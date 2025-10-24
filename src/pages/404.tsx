import React from 'react';
import styled from 'styled-components';
import { SvgComponent } from '../shared';
import { Link, Text } from 'reshaped/bundle';
import { useGetUserQuery } from '../store/auth/authApi';
import { UserRole } from '../shared/utility/Constants/userRole';

const Wrapper = styled.div`
	height: 100vh;
	width: calc(100vw - 250px);
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Conatner = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
`;
const LinkContainer = styled.div`
	display: flex;
	gap: 4px;
	margin-top: 4px;
`;
const TextLS002 = styled(Text)`
	letter-spacing: -0.02em;
`;
const LinkLS002 = styled(Link)`
	letter-spacing: -0.02em;
`;

export default function Custom404() {
	const { data: user } = useGetUserQuery();

	return (
		<Wrapper>
			<Conatner>
				<SvgComponent name='404' />
				<TextLS002 variant='title-3'>Страница не найдена</TextLS002>
				{user?.role?.name !== UserRole.CLIENT ? (
					<LinkContainer>
						<TextLS002 variant='body-2' color='neutral-faded'>
							Перейти к
						</TextLS002>
						<LinkLS002 href='/my-work' color='inherit'>
							моей работе
						</LinkLS002>
					</LinkContainer>
				) : (
					<></>
				)}
			</Conatner>
		</Wrapper>
	);
}
