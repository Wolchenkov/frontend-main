/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import * as S from './FilterStatus.styled';
import { SvgComponent } from '../../../../shared';
import { DropdownMenu, useToggle } from 'reshaped/bundle';

const STATUSES = [
	{ id: 1, name: 'В работе' },
	{ id: 2, name: 'Не назначено' },
	{ id: 3, name: 'Просрочено' },
	{ id: 4, name: 'Завершено' },
];

interface IFilterStatusProps {
	value: null;
	onChange: ({ status }: { status: number | null }) => void;
}

export const FilterStatus: FC<IFilterStatusProps> = ({ value, onChange }) => {
	const { active: isMenuActive, activate: activateMenu, deactivate: deactivateMenu } = useToggle(false);
	const [activeFilter, setActiveFilter] = useState<{ id: number; name: string } | null>(null);

	useEffect(() => {
		onChange({ status: activeFilter !== null ? activeFilter.id : null });
	}, [activeFilter]);

	useEffect(() => {
		if (value === null) {
			setActiveFilter(value);
		}
	}, [value]);

	return (
		<DropdownMenu active={isMenuActive} onClose={deactivateMenu} position='bottom-start' forcePosition width='246px'>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<S.FilterStatusButton
						{...attributes}
						size='small'
						variant='ghost'
						endIcon={<SvgComponent name={isMenuActive ? 'arrow-up-fill' : 'arrow-down-fill'} />}
						onClick={() => (isMenuActive ? deactivateMenu() : activateMenu())}
					>
						<S.FilterStatusText variant='caption-1'>
							{activeFilter === null ? (
								<>
									Статус:&nbsp;
									<span>все</span>
								</>
							) : (
								activeFilter.name
							)}
						</S.FilterStatusText>
					</S.FilterStatusButton>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item
					attributes={{ style: { letterSpacing: '-0.02em', background: `${activeFilter === null ? '#F6F6F7' : ''}` } }}
					onClick={() => setActiveFilter(null)}
				>
					Все
				</DropdownMenu.Item>
				{STATUSES.map((status) => (
					<DropdownMenu.Item
						key={status.id}
						onClick={() => setActiveFilter(status)}
						attributes={{
							style: {
								letterSpacing: '-0.02em',
								background: `${activeFilter && activeFilter.id === status.id ? '#F6F6F7' : ''}`,
							},
						}}
					>
						{status.name}
					</DropdownMenu.Item>
				))}
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
