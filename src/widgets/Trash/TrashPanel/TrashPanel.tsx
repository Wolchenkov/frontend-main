import React, { FC } from 'react';
import { Button, DropdownMenu } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import * as S from './TrashPanel.styled';
import { TRASH_OPTIONS } from '../../../shared/utility/Constants/trashOptions';

interface ITrashPanelProps {
	filter: { value: string; label: string };
	setFilter: React.Dispatch<React.SetStateAction<{ value: string; label: string }>>;
}

export const TrashPanel: FC<ITrashPanelProps> = ({ filter, setFilter }) => {
	return (
		<S.TrashPanel>
			<DropdownMenu width='265px'>
				<DropdownMenu.Trigger>
					{(attributes) => (
						<Button
							{...attributes}
							size='medium'
							variant='outline'
							endIcon={<SvgComponent name='arrow-down' />}
							attributes={{
								style: {
									justifyContent: 'space-between',
									width: '265px',
									padding: '7px',
									color: '#52555D',
									backgroundColor: '#FFFFFF',
									letterSpacing: '-0.02em',
								},
							}}
						>
							{filter.label}
						</Button>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					{TRASH_OPTIONS.map((option) => (
						<DropdownMenu.Item key={option.value} onClick={() => setFilter(option)}>
							{option.label}
						</DropdownMenu.Item>
					))}
				</DropdownMenu.Content>
			</DropdownMenu>
		</S.TrashPanel>
	);
};
