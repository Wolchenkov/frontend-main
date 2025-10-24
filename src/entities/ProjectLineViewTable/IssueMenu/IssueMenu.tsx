import React, { FC } from 'react';
import * as S from './IssueMenu.styled';
import { DropdownMenu } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { useIssueMenuController } from './IssueMenuController';

interface IIssueMenuProps {
	issueId: number;
	priorities: fetchingDictionaryPriority[];
	isFinished?: boolean;
	isRowHovered: boolean;
	setIsRowHovered: React.Dispatch<React.SetStateAction<boolean>>;
	kanban?: boolean;
}

export const IssueMenu: FC<IIssueMenuProps> = ({
	issueId,
	priorities,
	isFinished,
	isRowHovered,
	setIsRowHovered,
	kanban,
}) => {
	const {
		isMenuActive,
		isPriorityMenuActive,
		deactivateMenu,
		handleButtonClick,
		handleChangePriorityOptionClick,
		deactivatePriorityMenu,
		handleDuplicateIssue,
		handleChangePriorityIssue,
		handleDeleteIssue,
	} = useIssueMenuController(issueId, isRowHovered, setIsRowHovered);

	return (
		<DropdownMenu
			active={isMenuActive}
			onClose={() => {
				deactivateMenu();
				deactivatePriorityMenu();
			}}
			position={kanban ? undefined : 'bottom-end'}
			forcePosition
			width='300px'
		>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<S.MenuButton
						{...attributes}
						variant='ghost'
						size='small'
						startIcon={<SvgComponent name='more' />}
						isFinishedIssue={isFinished}
						isRowHovered={isRowHovered}
						onClick={handleButtonClick}
					/>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Section>
					<DropdownMenu.Item
						endSlot={<SvgComponent name='file-copy' />}
						attributes={{ style: { letterSpacing: '-0.02em' } }}
						onClick={handleDuplicateIssue}
					>
						Дублировать
					</DropdownMenu.Item>

					<DropdownMenu
						width='300px'
						position='start'
						forcePosition
						active={isPriorityMenuActive}
						onClose={deactivatePriorityMenu}
					>
						<DropdownMenu.Trigger>
							{(attributes) => (
								<DropdownMenu.Item
									endSlot={<SvgComponent name='arrow-right-s-min' />}
									attributes={{ ...attributes, style: { letterSpacing: '-0.02em' } }}
									onClick={handleChangePriorityOptionClick}
								>
									Присвоить приоритет
								</DropdownMenu.Item>
							)}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							{priorities.map((priority) => (
								<DropdownMenu.Item
									key={priority.id}
									endSlot={<S.PriorityBadge color={priority.color} size={3} />}
									attributes={{ style: { letterSpacing: '-0.02em' } }}
									onClick={(evt) => handleChangePriorityIssue(evt, priority.id)}
								>
									{priority.priority}
								</DropdownMenu.Item>
							))}
						</DropdownMenu.Content>
					</DropdownMenu>
				</DropdownMenu.Section>
				<DropdownMenu.Section>
					<DropdownMenu.Item
						endSlot={<SvgComponent name='close-fill' />}
						attributes={{ style: { letterSpacing: '-0.02em' } }}
						onClick={handleDeleteIssue}
					>
						Удалить задачу
					</DropdownMenu.Item>
				</DropdownMenu.Section>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
