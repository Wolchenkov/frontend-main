/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import * as S from './FilterPriority.styled';
import { SvgComponent } from '../../../../shared';
import { DropdownMenu, useToggle } from 'reshaped/bundle';
import { useGetIssuePrioritiesQuery } from '../../../../store/dictionaries/dictionariesApi';

interface IFilterPriorityProps {
	value: null;
	onChange: ({ priority }: { priority: number | null }) => void;
}

export const FilterPriority: FC<IFilterPriorityProps> = ({ value, onChange }) => {
	const { data: priorities = [] } = useGetIssuePrioritiesQuery();
	const { active: isMenuActive, activate: activateMenu, deactivate: deactivateMenu } = useToggle(false);
	const [activeFilter, setActiveFilter] = useState<fetchingDictionaryPriority | null>(null);

	useEffect(() => {
		onChange({ priority: activeFilter !== null ? activeFilter.id : null });
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
					<S.FilterPriorityButton
						{...attributes}
						size='small'
						variant='ghost'
						endIcon={<SvgComponent name={isMenuActive ? 'arrow-up-fill' : 'arrow-down-fill'} />}
						onClick={() => (isMenuActive ? deactivateMenu() : activateMenu())}
					>
						<S.FilterPriorityText variant='caption-1'>
							{activeFilter === null ? (
								<>
									Приоритет:&nbsp;
									<span>все</span>
								</>
							) : (
								activeFilter.priority
							)}
						</S.FilterPriorityText>
					</S.FilterPriorityButton>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item
					attributes={{ style: { letterSpacing: '-0.02em', background: `${activeFilter === null ? '#F6F6F7' : ''}` } }}
					onClick={() => setActiveFilter(null)}
				>
					Все
				</DropdownMenu.Item>
				{priorities.map((priority) => (
					<DropdownMenu.Item
						key={priority.id}
						endSlot={<S.FilterPriorityBadge color={priority.color} />}
						attributes={{
							style: {
								letterSpacing: '-0.02em',
								background: `${activeFilter && activeFilter.id === priority.id ? '#F6F6F7' : ''}`,
							},
						}}
						onClick={() => setActiveFilter(priority)}
					>
						{priority.priority}
					</DropdownMenu.Item>
				))}
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
