import React, { FC } from 'react';
import * as S from './StagesEmpty.styled';
import { useRouter } from 'next/router';
import { Icon, Text, View, useToast } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { UserRole } from '../../../shared/utility/Constants/userRole';
import { useImportMutation } from '../../../store/import/importApi';

interface IStagesEmptyProps {
	userRole: string | undefined;
	groupId: number;
	openModal: () => void;
}

export const StagesEmpty: FC<IStagesEmptyProps> = ({ userRole, groupId, openModal }) => {
	const router = useRouter();
	const { slug: projectSlug } = router.query;
	const toast = useToast();

	const [importFile, { isLoading }] = useImportMutation();

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			importFile({ projectSlug, file }).then((data) => {
				if ('error' in data) {
					toast.show({
						color: 'critical',
						text: <Text variant='body-2'>В файле нет соответсвующих полей</Text>,
						icon: <Icon svg={<SvgComponent name='close-circle-white' />} size={6} />,
					});
				}
			});
		}
		e.target.value = '';
	};

	const handleImportClick = () => {
		document.getElementById('fileInputBTN')?.click();
	};

	return (
		<S.StagesEmpty>
			<S.StagesEmptyTitle variant='body-1'>Структура проекта</S.StagesEmptyTitle>
			<S.StagesEmptyText variant='caption-1' color='neutral-faded' align='center'>
				Вы можете создать этап, а также использовать шаблон
				<br />
				или импортировать проект
			</S.StagesEmptyText>
			<View direction='row' gap={8}>
				<S.BtnWrapper>
					<S.BtnAdd
						variant='ghost'
						size='xlarge'
						startIcon={<SvgComponent style={{ position: 'absolute', top: '4px', right: '-8px' }} name='add-line' />}
						onClick={openModal}
					/>
					<S.TextLS002 variant='caption-1' color='neutral-faded'>
						Этап
					</S.TextLS002>
				</S.BtnWrapper>
				<S.BtnWrapper>
					<S.BtnAdd
						disabled={userRole === UserRole.CLIENT || userRole === UserRole.MEMBER}
						variant='ghost'
						size='xlarge'
						startIcon={<SvgComponent style={{ position: 'absolute', right: '-8px' }} name='survey-line-faded' />}
						onClick={() =>
							router.push(
								`/projects/${groupId}?tab=templates&templateChoice=true&projectSlug=${projectSlug}`,
								`/projects/${groupId}`
							)
						}
					/>
					<S.TextLS002 variant='caption-1' color='neutral-faded'>
						Шаблон
					</S.TextLS002>
				</S.BtnWrapper>
				<S.BtnWrapper>
					<S.BtnAdd
						disabled={userRole !== UserRole.ADMIN && userRole !== UserRole.UNITMASTER}
						loading={isLoading}
						variant='ghost'
						size='xlarge'
						startIcon={
							<SvgComponent style={{ position: 'absolute', top: '6px', right: '-6px' }} name='download-line-faded' />
						}
						onClick={handleImportClick}
					/>
					<S.TextLS002 variant='caption-1' color='neutral-faded'>
						Импорт
					</S.TextLS002>
				</S.BtnWrapper>
			</View>
			<input type='file' id='fileInputBTN' accept='.csv' style={{ display: 'none' }} onChange={handleFileUpload} />
		</S.StagesEmpty>
	);
};
