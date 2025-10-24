import React, { FC, useEffect, useState } from 'react';
import * as S from './WorkType.styled';
import { SvgComponent } from '../../../shared';
import { useToggle } from 'reshaped/bundle';
import { WorkTypeRow } from './WorkTypeRow/WorkTypeRow';
import { AddWorkTypeModal } from '../../../entities/Modal/AddWorkType/AddWorkTypeModal';
import { useGetWorkTypesQuery } from '../../../store/management/managementApi';

export const ManagementWorkType: FC = () => {
	const [myWorkTypes, setMyWorkTypes] = useState<IManagementWorkType[]>();

	const {
		active: isAddWorkTypeModalActive,
		activate: activateAddWorkTypeModal,
		deactivate: deactivateAddWorkTypeModal,
	} = useToggle(false);

	const { data: workTypes } = useGetWorkTypesQuery();

	useEffect(() => {
		if (workTypes) {
			setMyWorkTypes(workTypes);
		}
	}, [workTypes]);

	return (
		<>
			<S.Title variant='title-3'>Типы работ</S.Title>
			<S.Description variant='body-2'>
				Здесь вы можете добавить тип работ, а так же отредактировать почасовую ставку
			</S.Description>

			{myWorkTypes ? (
				myWorkTypes.length ? (
					<S.Table>
						<S.TableHead>
							<S.TableHeadCell variant='caption-1' color='neutral-faded'>
								Название
							</S.TableHeadCell>
							<S.TableHeadCell variant='caption-1' color='neutral-faded'>
								₽/час
							</S.TableHeadCell>
						</S.TableHead>
						{myWorkTypes.map((workType) => (
							<WorkTypeRow key={workType.id} data={workType} currentWorkTypes={myWorkTypes.map(({ type }) => type)} />
						))}

						<S.AddButton
							variant='ghost'
							startIcon={<SvgComponent name='add-line' />}
							size='small'
							onClick={activateAddWorkTypeModal}
						>
							<S.AddButtonText variant='caption-1' color='neutral-faded'>
								Добавить
							</S.AddButtonText>
						</S.AddButton>
					</S.Table>
				) : (
					<S.Table>
						<S.AddButton
							variant='ghost'
							startIcon={<SvgComponent name='add-line' />}
							size='small'
							attributes={{ style: { padding: 0 } }}
							onClick={activateAddWorkTypeModal}
						>
							<S.AddButtonText variant='caption-1' color='neutral-faded'>
								Добавить
							</S.AddButtonText>
						</S.AddButton>
					</S.Table>
				)
			) : (
				<></>
			)}

			<AddWorkTypeModal
				currentWorkTypes={myWorkTypes?.map(({ type }) => type) ?? []}
				isActive={isAddWorkTypeModalActive}
				closeModal={deactivateAddWorkTypeModal}
			/>
		</>
	);
};
