import React, { FC, useEffect, useState } from 'react';
import * as S from './General.styled';
import { Switch, Text, View } from 'reshaped/bundle';
import { useGetGeneralQuery, useSetGeneralMutation } from '../../../store/management/managementApi';

export const ManagementGeneral: FC = () => {
	// const [is2FA, setIs2FA] = useState(false);
	const [isTimeConfirm, setIsTimeConfirm] = useState(false);

	const { data: general } = useGetGeneralQuery();
	const [setGeneralSettings] = useSetGeneralMutation();

	useEffect(() => {
		if (general) {
			// setIs2FA(general.twoFactor);
			setIsTimeConfirm(general.timeApprove);
		}
	}, [general]);

	return (
		<>
			<S.Title variant='title-3'>Общие</S.Title>
			<S.Description variant='body-2'>
				Здесь вы можете настроить общие функции, для всех команд и проектов
			</S.Description>

			{general && (
				<S.Switchers>
					{/* <View direction='row' gap={2}>
						<Switch
							name='2FA'
							checked={is2FA}
							onChange={({ checked }) => {
								setIs2FA(checked);
								setGeneralSettings('twoFactor');
							}}
						/>
						<Text variant='body-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
							Двухфакторная аутентификация
						</Text>
					</View> */}

					<View direction='row' gap={2}>
						<Switch
							name='time-confirm'
							checked={isTimeConfirm}
							onChange={({ checked }) => {
								setIsTimeConfirm(checked);
								setGeneralSettings('timeApprove');
							}}
						/>
						<Text variant='body-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
							Согласование времени
						</Text>
					</View>
				</S.Switchers>
			)}
		</>
	);
};
