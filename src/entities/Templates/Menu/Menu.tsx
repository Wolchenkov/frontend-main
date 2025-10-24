import React, { FC } from 'react';
import * as S from './Menu.styled';
import { DropdownMenu } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { useStageMenuController } from './MenuController';
import { RenameTemplateModal } from '../../Modal/RenameTemplate/RenameTemplateModal';

interface IGroupMenuProps {
	name: string;
	isVisible: boolean;
	templateSlug: string;
	templateNames: string[];
}

export const Menu: FC<IGroupMenuProps> = ({ name, isVisible, templateSlug, templateNames }) => {
	const {
		isMenuActive,
		isRenameModalActive,
		activateMenu,
		deactivateMenu,
		activateRenameModal,
		deactivateRenameModal,
		handleRenameTemplate,
	} = useStageMenuController(isVisible, templateSlug);

	return (
		<>
			<DropdownMenu active={isMenuActive} onClose={deactivateMenu} position='bottom-start' forcePosition width='300px'>
				<DropdownMenu.Trigger>
					{(attributes) => (
						<S.MenuButton
							{...attributes}
							variant='ghost'
							size='small'
							startIcon={<SvgComponent name='more' />}
							isVisible={isVisible}
							onClick={() => (isMenuActive ? deactivateMenu() : activateMenu())}
						/>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item attributes={{ style: { letterSpacing: '-0.02em' } }} onClick={activateRenameModal}>
						Переименовать
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu>

			<RenameTemplateModal
				name={name}
				isActive={isRenameModalActive}
				currentTemplates={templateNames}
				closeModal={deactivateRenameModal}
				renameTemplate={handleRenameTemplate}
			/>
		</>
	);
};
