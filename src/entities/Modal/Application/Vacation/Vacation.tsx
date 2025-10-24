import React, { FC } from 'react';
import * as S from './Vacation.styled';
import { DropdownMenu, Text } from 'reshaped/bundle';
import { useVacationController } from './VacationController';
import { SvgComponent } from '../../../../shared';

interface IVacationProps {
	types: fetchingDictionaryVacation[];
	onChange: (fieldName: keyof INewApplication, fieldValue: INewApplication[keyof INewApplication]) => void;
}

export const Vacation: FC<IVacationProps> = ({ types, onChange }) => {
	const { isDropdownActive, selectedOption, handleVacationButtonClick, handleModalClose, setSelectedOption } =
		useVacationController({ onChange });

	return (
		<DropdownMenu
			width='391px'
			position='bottom-start'
			forcePosition
			active={isDropdownActive}
			onClose={handleModalClose}
		>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<S.VacationButton
						{...attributes}
						variant='outline'
						size='medium'
						startIcon={<SvgComponent name='file-list' />}
						endIcon={<SvgComponent name={isDropdownActive ? 'arrow-up-fill' : 'arrow-down-fill'} />}
						onClick={handleVacationButtonClick}
					>
						<Text
							variant='body-2'
							attributes={{ style: { flexGrow: '1', marginLeft: '4px', letterSpacing: '-0.02em' } }}
							color={selectedOption ? 'neutral' : 'neutral-faded'}
						>
							{selectedOption ? selectedOption.value : 'Выберите тип '}
						</Text>
					</S.VacationButton>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{types.map((type) => (
					<DropdownMenu.Item
						key={type.id}
						attributes={{
							style: {
								marginTop: '4px',
								background: `${selectedOption && selectedOption.id === type.id ? '#E9E9EB' : ''}`,
							},
						}}
						onClick={() => setSelectedOption(type)}
					>
						<Text variant='body-2' attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}>
							{type.value}
						</Text>
					</DropdownMenu.Item>
				))}
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
