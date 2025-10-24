import { Badge, Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const Container = styled.div`
	width: 567px;
	padding: 20px;
	position: fixed;
	top: 0;
	left: 250px;
	background: #fff;
	z-index: 101;
	height: 100vh;

	overflow-y: auto;
	&::-webkit-scrollbar-track {
		background-color: transparent;
	}
	&::-webkit-scrollbar {
		width: 3px;
		background-color: transparent;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #cfd0d3;
		border-radius: 8px;
	}
`;

export const Overlay = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 817px; /* 250px сайдбар + 567px див с уведомлениями */
	right: 0;
	background: var(--foreground-neutral, #14171f);
	opacity: 0.5;
	z-index: 100;
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24px;
`;

export const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const OneDay = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const Notification = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 16px;
	background: #f8f8f8;
	border-radius: 6px;
	white-space: nowrap;
`;

export const NotificationHeader = styled.div<{ label: string | null }>`
	display: flex;
	flex-direction: ${({ label }) => (label ? 'row' : 'row-reverse')};
	justify-content: space-between;
`;

export const NotificationFooter = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
`;

export const TextLS002 = styled(Text)`
	letter-spacing: -0.02em;
`;

export const TextDisabled = styled(Text)`
	font-weight: 600;
	color: #898b8f;
`;

export const TruncatedText = styled(TextLS002)`
	overflow: hidden;
	text-overflow: ellipsis;
	text-decoration: none !important;
	white-space: nowrap;
`;

export const MyBadge = styled(Badge)`
	display: flex;
	align-items: center;
	gap: 4px;
`;

export const NewNotificationBadge = styled(Badge)`
	border-color: unset;
	height: 8px;
	min-width: 8px;
`;
