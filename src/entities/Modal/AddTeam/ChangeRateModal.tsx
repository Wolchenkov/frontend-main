import React, { FC, useEffect } from 'react';
import { Button, Divider, Modal, Text, View } from 'reshaped/bundle';
import { RowRate } from './RowRate';
import { useGetTypeWorkQuery } from '../../../store/dictionaries/dictionariesApi';
import { useGetCurrentTypeWorkQuery } from '../../../store/teams/teamsApi';
import * as S from './ChangeRateModal.styled';
import { SvgComponent } from '../../../shared';

interface IChangeRateModalprops {
	active: boolean;
	onClose: () => void;
	size: string;
	fetchingTypesData: fetchingTypeWork[];
	setFetchingTypesData: React.Dispatch<React.SetStateAction<fetchingTypeWork[]>>;
	changeTypesWork?: () => void;
	teamId?: number;
}

export const ChangeRateModal: FC<IChangeRateModalprops> = ({
	active,
	onClose,
	size,
	fetchingTypesData,
	setFetchingTypesData,
	changeTypesWork,
	teamId,
}) => {
	const { data: typesWork } = useGetTypeWorkQuery();
	const { data: currentTypesWork, refetch } = useGetCurrentTypeWorkQuery(teamId || 0, { skip: !teamId });

	useEffect(() => {
		if (!teamId && typesWork) {
			fetchingTypesData.length === 0 && setFetchingTypesData(typesWork);
		}
		if (teamId && currentTypesWork) {
			fetchingTypesData.length === 0 && setFetchingTypesData(currentTypesWork);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTypesWork, typesWork, fetchingTypesData]);

	const closeModal = () => {
		setFetchingTypesData([]);
		onClose();
	};

	return (
		<>
			<S.MyModal size={size} active={active} onClose={closeModal}>
				<View
					padding={4}
					direction='row'
					align='center'
					attributes={{ style: { justifyContent: 'space-between' } }}
					paddingBottom={10}
				>
					<Modal.Title>
						<S.MyText variant='body-1'>Установите стоимость ставок специалистов</S.MyText>
					</Modal.Title>
					<SvgComponent
						name='close-line-modal'
						style={{ cursor: 'pointer', pointerEvents: 'all' }}
						onClick={closeModal}
					/>
				</View>

				<View paddingEnd={15} paddingStart={5} paddingBottom={1}>
					<View direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
						<Text variant='caption-1' color='neutral-faded'>
							Тип работ
						</Text>
						<Text variant='caption-1' color='neutral-faded'>
							₽/час
						</Text>
					</View>
				</View>
				<Divider />
				<S.ScrollableDiv>
					{fetchingTypesData.map((type) => (
						<RowRate
							key={type.id}
							id={type.id}
							cost={type.cost}
							type={type.type}
							setFetchingTypesData={setFetchingTypesData}
						/>
					))}
				</S.ScrollableDiv>
				<View direction='row' align='center' padding={4} justify='end'>
					<Button onClick={closeModal} color='white' type='button' size='small'>
						<S.MyText variant='body-2'>Отмена</S.MyText>
					</Button>
					<Button
						onClick={
							changeTypesWork
								? () => {
										changeTypesWork();
										refetch();
										onClose();
								  }
								: onClose
						}
						color='white'
						type='button'
						size='small'
					>
						<S.MyText variant='body-2' color='primary'>
							Сохранить
						</S.MyText>
					</Button>
				</View>
			</S.MyModal>
		</>
	);
};
