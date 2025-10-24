import styled from 'styled-components';
import { Button, Text } from 'reshaped/bundle';

export const ProjectsEmpty = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-top: 135px;
`;

export const ProjectsEmptyTitle = styled(Text)`
	margin: 20px 0 4px;
	font-weight: 600;
	letter-spacing: -0.02em;
`;

export const ProjectsEmptyText = styled(Text)`
	margin-bottom: 20px;
	letter-spacing: -0.02em;
`;

export const ProjectsEmptyButton = styled(Button)`
	letter-spacing: -0.02em;
`;
