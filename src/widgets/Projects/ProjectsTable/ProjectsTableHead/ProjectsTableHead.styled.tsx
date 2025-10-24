import styled from 'styled-components';

export const ProjectsTableHead = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 12px;
	border-bottom: 1px solid #ebebeb;
`;

export const ProjectsTableHeadColumns = styled.div`
	flex-grow: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-right: 16px;
`;

export const ProjectsTableHeadCell = styled.div<{ show: boolean }>`
	padding: 0 16px;
	display: ${(props) => (props.show ? 'flex !important' : 'none !important')};

	&.ProjectsTableHeadCell__name {
		display: flex !important;
		width: calc(31.1% - 56px);
		flex-shrink: 0;
		padding: 0 16px 0 8px;
	}

	&.ProjectsTableHeadCell__manager {
		display: flex !important;
		width: 56px;
		flex-shrink: 0;
	}

	&.ProjectsTableHeadCell__members {
		width: 11.1%;
		flex-shrink: 0;
	}

	&.ProjectsTableHeadCell__client {
		width: 10%;
		flex-shrink: 0;
	}

	&.ProjectsTableHeadCell__end {
		display: flex;
		justify-content: center;
		width: 10%;
		flex-shrink: 0;
	}

	&.ProjectsTableHeadCell__start {
		display: flex;
		justify-content: center;
		width: 10%;
		flex-shrink: 0;
	}

	&.ProjectsTableHeadCell__budget {
		display: flex;
		justify-content: flex-end;
		width: 10%;
		flex-shrink: 0;
	}

	&.ProjectsTableHeadCell__balance {
		display: flex;
		justify-content: flex-end;
		width: 10%;
		flex-shrink: 0;
	}

	&.ProjectsTableHeadCell__status {
		width: 7.8%;
		flex-shrink: 0;
	}
`;

export const ProjectsTableFilterOption = styled.div`
	display: flex;
	align-items: center;
	padding: 8px 12px;
	cursor: pointer;

	&:not(:last-child) {
		margin-bottom: 4px;
	}
`;
