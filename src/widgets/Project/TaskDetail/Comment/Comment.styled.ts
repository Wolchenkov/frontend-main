import { Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	width: 560px;
	padding: 20px;
	flex-direction: column;
	align-items: flex-start;
	gap: 20px;
	border-radius: 8px;
	background: var(--background-neutral-faded, #f4f5f7);
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
	width: 100%;
`;

export const LeftSideHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const RightSideHeader = styled.div`
	width: 40px;
	display: flex;
	gap: 8px;
`;

export const FilesWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 4px;
	margin: 4px 0;
`;

export const TextLowPriority600 = styled(Text)`
	font-weight: 600;
	color: #898b8f;
`;
