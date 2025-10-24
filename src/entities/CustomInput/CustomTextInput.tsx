import React, { ChangeEvent } from 'react';
import * as S from './CustomTextInput.styled';

interface ICustomProps extends React.ComponentPropsWithoutRef<'input'> {
	placeholder: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextInputComponent: React.ForwardRefRenderFunction<HTMLInputElement, ICustomProps> = (
	{ placeholder, onChange, ...rest },
	ref
) => {
	return <S.StyledInput ref={ref} onChange={onChange} placeholder={placeholder} {...rest} />;
};

export const CustomTextInput = React.forwardRef<HTMLInputElement, ICustomProps>(CustomTextInputComponent);
CustomTextInput.displayName = 'CustomTextInput';
