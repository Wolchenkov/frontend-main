import styled from 'styled-components';
import { Button, Text, View } from 'reshaped/bundle';

export const Title = styled(View)`
	display: inline-flex;
	margin: 0 8px 28px;
`;

export const Group = styled.div`
	margin-bottom: 32px;
`;

export const GroupName = styled.div`
	margin: 0 0 8px 12px;
	font-family: 'Inter', sans-serif;
	font-size: 10px;
	line-height: 24px;
	font-weight: 600;
	letter-spacing: -0.02em;
	text-transform: uppercase;
	color: #898b8f;
`;

export const GroupItem = styled.div<{ active?: boolean }>`
	padding: 8px 12px;
	border-radius: 6px;
	transition: background-color 0.3s ease;
	cursor: pointer;
	cursor: ${({ active }) => (active ? 'default' : 'pointer')};
	background-color: ${({ active }) => active && '#E9E9EB'};

	&:not(:last-child) {
		margin-bottom: 8px;
	}

	&:hover {
		background-color: ${({ active }) => (active ? '#E9E9EB' : '#f5f5f5')};
	}
`;

export const GroupItemText = styled(Text)`
	display: block;
	max-width: 100%;
	font-weight: 500;
	letter-spacing: -0.02em;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const StageGroup = styled.div`
	padding-bottom: 36px;
`;

export const StageButton = styled(Button)`
	margin-bottom: 44px;
	padding: 10px 4px;

	&:hover {
		background: transparent !important;
	}
`;

export const StageButtonText = styled(Text)`
	margin-left: 8px;
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;
`;

export const StageBody = styled.div``;

export const StageIssues = styled.div`
	margin-top: 20px;
`;

export const AddIssueButton = styled(Button)`
	padding: 10px 4px;
	transform: none !important;

	&:hover {
		background: transparent !important;
	}
`;

export const AddIssueButtonText = styled(Text)`
	margin-left: 8px;
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;
`;
