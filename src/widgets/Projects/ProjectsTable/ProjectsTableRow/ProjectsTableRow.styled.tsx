import styled from 'styled-components';
import { Avatar, Text } from 'reshaped/bundle';

export const ProjectsTableRow = styled.div<{ isFinished: boolean }>`
	transition: all 0.5s ease;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 40px 10px 12px;
	border-bottom: 1px solid #ebebeb;
	cursor: pointer;
	opacity: ${(props) => (props.isFinished ? '0.5' : '1')};

	&:hover {
		background: ${(props) => (props.isFinished ? '#F8F8F8' : 'rgba(248, 248, 248, 1)')};
	}
`;

export const ProjectsTableRowCell = styled.div<{ show: boolean }>`
	padding: 0 16px;
	display: ${(props) => (props.show ? 'flex !important' : 'none !important')};

	&.ProjectsTableRowCell__name {
		display: flex !important;
		width: calc(31.1% - 56px);
		flex-shrink: 0;
		padding: 0 16px 0 8px;
	}

	&.ProjectsTableRowCell__manager {
		display: flex !important;
		width: 56px;
		flex-shrink: 0;
	}

	&.ProjectsTableRowCell__members {
		width: 11.1%;
		flex-shrink: 0;
		padding-left: 10px;
	}

	&.ProjectsTableRowCell__client {
		width: 10%;
		flex-shrink: 0;
		padding-left: 10px;
	}

	&.ProjectsTableRowCell__end {
		display: flex;
		justify-content: center;
		width: 10%;
		flex-shrink: 0;
		padding-left: 0;
	}

	&.ProjectsTableRowCell__start {
		display: flex;
		justify-content: center;
		width: 10%;
		flex-shrink: 0;
		padding-left: 0;
	}

	&.ProjectsTableRowCell__budget {
		display: flex;
		justify-content: flex-end;
		width: 10%;
		flex-shrink: 0;
		padding-right: 26px;
	}

	&.ProjectsTableRowCell__balance {
		display: flex;
		justify-content: flex-end;
		width: 10%;
		flex-shrink: 0;
		padding-right: 30px;
	}

	&.ProjectsTableRowCell__status {
		width: 7.8%;
		flex-shrink: 0;
		padding-left: 0;
	}
`;

export const ProjectsText = styled(Text)`
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const ProjectsStatus = styled.div<{ isFinished: boolean }>`
	display: flex;
	align-items: center;
	filter: ${(props) => (props.isFinished ? 'grayscale(1)' : 'unset')};
`;

export const ProjectsTeam = styled.div`
	display: flex;

	div:not(:first-child) {
		margin-left: -8px;
	}
`;

export const ProjectsTeamAvatar = styled(Avatar)`
	outline: 2px solid #ffffff;
	color: #ffffff !important;
	background-color: #6a68f2 !important;
`;
