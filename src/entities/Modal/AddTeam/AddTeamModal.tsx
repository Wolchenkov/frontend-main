import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Divider, Modal, Text, View, useToggle } from 'reshaped/bundle';
import { ChangeRateModal } from './ChangeRateModal';
import { useCreateClientTeamMutation, useCreateTeamMutation } from '../../../store/teams/teamsApi';
import * as S from './AddTeamModal.styled';
import { SvgComponent } from '../../../shared';
import { useShowToast } from '../../../shared/utility/Hooks';
interface IAddTeamModalprops {
	mode: 'ourTeams' | 'clientTeams';
	active: boolean;
	onClose: () => void;
	size: string;
	names: string[] | undefined;
}
// interface IFetchingTypesData {
// 	id: number;
// 	cost: number;
// }

export const AddTeamModal: FC<IAddTeamModalprops> = ({ mode, active, onClose, size, names }) => {
	const [teamName, setTeamName] = useState(''); // название команды
	const inputRef = useRef<HTMLInputElement>(null); // ссылка на инпут
	const [errorMessage, setErrorMessage] = useState(false); // валидация названия этапа

	const {
		active: activeModalChangeRate,
		activate: activateModalChangeRate,
		deactivate: deactivateModalChangeRate,
	} = useToggle(false); //  модалкa редакирования ставок

	useEffect(() => {
		if (active) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 100);
		}
	}, [active]);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setTeamName(e.target.value);
	};

	const closeModal = () => {
		onClose();
		setTeamName('');
		setErrorMessage(false);
	};

	const [fetchingTypesData, setFetchingTypesData] = useState<fetchingTypeWork[]>([]);

	const [newTeam] = useCreateTeamMutation();
	const [newClientTeam] = useCreateClientTeamMutation();
	const showToast = useShowToast();
	const createTeam = () => {
		if (names?.map((el) => el.toLowerCase())?.includes(teamName.trim().toLowerCase())) {
			setErrorMessage(true);
			return;
		}
		if (mode === 'ourTeams') {
			newTeam({ name: teamName.trim(), type_work: fetchingTypesData.map((type) => ({ id: type.id, cost: type.cost })) })
				.then(() => {
					closeModal();
				})
				.catch((error) => {
					showToast(`Ошибка! ${error?.data?.message}`);
				});
		} else {
			newClientTeam({ name: teamName.trim() })
				.then(() => {
					closeModal();
				})
				.catch((error) => {
					showToast(`Ошибка! ${error?.data?.message}`);
				});
		}
	};

	return (
		<>
			<S.MyModal size={size} active={active} onClose={closeModal} padding={0}>
				<View padding={4} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
					<Modal.Title>
						<S.MyText variant='body-2'>Создать команду</S.MyText>
					</Modal.Title>
					<SvgComponent
						name='close-line-modal'
						style={{ cursor: 'pointer', pointerEvents: 'all' }}
						onClick={closeModal}
					/>
				</View>
				<Divider />
				<View padding={4}>
					<View paddingBottom={errorMessage ? 7 : 13}>
						<S.MyInput
							value={teamName}
							ref={inputRef}
							placeholder='Введите название команды...'
							onChange={(e) => handleOnChange(e)}
						/>
						{errorMessage && (
							<Text
								color='critical'
								variant='caption-1'
								attributes={{ style: { fontWeight: '500', letterSpacing: '-0.01em', marginTop: 8 } }}
							>
								Такое название уже существует, введите другое название
							</Text>
						)}
					</View>
				</View>
				<Divider />

				<View
					direction='row'
					align='center'
					padding={4}
					attributes={{ style: { justifyContent: mode === 'ourTeams' ? 'space-between' : 'end' } }}
				>
					{mode === 'ourTeams' && (
						<Button onClick={activateModalChangeRate} color='white' type='button' size='small'>
							<S.MyText color='primary' variant='body-2'>
								Установить ставки
							</S.MyText>
						</Button>
					)}
					<Button
						onClick={createTeam}
						disabled={teamName.trim().length === 0}
						color='primary'
						type='button'
						size='small'
					>
						Добавить
					</Button>
				</View>
				{mode === 'ourTeams' && (
					<ChangeRateModal
						size='480px'
						active={activeModalChangeRate}
						onClose={deactivateModalChangeRate}
						setFetchingTypesData={setFetchingTypesData}
						fetchingTypesData={fetchingTypesData}
					/>
				)}
			</S.MyModal>
		</>
	);
};
