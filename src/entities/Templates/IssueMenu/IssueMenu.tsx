import React, { FC } from 'react';
import * as S from './IssueMenu.styled';
import { DropdownMenu } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { useIssueMenuController } from './IssueMenuController';

interface IIssueMenuProps {
	issueId: number;
	isRowHovered: boolean;
	templateSlug: string;
	setIsRowHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IssueMenu: FC<IIssueMenuProps> = ({ issueId, isRowHovered, templateSlug, setIsRowHovered }) => {
	const { isMenuActive, deactivateMenu, handleButtonClick, handleDuplicateIssue, handleDeleteIssue } =
		useIssueMenuController(issueId, isRowHovered, templateSlug, setIsRowHovered);

	return (
		<DropdownMenu
			active={isMenuActive}
			onClose={() => {
				deactivateMenu();
			}}
			position='bottom-end'
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
						isRowHovered={isRowHovered}
						onClick={handleButtonClick}
					/>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item
					endSlot={<SvgComponent name='file-copy' />}
					attributes={{ style: { letterSpacing: '-0.02em' } }}
					onClick={handleDuplicateIssue}
				>
					Дублировать
				</DropdownMenu.Item>
				<DropdownMenu.Item
					endSlot={<SvgComponent name='close-fill' />}
					attributes={{ style: { letterSpacing: '-0.02em' } }}
					onClick={handleDeleteIssue}
				>
					Удалить задачу
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
