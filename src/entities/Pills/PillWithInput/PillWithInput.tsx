import React, { FC, KeyboardEvent } from 'react';
import * as S from './PillWithInput.styled';
import { Button, DropdownMenu, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { usePillWithInputController } from './PillWithInputController';

interface IPillWithInputProps {
	width?: string;
	title: string;
	icon?: string;
	placeholder: string;
	name: string;
	value?: string;
	isRequired?: boolean;
	handleKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
	transformInputValue?: (value: string) => string;
	transformShownValue?: (value: string) => string;
	onChange: (fieldName: string, fieldValue: string) => void;
}

export const PillWithInput: FC<IPillWithInputProps> = ({
	width,
	title,
	icon,
	placeholder,
	name,
	value,
	isRequired,
	handleKeyPress,
	transformInputValue,
	transformShownValue,
	onChange,
}) => {
	const {
		isPillActive,
		isDropdownActive,
		pillTitle,
		inputValue,
		isInputValueValid,
		handlePillButtonClick,
		handleModalClose,
		handleConfirmButtonClick,
		setInputValue,
	} = usePillWithInputController(title, name, onChange, value);

	return (
		<DropdownMenu
			position='bottom-start'
			forcePosition
			width={width ? width : '324px'}
			active={isDropdownActive}
			onClose={handleModalClose}
		>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<S.PillButton
						{...attributes}
						variant='outline'
						size='small'
						startIcon={icon ? <SvgComponent name={icon} /> : <></>}
						active={isPillActive}
						onClick={handlePillButtonClick}
						isRequired={isRequired}
					>
						<Text
							variant='caption-1'
							attributes={{
								style: { fontWeight: '500', letterSpacing: '-0.01em', marginLeft: `${icon ? '0' : '-4px'}` },
							}}
						>
							{pillTitle}
						</Text>
					</S.PillButton>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<S.PillInput
					size='medium'
					name='project-id'
					placeholder={placeholder}
					endSlot={
						<Button
							size='small'
							startIcon={<SvgComponent name='check' />}
							disabled={!inputValue}
							onClick={handleConfirmButtonClick}
						/>
					}
					value={transformShownValue ? transformShownValue(inputValue) : inputValue}
					onChange={(event) => setInputValue(transformInputValue ? transformInputValue(event.value) : event.value)}
					inputAttributes={{
						autoComplete: 'off',
						onKeyPress: handleKeyPress ? handleKeyPress : undefined,
					}}
				/>
				{!isInputValueValid && (
					<Text
						color='critical'
						variant='caption-1'
						attributes={{ style: { fontWeight: '500', letterSpacing: '-0.01em', margin: '8px 0 4px' } }}
					>
						Проект с таким номером уже существует
					</Text>
				)}
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
