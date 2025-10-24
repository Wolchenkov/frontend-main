import { FC } from 'react';
import { AvatarCustom, SvgComponent } from '../../../../../shared';
import { Actionable, Divider, DropdownMenu, Icon } from 'reshaped/bundle';
import * as S from '../TaskSummary.styled';
import { getInitials } from '../../../../../shared/utility/Utils';
import { usePerformerController } from './PerformerController';
interface ITaskSummaryProps {
	taskState: ITaskDetail;
	setTaskState?: React.Dispatch<React.SetStateAction<ITaskDetail | null>>;
	setChildState?: React.Dispatch<React.SetStateAction<ITaskDetail | null>>;
	dataProject: IOneProject;
	refetchTaskData: any;
	isClientRole?: boolean;
}

export const Performer: FC<ITaskSummaryProps> = ({
	taskState,
	setTaskState,
	setChildState,
	dataProject,
	refetchTaskData,
	isClientRole,
}) => {
	const {
		isDropdownPerformerActive,
		handlePillButtonClick,
		pillRef,
		dropDownMaxHeight,
		filter,
		setFilter,
		shownOptions,
		selectedOption,
		setSelectedOption,
	} = usePerformerController({
		taskState,
		setTaskState,
		setChildState,
		dataProject,
		refetchTaskData,
	});
	return (
		<DropdownMenu position='bottom-end' active={isDropdownPerformerActive} onClose={handlePillButtonClick}>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<div ref={pillRef}>
						<Actionable {...attributes} onClick={!isClientRole ? handlePillButtonClick : undefined}>
							{taskState.delegate_id && taskState.delegate ? (
								<AvatarCustom
									src={taskState?.delegate?.avatar ? taskState.delegate.avatar : ''}
									color='positive-faded'
									initials={getInitials(taskState.delegate.name ? taskState.delegate.name : '')}
									size={6}
								/>
							) : (
								<SvgComponent name='not-delegated' />
							)}
						</Actionable>
					</div>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<S.PillDropdownMenuContentWrap maxHeight={dropDownMaxHeight}>
					<S.PillInput
						size='medium'
						name='project-id'
						placeholder='Поиск...'
						value={filter}
						onChange={({ value }) => setFilter(value)}
						inputAttributes={{ autoComplete: 'off', style: { fontWeight: '500', letterSpacing: '-0.02em' } }}
					/>
					<Divider />
					{(shownOptions as IMember[]).map((member) => (
						<DropdownMenu.Item
							key={member.id}
							attributes={{
								style: {
									marginTop: '4px',
									background: `${selectedOption && selectedOption.id === member.id ? '#E9E9EB' : ''}`,
								},
							}}
							onClick={() => setSelectedOption(member)}
						>
							<S.PillDropdownItemContent>
								<AvatarCustom src={member.avatar ? member.avatar : undefined} initials={getInitials(member.name)} size={6} />
								<S.PillDropdownItemText
									variant='body-2'
									attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}
								>
									{member.name}
								</S.PillDropdownItemText>
								{selectedOption && selectedOption.id === member.id && (
									<Icon
										size={4}
										svg={<SvgComponent name='check-fill' />}
										attributes={{
											style: {
												flexShrink: 0,
												position: 'absolute',
												top: '50%',
												right: '0',
												transform: 'translateY(-50%)',
											},
										}}
									/>
								)}
							</S.PillDropdownItemContent>
						</DropdownMenu.Item>
					))}
				</S.PillDropdownMenuContentWrap>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
