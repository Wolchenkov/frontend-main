import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Divider, Modal, Text, View } from 'reshaped/bundle';
import * as S from './ChangeTeamNameModal.styled';
import { SvgComponent } from '../../../shared';

interface IChangeTeamNameModalprops {
	active: boolean;
	onClose: () => void;
	size: string;
	approve: (teamName: string) => void;
	value: string;
	isValidName: boolean;
	setIsValidName: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChangeTeamNameModal: FC<IChangeTeamNameModalprops> = ({
	active,
	onClose,
	size,
	approve,
	value,
	isValidName,
	setIsValidName,
}) => {
	const [teamName, setTeamName] = useState(value); // название команды
	const inputRef = useRef<HTMLInputElement>(null); // ссылка на инпут

	useEffect(() => {
		if (active) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 100);
		}
	}, [active]);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setIsValidName(true);
		setTeamName(e.target.value);
	};

	const closeModal = () => {
		setIsValidName(true);
		onClose();
		setTeamName(value);
	};
	return (
		<>
			<S.MyModal size={size} active={active} onClose={closeModal} padding={0}>
				<View padding={4} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
					<Modal.Title>
						<S.MyText variant='body-2'>Переименовать команду</S.MyText>
					</Modal.Title>
					<SvgComponent
						name='close-line-modal'
						style={{ cursor: 'pointer', pointerEvents: 'all' }}
						onClick={closeModal}
					/>
				</View>
				<Divider />
				<View padding={4}>
					<View paddingBottom={!isValidName ? 7 : 13}>
						<S.MyInput
							value={teamName}
							ref={inputRef}
							placeholder='Введите новое название команды...'
							onChange={(e) => handleOnChange(e)}
						/>
						{!isValidName && (
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

				<View direction='row' align='center' padding={4} justify='end' gap={1}>
					<Button onClick={closeModal} color='white' type='button' size='small'>
						Отменить
					</Button>
					<Button
						onClick={() => approve(teamName)}
						disabled={teamName.trim().length === 0 || value === teamName}
						color='primary'
						type='button'
						size='small'
					>
						Обновить
					</Button>
				</View>
			</S.MyModal>
		</>
	);
};
