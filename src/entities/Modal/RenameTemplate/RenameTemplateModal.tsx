import React, { FC, useEffect, useRef, useState } from 'react';
import * as S from './RenameTemplateModal.styled';
import { Button, Divider, Modal, Text, View } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';

interface IRenameTemplateModalProps {
	name: string;
	isActive: boolean;
	currentTemplates: string[];
	closeModal: () => void;
	renameTemplate: (name: string) => void;
}

export const RenameTemplateModal: FC<IRenameTemplateModalProps> = ({
	name,
	isActive,
	currentTemplates,
	closeModal,
	renameTemplate,
}) => {
	const renameTemplateInputRef = useRef<HTMLInputElement>(null);
	const [newTemplateName, setNewTemplateName] = useState(name);
	const [isTemplateNameValid, setIsTemplateNameValid] = useState(false);
	const [isShowError, setIsShowError] = useState(false);

	useEffect(() => {
		if (isActive) {
			setTimeout(() => {
				renameTemplateInputRef.current?.focus();
			}, 100);
		}
	}, [isActive]);

	useEffect(() => {
		setNewTemplateName(name);
	}, [name, isActive]);

	useEffect(() => {
		setIsTemplateNameValid(!currentTemplates.includes(newTemplateName.trim()));
	}, [currentTemplates, newTemplateName]);

	useEffect(() => {
		setIsShowError(!isTemplateNameValid && newTemplateName.trim() !== name);
	}, [newTemplateName, name, isTemplateNameValid]);

	return (
		<Modal size='660px' padding={0} active={isActive} onClose={closeModal}>
			<View padding={4} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
				<Modal.Title>
					<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
						Переименовать шаблон
					</Text>
				</Modal.Title>
				<SvgComponent
					name='close-line-modal'
					style={{ cursor: 'pointer', pointerEvents: 'all' }}
					onClick={closeModal}
				/>
			</View>
			<Divider />
			<View padding={4}>
				<View paddingBottom={10} attributes={{ style: { position: 'relative' } }}>
					<S.RenameTemplateInput
						name='name'
						ref={renameTemplateInputRef}
						placeholder={name}
						value={newTemplateName}
						onChange={(e) => setNewTemplateName(e.target.value)}
						autoComplete='off'
					/>
					{isShowError && (
						<S.RenameTemplateError variant='caption-1' color='critical'>
							Шаблон с таким названием уже существует
						</S.RenameTemplateError>
					)}
				</View>
			</View>
			<Divider />
			<View padding={4} align='end'>
				<Button
					color='primary'
					size='small'
					// disabled={!newTemplateName.trim() || newTemplateName.trim() === name.trim()}
					disabled={!newTemplateName.trim() || !isTemplateNameValid}
					onClick={() => renameTemplate(newTemplateName.trim())}
				>
					<Text variant='caption-1'>Обновить</Text>
				</Button>
			</View>
		</Modal>
	);
};
