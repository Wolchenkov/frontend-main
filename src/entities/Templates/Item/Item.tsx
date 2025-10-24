import React, { FC, useState } from 'react';
import * as S from './Item.styled';
import { Actionable, useToggle } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { ConfirmModal } from '../../Modal/ConfirmModal/ConfirmModal';
import { useDeleteProjectMutation } from '../../../store/projects/projectsApi';
import { useCreateTemplateMutation } from '../../../store/templates/templatesApi';
import { useShowToast } from '../../../shared/utility/Hooks';
import { UserRole } from '../../../shared/utility/Constants/userRole';

interface IItemProps {
	template: { name: string; slug: string };
	activeTemplate: { name: string; slug: string } | undefined;
	isUserTeamTemplate: boolean;
	userRole: string | undefined;
	setActiveTemplate: (activeTemplate: { name: string; slug: string }) => void;
}

export const Item: FC<IItemProps> = ({ template, activeTemplate, isUserTeamTemplate, userRole, setActiveTemplate }) => {
	const [isItemHovered, setIsItemHovered] = useState(false);

	const {
		active: activeDeleteModal,
		deactivate: deactivateDeleteModal,
		activate: activateDeleteModal,
	} = useToggle(false);

	const [createTemplate] = useCreateTemplateMutation();
	const [deleteTemplate] = useDeleteProjectMutation();
	const showToast = useShowToast();

	const handleDuplicateTemplate = () => {
		createTemplate({
			projectSlug: template.slug,
			body: { name: template.name },
		})
			.unwrap()
			.then(() => {
				showToast('Копия шаблона создана');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	const handleDeleteTemplate = () => {
		deactivateDeleteModal();
		deleteTemplate({ projectSlug: template.slug })
			.unwrap()
			.then(() => {
				showToast('Шаблон удален');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	return (
		<>
			<Actionable
				key={template.slug}
				as='div'
				onClick={() => setActiveTemplate(template)}
				attributes={{
					style: { width: '100%', marginBottom: '8px' },
					onMouseEnter: () => setIsItemHovered(true),
					onMouseLeave: () => setIsItemHovered(false),
				}}
			>
				<S.Item active={template.slug === activeTemplate?.slug}>
					<S.ItemText variant='body-medium-2' color='neutral'>
						{template.name}
					</S.ItemText>
					<S.ItemButtons isVisible={isItemHovered}>
						<S.ItemButton
							variant='ghost'
							size='small'
							startIcon={<SvgComponent name='file-copy' />}
							onClick={(e) => {
								e.stopPropagation();
								handleDuplicateTemplate();
							}}
						/>
						{(isUserTeamTemplate || userRole === UserRole.ADMIN) && (
							<S.ItemButton
								variant='ghost'
								size='small'
								startIcon={<SvgComponent name='close-fill' />}
								onClick={(e) => {
									e.stopPropagation();
									activateDeleteModal();
								}}
							/>
						)}
					</S.ItemButtons>
				</S.Item>
			</Actionable>
			<ConfirmModal
				active={activeDeleteModal}
				deactivate={deactivateDeleteModal}
				confirmDel={handleDeleteTemplate}
				text={`Вы действительно хотите удалить «${template.name}»?`}
			/>
		</>
	);
};
