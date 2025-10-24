import { Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const MyText500 = styled(Text)`
	letter-spacing: -0.01em;
	font-weight: 500;
	line-height: 20px;
`;

export const Row = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0px 20px 0px 48px;
	background-color: #f4f5f7;
`;

export const TypeWorkNameContainer = styled.div`
	display: flex;
	padding: 12px 0px 12px 4px;
	align-items: center;
	gap: 8px;
	width: 273px;
`;

export const ActualTimeContainer = styled.div`
	width: 126px;
	display: flex;
	padding: 12px 8px;
	justify-content: center;
	align-items: center;
`;

export const FlexEndContainer = styled.div`
	width: 126px;
	display: flex;
	padding: 12px 8px;
	justify-content: end;
	align-items: center;
`;

export const IssuesContainer = styled.div<{ active: boolean }>`
	overflow: hidden;
	max-height: ${(props) => (props.active ? '1000vh' : 0)};
	transition: ${(props) => (props.active ? 'max-height 0.5s ease-in-out' : 'max-height 0.5s cubic-bezier(0, 1, 0, 1)')};
`;

export const IssueRow = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 20px 0 72px;
`;

export const IssueName = styled.div`
	padding: 12px 8px;
	align-items: center;
	width: 249px;
`;
