import { FC, MouseEvent, KeyboardEvent, useState, useRef } from 'react';
import { DropdownMenu, useToggle, Text } from 'reshaped/bundle';
import * as S from './SubtasksDropdownMenu.styled';
import { SvgComponent, AvatarCustom } from '../../../shared';
import { getInitials } from '../../../shared/utility/Utils';

interface ISubtasksDropdownMenuProps {
	subtasks: ITask[];
	isFinished?: boolean;
	isRowHovered: boolean;
	activeParentIssue: number | undefined;
	issueId: number;
	issueChildrenCompleteCount: number;
	issueChildrenCount: number;
	setActiveParentIssue: (id: number | undefined) => void;
	onIssueClick: (id: number) => void;
	onSubtaskStatusChange: (subtaskId: number, isCompleted: boolean) => void;
	onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
	onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const SubtasksDropdownMenu: FC<ISubtasksDropdownMenuProps> = ({
	subtasks,
	// isFinished = false,
	isRowHovered,
	activeParentIssue,
	issueId,
	issueChildrenCompleteCount,
	issueChildrenCount,
	setActiveParentIssue,
	onIssueClick,
	onSubtaskStatusChange,
	onMouseEnter,
	onMouseLeave,
}) => {
	const { active: isMenuActive, activate: activateMenu, deactivate: deactivateMenu } = useToggle(false);
	const [hoveredFinishIconId, setHoveredFinishIconId] = useState<number | undefined>(undefined);
	const [focusedFinishIconId, setFocusedFinishIconId] = useState<number | undefined>(undefined);
	const [isMenuHovered, setIsMenuHovered] = useState(false);
	const [isBadgeHovered, setIsBadgeHovered] = useState(false);
	const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
		if (closeTimeoutRef.current) {
			clearTimeout(closeTimeoutRef.current);
			closeTimeoutRef.current = null;
		}
		setIsBadgeHovered(true);
		setActiveParentIssue(issueId);
		activateMenu();
		if (onMouseEnter) onMouseEnter(e);
	};

	const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
		closeTimeoutRef.current = setTimeout(() => {
			if (!isMenuHovered) {
				setIsBadgeHovered(false);
				setActiveParentIssue(undefined);
				deactivateMenu();
				if (onMouseLeave) onMouseLeave(e);
			}
		}, 100);
	};

	const handleMenuMouseEnter = () => {
		if (closeTimeoutRef.current) {
			setIsBadgeHovered(false);
			clearTimeout(closeTimeoutRef.current);
			closeTimeoutRef.current = null;
		}
		setIsMenuHovered(true);
	};

	const handleMenuMouseLeave = () => {
		setIsMenuHovered(false);
		setActiveParentIssue(undefined);
		deactivateMenu();
	};

	const handleSubtaskFinishIconClick = (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>, subtask: ITask) => {
		if ('stopPropagation' in e) {
			e.stopPropagation();
		}
		onSubtaskStatusChange(subtask.id, subtask.completed_on === null);
	};

	return (
		<>
			<DropdownMenu
				active={isMenuActive}
				onClose={() => {
					deactivateMenu();
					setActiveParentIssue(undefined);
				}}
				width='386px'
			>
				<DropdownMenu.Trigger>
					{(attributes) => (
						<button
							{...attributes}
							type='button'
							style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						>
							<S.TableRowParentBadge
								isRowHovered={isRowHovered}
								isAllIssuesComplete={issueChildrenCompleteCount === issueChildrenCount}
								activeParentIssue={activeParentIssue === issueId}
							>
								{issueChildrenCompleteCount === issueChildrenCount ? (
									<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'>
										<circle cx='6' cy='6' r='6' fill='#118D2E' />
										<path
											fillRule='evenodd'
											clipRule='evenodd'
											d='M9.01856 3.54754L5.70582 9.22652L2.95703 5.92796L3.82128 5.20776L5.54269 7.27345L8.04681 2.98068L9.01856 3.54754Z'
											fill='white'
										/>
									</svg>
								) : (
									<svg width='12' height='12' viewBox='0 0 12 12'>
										<circle cx='6' cy='6' r='6' fill='transparent' />
										<path d={getProgressPath(issueChildrenCompleteCount / issueChildrenCount)} fill='currentColor' />
										<circle cx='6' cy='6' r='5.5' fill='none' stroke='currentColor' strokeWidth='1' />
									</svg>
								)}
								<Text
									variant='caption-1'
									attributes={{
										style: { lineHeight: '20px', fontWeight: '500', letterSpacing: '-0.01em' },
									}}
								>
									{issueChildrenCompleteCount}/{issueChildrenCount}
								</Text>
							</S.TableRowParentBadge>
							<S.ParentBadgeBridge isBadgeHovered={isBadgeHovered} />
						</button>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<S.SubtasksDropdownContent onMouseEnter={handleMenuMouseEnter} onMouseLeave={handleMenuMouseLeave}>
						{subtasks.map((subtask, index) => (
							<DropdownMenu.Item
								key={index}
								onClick={(e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
									if ('stopPropagation' in e) {
										e.stopPropagation();
									}
									onIssueClick(subtask.id);
								}}
							>
								<S.SubtaskItem>
									<S.SubtaskItemInfo>
										<S.TableRowFinishIcon
											size={4}
											svg={
												<SvgComponent
													name={
														focusedFinishIconId === subtask.id
															? 'checkbox-issue-active'
															: hoveredFinishIconId === subtask.id
															? 'checkbox-issue-hover'
															: subtask.completed_on !== null
															? 'checkbox-issue-finished-green'
															: 'checkbox-issue-default'
													}
												/>
											}
											isClickable={true}
											attributes={{
												tabIndex: 0,
												onMouseEnter: () => setHoveredFinishIconId(subtask.id),
												onMouseLeave: () => {
													setHoveredFinishIconId(undefined);
													setFocusedFinishIconId(undefined);
												},
												onClick: (e) => handleSubtaskFinishIconClick(e, subtask),
											}}
										/>
										<S.SubtaskItemName>
											<Text
												variant='caption-1'
												attributes={{
													style: { lineHeight: '20px', fontWeight: '500', letterSpacing: '-0.01em' },
												}}
											>
												{subtask.name}
											</Text>
											<Text variant='caption-1' color='neutral-faded'>
												{subtask.deadline?.split('-').reverse().join('.')}
											</Text>
										</S.SubtaskItemName>
									</S.SubtaskItemInfo>
									{subtask.delegate?.name ? (
										<AvatarCustom
											src={subtask.delegate.avatar ? subtask.delegate.avatar : undefined}
											initials={getInitials(subtask.delegate.name)}
											size={6}
										/>
									) : (
										<SvgComponent name='avatar-unassigned' />
									)}
								</S.SubtaskItem>
							</DropdownMenu.Item>
						))}
					</S.SubtasksDropdownContent>
				</DropdownMenu.Content>
			</DropdownMenu>
		</>
	);
};

export function getProgressPath(fraction: number) {
	const r = 4;
	const cx = 6;
	const cy = 6;

	if (fraction <= 0) return '';
	if (fraction >= 1) return `M${cx},${cy} L${cx},${cy - r} A${r},${r} 0 1,1 ${cx - 0.001},${cy - r} Z`;

	const angle = 2 * Math.PI * fraction - Math.PI / 2;
	const x = cx + r * Math.cos(angle);
	const y = cy + r * Math.sin(angle);
	const largeArc = fraction > 0.5 ? 1 : 0;

	return `M${cx},${cy} L${cx},${cy - r} A${r},${r} 0 ${largeArc},1 ${x},${y} Z`;
}
