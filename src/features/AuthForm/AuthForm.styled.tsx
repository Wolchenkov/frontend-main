import { Button, Divider } from 'reshaped/bundle';
import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 36px;
`;
export const MainContainer = styled.main`
	display: flex;
	justify-content: center;
	flex-direction: column;
	width: 360px;
	text-align: center;
	margin: 96px auto 0 auto;
`;

export const ButtonMail = styled(Button)`
	margin-top: 20px;
	background-color: #0077FF !important;

	&:hover {
		background: #0077FF !important;
	}
`;

export const MyDivider = styled(Divider)`
	margin: 20px 0;
`;
