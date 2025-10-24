import { Avatar, Modal, Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const MyModal = styled(Modal)`
	width: 100vw;
	height: 100vh;
	max-width: 100vw;
	margin: auto;
	border-radius: 0;
`;

export const Header = styled.div`
	height: 64px;
	padding: 12px 20px;
	background: #14171f;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const RightSide = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 12px;
`;

export const TextLowPriority = styled(Text)`
	color: #898b8f;
	letter-spacing: -0.01em;
	font-weight: 500;
`;

export const Main = styled.div`
	height: calc(100vh - 64px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;
`;

export const MyAvatar = styled(Avatar)`
	span {
		display: block;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;
