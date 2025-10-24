import { FC, useState } from 'react';
import { useDocMovementModalController } from './DocMovementModalController';

import { Modal, View, Text, Divider, Button, Accordion } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import * as S from './DocMovementModal.styled';

interface IMoveFolderModalProps {
	active: boolean;
	onClose: () => void;
	size: string;
	doc: IDocument;
	type: string;
}

const DocsStructure = ({
	doc,
	structureItem,
	i,
	chosenFolder,
	setChosenFolder,
	disabled = false,
	pl = 0,
	rootFolder = false,
}: {
	doc: IDocument;
	structureItem: IDocsStructure;
	i: number;
	chosenFolder: IDocsStructure;
	setChosenFolder: React.Dispatch<React.SetStateAction<IDocsStructure>>;
	disabled?: boolean;
	pl?: number;
	rootFolder?: boolean;
}) => {
	const [activeValue, setActiveValue] = useState<number | null>(null);

	return (
		<S.DocMovementModalAccordion
			active={rootFolder || activeValue === i}
			onToggle={(active) => !rootFolder && structureItem.children.length > 0 && setActiveValue(active ? i : null)}
		>
			<Accordion.Trigger>
				{({ id, onClick }, { active }) => (
					<S.Row
						id={id}
						onClick={() => {
							setChosenFolder(structureItem);
						}}
						isChosen={chosenFolder.id === structureItem.id}
						active={active}
						disabled={disabled}
						lastChild={structureItem.children.length === 0}
						rootFolder={rootFolder}
						pl={pl}
					>
						{(structureItem.children.length > 0 || rootFolder) && (
							<div
								onClick={(e) => {
									onClick();
									e.stopPropagation();
								}}
							>
								<SvgComponent name='arrow-right-s-min' />
							</div>
						)}
						<SvgComponent name={rootFolder ? 'home-fill' : 'folder-2-fill'} />
						<Text variant='body-medium-2'>{structureItem.name}</Text>
					</S.Row>
				)}
			</Accordion.Trigger>
			{structureItem.children.length > 0 && (
				<Accordion.Content>
					{structureItem.children.map((structureItem, i) => (
						<DocsStructure
							key={structureItem.id}
							doc={doc}
							i={i}
							chosenFolder={chosenFolder}
							setChosenFolder={setChosenFolder}
							pl={rootFolder ? 0 : pl + 32}
							structureItem={structureItem}
							disabled={disabled || doc.id === structureItem.id}
						/>
					))}
				</Accordion.Content>
			)}
		</S.DocMovementModalAccordion>
	);
};

export const DocMovementModal: FC<IMoveFolderModalProps> = ({ active, onClose, size, doc, type }) => {
	const { docsStructure, chosenFolder, setChosenFolder, move } = useDocMovementModalController({
		active,
		onClose,
		doc,
		type,
	});

	return (
		<Modal size={size} active={active} onClose={onClose} padding={0}>
			<S.TitleWrapper padding={4} direction='row' align='center'>
				<Modal.Title>
					<Text variant='body-medium-2'>
						{`Переместить ${doc.type === 'folder' ? 'папку' : doc.type === 'file' ? 'файл' : 'заметку'} `}
						<Text variant='body-strong-2' as='span'>
							{doc.name}
						</Text>
					</Text>
				</Modal.Title>
				<SvgComponent name='close-line-modal' style={{ cursor: 'pointer', pointerEvents: 'all' }} onClick={onClose} />
			</S.TitleWrapper>
			{docsStructure &&
				docsStructure.map((structureItem, i) => (
					<S.DocsStructureWrapper key={structureItem.id}>
						<DocsStructure
							doc={doc}
							structureItem={structureItem}
							i={i}
							chosenFolder={chosenFolder}
							setChosenFolder={setChosenFolder}
							rootFolder
						/>
					</S.DocsStructureWrapper>
				))}
			<Divider />
			<View direction='row' align='center' padding={4} attributes={{ style: { justifyContent: 'flex-end' } }}>
				<Button
					color='primary'
					size='small'
					disabled={(!chosenFolder.id && typeof chosenFolder.id !== 'number') || chosenFolder.id === doc.id}
					onClick={move}
				>
					Переместить
				</Button>
			</View>
		</Modal>
	);
};
