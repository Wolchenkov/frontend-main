import React, { FC, useState, useEffect } from 'react';
import * as S from './DocumentMenu.styled';
import { DropdownMenu } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';

interface IDocumentMenuProps {
	rowHover: boolean;
	docType: string;
	moveDoc: () => void;
	changeName: () => void;
	deleteDoc: () => void;
	duplicateDoc: () => void;
	editNote: () => void;
	downloadFile: () => void;
}

export const DocumentMenu: FC<IDocumentMenuProps> = ({
	rowHover,
	docType,
	moveDoc,
	changeName,
	deleteDoc,
	duplicateDoc,
	editNote,
	downloadFile,
}) => {
	const [openMenu, setOpenMenu] = useState(false);

	useEffect(() => {
		!rowHover && setOpenMenu(false);
	}, [rowHover]);

	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
			{docType === 'file' && (
				<S.MenuButton
					variant='ghost'
					size='small'
					startIcon={<SvgComponent name='download' />}
					rowHover={rowHover}
					onClick={(e) => {
						e.stopPropagation();
						downloadFile();
					}}
				/>
			)}
			<DropdownMenu active={openMenu} onClose={() => setOpenMenu(false)} width='300px'>
				<DropdownMenu.Trigger>
					{(attributes) => (
						<S.MenuButton
							{...attributes}
							variant='ghost'
							size='small'
							startIcon={<SvgComponent name='more' />}
							rowHover={rowHover}
							onClick={(e) => {
								e.stopPropagation();
								setOpenMenu(true);
							}}
						/>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Section>
						<DropdownMenu.Item
							endSlot={<SvgComponent name='arrow-right-s-min' />}
							attributes={{ style: { letterSpacing: '-0.02em' } }}
							onClick={(e) => {
								e.stopPropagation();
								moveDoc();
							}}
						>
							{docType === 'folder' ? 'Переместить в папку' : 'Добавить в папку'}
						</DropdownMenu.Item>
						{(docType === 'file' || docType === 'notes') && (
							<DropdownMenu.Item
								attributes={{ style: { letterSpacing: '-0.02em' } }}
								onClick={(e) => {
									e.stopPropagation();
									duplicateDoc();
								}}
							>
								Дублировать
							</DropdownMenu.Item>
						)}
					</DropdownMenu.Section>
					<DropdownMenu.Section>
						<DropdownMenu.Item
							endSlot={<SvgComponent name='pencil-line' />}
							attributes={{ style: { letterSpacing: '-0.02em' } }}
							onClick={(e) => {
								e.stopPropagation();
								docType === 'notes' ? editNote() : changeName();
							}}
						>
							{docType === 'notes' ? 'Редактировать заметку' : 'Переименовать'}
						</DropdownMenu.Item>
						<DropdownMenu.Item
							endSlot={<SvgComponent name='close-fill' />}
							attributes={{ style: { letterSpacing: '-0.02em' } }}
							onClick={(e) => {
								e.stopPropagation();
								deleteDoc();
							}}
						>
							Удалить
						</DropdownMenu.Item>
					</DropdownMenu.Section>
				</DropdownMenu.Content>
			</DropdownMenu>
		</div>
	);
};
