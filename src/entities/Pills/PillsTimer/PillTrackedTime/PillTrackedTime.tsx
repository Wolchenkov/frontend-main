import { SvgComponent } from '../../../../shared';
import React, { Dispatch, FC, SetStateAction, useRef } from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
// import { format } from 'date-fns';

interface PillTrackedTimeProps {
	inputValue: string;
	setInputValue: Dispatch<SetStateAction<string>>;
}
// export const MyInputTime = styled(TextField)`
// 	width: 80px;
// 	height: 20px;
// 	font-family: 'Inter', sans-serif;
// 	font-style: normal;
// 	font-weight: 400;
// 	font-size: 14px;
// 	line-height: 20px;
// 	letter-spacing: -0.02em;
// 	caret-color: #ff6633;
// `;

// export const InputMaskWrapper = styled(InputMask)`
// 	width: 89px;
// 	caret-color: #ff6633;
// 	font-size: 14px;
// 	font-style: normal;
// 	font-weight: 400;
// 	line-height: 20px;
// 	border: none;
// 	outline: 1px solid #cfd0d3 !important;
// 	border-radius: 6px;
// 	outline-offset: -1px;

// 	padding-left: 25px;  // добавляем отступ слева

// 	&::placeholder {
// 		color: rgba(137, 139, 143, 1);
// 	}

// 	&:focus {
// 		outline: 2px solid #f63 !important;
// 	}
// `;

export const SvgContainer = styled.div`
	position: relative;
	width: 89px;
	padding: 4px 8px;
	height: 36px; // устанавливаем высоту контейнера
	border: none;
	outline: 1px solid #cfd0d3;
	border-radius: 6px;
	outline-offset: -1px;

	&:focus-within {
		outline: 2px solid #f63;
	}
`;

export const SvgWrapper = styled.div`
	position: absolute;
	left: 5px;
	top: 59%;
	transform: translateY(-50%);
`;

export const InputMaskWrapper = styled(InputMask)`
	width: 100%;
	height: 100%;
	color: #52555d;
	padding-left: 24px;
	caret-color: #ff6633;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;

	border: none;

	&::placeholder {
		color: rgba(137, 139, 143, 1);
	}

	&:focus {
		outline: none;
	}
`;

export const PillTrackedTime: FC<PillTrackedTimeProps> = ({ inputValue, setInputValue }) => {
	const timerRedactorRef = useRef<any>(null);
	const resultMask = [/[0-9]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];
	// const checkInput = (value: string, index: number) => {
	// 	switch (index) {
	// 		case 0:
	// 		case 1:
	// 		case 4:
	// 			return /[0-9]/.test(value);
	// 		case 2:
	// 			return value === ':';
	// 		case 3:
	// 			return /[0-5]/.test(value);
	// 		default:
	// 			return false;
	// 	}
	// };

	// const handleInputChange = (args: any) => {
	// 	let value = args.value.replace(/[^0-9:]/g, '');
	// 	if (value.length > 5) value = value.slice(0, 5);
	// 	// Добавление двоеточия после первых двух чисел
	// 	if (value.length === 2 && value[2] !== ':') value = value + ':';
	// 	// Проверка каждого символа
	// 	for (let i = 0; i < value.length; i++) {
	// 		if (!checkInput(value[i], i)) {
	// 			value = value.substring(0, i) + value.substring(i + 1);
	// 		}
	// 	}

	// 	setInputValue(value);
	// };

	return (
		<>
			{/* <MyInputTime
				name='estimate'
				value={inputValue || ''}
				placeholder='00:00'
				onChange={(args) => {
					handleInputChange(args);
				}}
				startIcon={<SvgComponent name='timer-line' />}
				inputAttributes={{ autoComplete: 'off' }}
			/> */}
			<SvgContainer>
				<SvgWrapper>
					<SvgComponent name='timer-line' />
				</SvgWrapper>
				<InputMaskWrapper
					placeholder='00:00'
					maskPlaceholder={null}
					ref={timerRedactorRef}
					mask={resultMask}
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
			</SvgContainer>
		</>
	);
};
