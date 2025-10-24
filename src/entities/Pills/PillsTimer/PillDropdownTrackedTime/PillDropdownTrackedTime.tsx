import { SvgComponent } from '../../../../shared';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

interface PillDropdownTrackedTimeProps {
	formattedTime: string;
	inputTimeValue: string;
	setInputTimeValue: Dispatch<SetStateAction<string>>;
}

export const SvgContainer = styled.div`
	position: relative;
	width: 89px;
	padding: 4px 8px;
	height: 36px;
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

export const PillDropdownTrackedTime: FC<PillDropdownTrackedTimeProps> = ({ formattedTime, inputTimeValue, setInputTimeValue }) => {
	const [inputValue, setInputValue] = useState(inputTimeValue || formattedTime);

	useEffect(() => {
		setInputTimeValue(inputValue);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue]);

	return (
		<SvgContainer>
			<SvgWrapper>
				<SvgComponent name='timer-line' />
			</SvgWrapper>
			<InputMaskWrapper
				placeholder='00:00'
				maskPlaceholder={null}
				mask={[/[0-9]/, /[0-9]/, ':', /[0-5]/, /[0-9]/]}
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
		</SvgContainer>
	);
};
