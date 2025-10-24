import React, { ChangeEvent, KeyboardEvent, ForwardedRef } from 'react';
import * as S from './CustomNumberInput.styled';

interface ICustomProps {
	placeholder: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomNumberInput = ({ placeholder, onChange }: ICustomProps, ref: ForwardedRef<HTMLInputElement>) => {
	const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		const input = event.currentTarget;
		if (!/[0-9]/.test(event.key) || input.value.length >= 4) {
			event.preventDefault();
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		const numberValue = inputValue.replace(/[^0-9]/g, '');
		const formattedValue = Number(numberValue).toLocaleString('ru-RU');
		event.target.value = formattedValue;
		onChange(event);
	};

	return (
		<S.StyledInput
			ref={ref}
			onChange={handleChange}
			type='text'
			placeholder={placeholder}
			onKeyPress={handleKeyPress}
		/>
	);
};

export default React.forwardRef<HTMLInputElement, ICustomProps>(CustomNumberInput);
