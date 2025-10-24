import { Actionable, DropdownMenu } from 'reshaped/bundle';
import { SvgComponent } from '../../../../shared';
import React, { Dispatch, FC, SetStateAction } from 'react';
import * as S from './PillTypeWork.styled';

// import { format } from 'date-fns';

interface IPillTypeWork {
	typesWork: fetchingDictionaryTypeWork[] | undefined;
	typeWork: fetchingTypeWork | undefined;
	setTypeWork: Dispatch<SetStateAction<fetchingTypeWork | undefined>>;
	active: boolean;
	activate: () => void;
	deactivate: () => void;
}

export const PillTypeWork: FC<IPillTypeWork> = ({ active, deactivate, activate, setTypeWork, typeWork, typesWork }) => {
	return (
		<DropdownMenu active={active} onClose={deactivate} width='trigger' position='bottom-end'>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<Actionable {...attributes} onClick={() => (active ? deactivate() : activate())}>
						<S.MyInput
							inputAttributes={{ autoComplete: 'off' }}
							value={typeWork?.type || 'Тип работ'}
							active={active}
							name='typeWork'
							startIcon={<SvgComponent name='briefcase-line' />}
							endIcon={<SvgComponent name={active ? 'chevron-up' : 'chevron-down'} />}
						/>
					</Actionable>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<S.PillDropdownMenuContentWrap>
					{typesWork?.map((type) => (
						<DropdownMenu.Item key={type.id} onClick={() => setTypeWork(type)}>
							{type.type}
						</DropdownMenu.Item>
					))}
				</S.PillDropdownMenuContentWrap>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
