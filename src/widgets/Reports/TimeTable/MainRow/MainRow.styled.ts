import { Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const Row = styled.div`
	display: flex;
	// width: 1150px;
	padding: 0px 20px 0px 18px;
	justify-content: space-between;
	align-items: center;
`;

export const UserNameContainer = styled.div`
	display: flex;
	width: 200px;
	padding: 10px 8px;
	align-items: center;
	gap: 8px;
`;
export const TeamNameContainer = styled.div`
	display: flex;
	width: 160px;
	padding: 12px 8px;
	align-items: center;
`;

export const TimeData = styled.div`
	width: 519px;
	display: flex;
	align-items: flex-start;
	gap: 1px;
`;

export const TimeRecord = styled.div<{ isWorkDay: boolean }>`
	display: flex;
	width: 64px;
	height: 44px;
	padding: 10px;
	justify-content: center;
	align-items: center;
	background: ${({ isWorkDay }) =>
		isWorkDay ? 'none' : 'repeating-linear-gradient(315deg, #D9D9D9, #D9D9D9 1px, transparent 1px, transparent 6px)'};
`;

export const ProjectRow = styled.div<{ isProject?: boolean }>`
	display: flex;
	// width: 1150px;
	padding: 0 20px;
	justify-content: space-between;
	align-items: center;
	background-color: ${({ isProject }) => (isProject ? '#f4f5f7' : 'transparent')};
`;

export const ProjectsReportsList = styled.div<{ active: boolean }>`
	overflow: hidden;
	max-height: ${(props) => (props.active ? '1000vh' : 0)};
	transition: ${(props) => (props.active ? 'max-height 1s ease-in-out' : 'max-height 0.5s cubic-bezier(0, 1, 0, 1)')};
`;

export const MyText500 = styled(Text)`
	letter-spacing: -0.01em;
	font-weight: 500;
`;
export const MyText700 = styled(Text)`
	letter-spacing: -0.01em;
	font-weight: 700;
`;
