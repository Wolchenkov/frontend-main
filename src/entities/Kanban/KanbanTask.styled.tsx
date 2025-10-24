import { Badge } from 'reshaped/bundle';
import styled from 'styled-components';

interface BadgeStylesProps {
	isAllIssuesComplete: boolean;
	activeParentIssue: boolean;
}

const getBadgeStyles = ({ isAllIssuesComplete, activeParentIssue }: BadgeStylesProps) => {
	if (isAllIssuesComplete) {
		return {
			background: 'var(--rs-color-background-positive-faded)',
			color: 'var(--rs-color-foreground-positive)',
			hoverBackground: 'var(--rs-color-background-positive-faded)',
			hoverColor: 'var(--rs-color-foreground-positive)',
		};
	}

	if (activeParentIssue) {
		return {
			background: 'var(--rs-color-background-primary-faded)',
			color: 'var(--rs-color-foreground-primary)',
			hoverBackground: 'var(--rs-color-background-primary-faded)',
			hoverColor: 'var(--rs-color-foreground-primary)',
		};
	}

	return {
		background: 'var(--rs-color-background-neutral-faded)',
		color: 'var(--rs-color-foreground-neutral-faded)',
		hoverBackground: 'var(--rs-color-background-primary-faded)',
		hoverColor: 'var(--rs-color-foreground-primary)',
	};
};

interface TableRowParentBadgeProps {
	isRowHovered: boolean;
	isAllIssuesComplete: boolean;
	activeParentIssue: boolean;
}

export const TableRowParentBadge = styled.div<TableRowParentBadgeProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 4px;
	max-width: 62px;
	padding: 0 6px 0 4px;
	height: 20px;
	background-color: ${(props) => getBadgeStyles(props).background};
	border-radius: 100px;
	outline: ${({ isRowHovered, isAllIssuesComplete }) =>
		isRowHovered ? `1px solid ${isAllIssuesComplete ? 'var(--rs-color-border-positive-faded)' : '#E5E7EA'}` : 'none'};
	color: ${(props) => getBadgeStyles(props).color};

	&:hover {
		background-color: ${(props) => getBadgeStyles(props).hoverBackground};
		outline: ${({ isAllIssuesComplete }) =>
			isAllIssuesComplete ? '1px solid var(--rs-color-border-positive-faded)' : 'none'};
		color: ${(props) => getBadgeStyles(props).hoverColor};

		& > div {
			color: ${(props) => getBadgeStyles(props).hoverColor};
		}
	}
`;

export const Card = styled.div<{ focus: boolean | null; isFocusMode: number; isDragging: boolean }>`
	width: 228px;
	height: 140px;
	background: ${(props) => (props.isFocusMode ? (props.focus ? '#ffffff' : '#F4F5F7') : '#ffffff')};
	border: 1px solid ${(props) => (props.isFocusMode ? (props.focus ? '#ffffff' : '#E5E7EA') : '#ffffff')};
	border-radius: 6px;
	flex-shrink: 0;
	padding: 8px 12px 12px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	cursor: ${(props) => (props.isDragging ? 'grabbing' : 'grab')};
`;

export const UnderCard = styled.div<{ isDragging: boolean }>`
	width: 228px;
	height: 140px;
	border-radius: 6px;
	flex-shrink: 0;
	border: 1px dashed #e5e7ea;
	background: #f4f5f7;
	cursor: ${(props) => (props.isDragging ? 'grabbing' : 'grab')};
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 4px;
	height: 28px;
`;

export const MyBadge = styled(Badge)<{ colorBadge: string }>`
	background: ${(props) => props.colorBadge};
	border: ${(props) => props.colorBadge};
`;

export const LeftSideHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
`;

export const Footer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const SubtaskCounter = styled.div<{ isActive: boolean }>`
	display: flex;
	align-items: center;
	gap: 4px;
	padding: 0 8px;
	height: 20px;
	background-color: ${(props) => (props.isActive ? 'var(--rs-color-background-primary-faded)' : '#F4F5F7')};
	border-radius: 100px;
	color: ${(props) =>
		props.isActive ? 'var(--rs-color-foreground-primary)' : 'var(--rs-color-foreground-neutral-faded)'};
	font-weight: 500;
	letter-spacing: -0.01em;
	cursor: default;
`;
