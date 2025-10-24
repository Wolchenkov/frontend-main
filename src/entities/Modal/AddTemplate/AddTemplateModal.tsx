import React, { FC, useEffect, useRef, useState } from 'react';
import * as S from './AddTemplateModal.styled';
import { Button, Divider, Modal, Text, View, Icon, useToast } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { useCreateTemplateMutation } from '../../../store/templates/templatesApi';
import { useRouter } from 'next/router';
import { useShowToast } from '../../../shared/utility/Hooks';

interface IAddTemplateModalProps {
	groupId: number;
	isActive: boolean;
	closeModal: () => void;
}

export const AddTemplateModal: FC<IAddTemplateModalProps> = ({ groupId, isActive, closeModal }) => {
	const AddTemplateInputRef = useRef<HTMLInputElement>(null);
	const [templateName, setTemplateName] = useState('');

	const router = useRouter();
	const { slug: projectSlug } = router.query;

	const toast = useToast();
	const showToast = useShowToast();
	const [createTemplate] = useCreateTemplateMutation();

	const handleCloseModal = () => {
		closeModal();
		setTemplateName('');
	};

	const handleAddTemplate = () => {
		closeModal();
		setTemplateName('');
		createTemplate({
			projectSlug: projectSlug as string,
			body: { name: templateName.trim() },
		})
			.unwrap()
			.then(() => {
				showSuccessToast();
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	const showSuccessToast = () => {
		toast.show({
			title: (
				<View direction='row'>
					<Icon svg={<SvgComponent name='zap' />} size={5} attributes={{ style: { marginRight: '16px' } }} />
					<Text variant='body-strong-2' attributes={{ style: { letterSpacing: '-0.01em', color: 'white' } }}>
						Шаблон сохранен
					</Text>
				</View>
			),
			text: (
				<>
					<Text
						variant='body-2'
						attributes={{ style: { marginBottom: '10px', marginLeft: '36px', letterSpacing: '-0.02em' } }}
					>
						Просмотреть или отредактировать шаблон вы сможете в группе ваших проектов во вкладке «Шаблоны»
					</Text>
					<Button
						color='neutral'
						variant='solid'
						attributes={{
							style: {
								minHeight: '28px',
								marginLeft: '36px',
								padding: '4px 8px',
								letterSpacing: '-0.02em',
								background: '#E9E9EB',
								color: '#000000',
							},
						}}
						onClick={() => router.push(`/projects/${groupId}?tab=templates`, `/projects/${groupId}`)}
					>
						Перейти
					</Button>
				</>
			),
		});
	};

	useEffect(() => {
		if (isActive) {
			setTimeout(() => {
				AddTemplateInputRef.current?.focus();
			}, 100);
		}
	}, [isActive]);

	return (
		<Modal size='660px' padding={0} active={isActive} onClose={handleCloseModal}>
			<View padding={4} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
				<Modal.Title>
					<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
						Сохранить шаблон
					</Text>
				</Modal.Title>
				<SvgComponent
					name='close-line-modal'
					style={{ cursor: 'pointer', pointerEvents: 'all' }}
					onClick={handleCloseModal}
				/>
			</View>
			<Divider />
			<View padding={4}>
				<View paddingBottom={10} attributes={{ style: { position: 'relative' } }}>
					<S.AddTemplateInput
						name='name'
						ref={AddTemplateInputRef}
						placeholder='Введите название шаблона…'
						value={templateName}
						onChange={(e) => setTemplateName(e.target.value)}
						autoComplete='off'
					/>
				</View>
			</View>
			<Divider />
			<View padding={4} align='end'>
				<Button color='primary' size='small' disabled={!templateName.trim()} onClick={handleAddTemplate}>
					<Text variant='caption-1'>Сохранить</Text>
				</Button>
			</View>
		</Modal>
	);
};
