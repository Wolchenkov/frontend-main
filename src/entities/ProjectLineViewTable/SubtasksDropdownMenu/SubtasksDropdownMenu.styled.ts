import styled from 'styled-components';
import { Actionable, Icon } from 'reshaped/bundle';

const getBadgeStyles = ({ isAllIssuesComplete, activeParentIssue }: { isAllIssuesComplete: boolean; activeParentIssue: boolean }) => {
	if (isAllIssuesComplete) {
		return {
			background: 'var(--rs-color-background-positive-faded)',
			color: 'var(--rs-color-foreground-positive)',
			hoverBackground: 'var(--rs-color-background-positive-faded)',
			hoverColor: 'var(--rs-color-foreground-positive)'
		};
	}
	
	if (activeParentIssue) {
		return {
			background: 'var(--rs-color-background-primary-faded)',
			color: 'var(--rs-color-foreground-primary)',
			hoverBackground: 'var(--rs-color-background-primary-faded)',
			hoverColor: 'var(--rs-color-foreground-primary)'
		};
	}
	
	return {
		background: 'var(--rs-color-background-neutral-faded)',
		color: 'var(--rs-color-foreground-neutral-faded)',
		hoverBackground: 'var(--rs-color-background-primary-faded)',
		hoverColor: 'var(--rs-color-foreground-primary)'
	};
};

export const TableRowParentBadge = styled.div<{ 
	isRowHovered: boolean; 
	isAllIssuesComplete: boolean; 
	activeParentIssue: boolean;
	onClick?: (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
}>`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 4px;
	max-width: 62px;
	padding: 0 5px 0 3px;
	height: 20px;
	background-color: ${props => getBadgeStyles(props).background};
	border-radius: 100px;
	border: 1px solid ${props => getBadgeStyles(props).background};
	border-color: ${({ isRowHovered, isAllIssuesComplete }) => (isRowHovered ? `${isAllIssuesComplete ? 'var(--rs-color-border-positive-faded)' :'#E5E7EA'}` : 'none')};
	color: ${props => getBadgeStyles(props).color};
	cursor: pointer;

	&:hover {
		background-color: ${props => getBadgeStyles(props).hoverBackground};
		border-color:  ${({isAllIssuesComplete }) => (isAllIssuesComplete ? 'var(--rs-color-border-positive-faded)' : '#E5E7EA')};
		color: ${props => getBadgeStyles(props).hoverColor};

		& > div {
			color: ${props => getBadgeStyles(props).hoverColor};
		}
	}
`;

export const SubtasksButton = styled(Actionable)`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4px;
	border-radius: 4px;
	
	&:hover {
		background-color: #F6F6F7;
	}
`;

export const SubtasksBadge = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
`;

export const ParentBadgeBridge = styled.div<{isBadgeHovered: boolean}>`
	position: absolute;
	width: 120%;
	height: 14px;
	z-index:  ${({isBadgeHovered }) => (isBadgeHovered ? 81 : 1)};
`;

export const SubtasksDropdownContent = styled.div`
	max-height: 272px;
	overflow-y: auto;
	position: relative;
`;

export const SubtaskItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
	border-radius: 4px;
	
	&:hover {
		background-color: #F6F6F7;
	}

	~ svg {
		min-width: 24px;
	}
`; 

export const SubtaskItemInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`; 

export const SubtaskItemName = styled.div`
	flex-grow: 1;
	max-width: 280px;

	div {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`; 

export const TableRowFinishIcon = styled(Icon)<{ isClickable: boolean }>`
	cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
`;