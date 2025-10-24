import { DropdownMenu, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../../shared';
import React from 'react';
import * as S from '../../PillCalendar/PillCalendar.styled';
// import { format } from 'date-fns';

export const PillDate = () => {
	return (
		<DropdownMenu position='bottom-start'>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<div
					// ref={pillRef}
					>
						<S.PillButton
							{...attributes}
							variant='outline'
							size='small'
							startIcon={<SvgComponent name={'calendar-todo-line'} />}
							active={false}
							// onClick={handlePillButtonClick}
						>
							<Text
								variant='caption-1'
								attributes={{
									style: { fontWeight: '500', letterSpacing: '-0.01em' },
								}}
							>
								{/*{format(date, 'dd.MM')}*/}
								29.05
							</Text>
						</S.PillButton>
					</div>
				)}
			</DropdownMenu.Trigger>
		</DropdownMenu>
	);
};
