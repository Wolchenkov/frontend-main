import React, { ChangeEvent, useEffect, useRef } from 'react';
import * as S from './CustomTextArea.styled';

interface ICustomProps extends React.ComponentPropsWithoutRef<'textarea'> {
	placeholder: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const CustomTextAreaComponent: React.ForwardRefRenderFunction<HTMLTextAreaElement, ICustomProps> = (
	{ placeholder, value, onChange, ...rest },
	ref
) => {
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		if (textAreaRef && textAreaRef.current) {
			textAreaRef.current.style.height = '0px';
			const scrollHeight = textAreaRef.current.scrollHeight;
			textAreaRef.current.style.height = scrollHeight + 'px';
		}
	}, [textAreaRef, value]);

	const assignRef = (node: HTMLTextAreaElement | null) => {
		if (node) {
			textAreaRef.current = node;
		}
		if (ref) {
			typeof ref === 'function' ? ref(node) : (ref.current = node);
		}
	};

	return (
		<S.StyledTextArea
			ref={(node) => assignRef(node)}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			{...rest}
		/>
	);
};

export const CustomTextArea = React.forwardRef<HTMLTextAreaElement, ICustomProps>(CustomTextAreaComponent);
CustomTextArea.displayName = 'CustomTextArea';
