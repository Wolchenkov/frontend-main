import { Dispatch, FC, SetStateAction } from 'react';
import { Checkbox, Text } from 'reshaped/bundle';

interface IAuthInputProps {
	setCheckbox: Dispatch<SetStateAction<boolean>>;
}

export const AuthCheckbox: FC<IAuthInputProps> = ({ setCheckbox }) => {
	return (
		<>
			<Checkbox name='rememberMe' onChange={({ event }) => setCheckbox(event.target.checked)}>
				<Text variant='body-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
					Запомнить меня
				</Text>
			</Checkbox>
		</>
	);
};
