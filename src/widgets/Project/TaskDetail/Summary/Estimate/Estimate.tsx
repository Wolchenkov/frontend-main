import { FC } from 'react';
import { Actionable, Button, DropdownMenu, View } from 'reshaped/bundle';
import { formatMinutesToHours } from '../../../../../shared/utility/Utils';
import { SvgComponent } from '../../../../../shared';
import * as S from './Estimate.styled';
import { useEstimateController } from './EstimateController';

interface ITaskSummaryProps {
	taskState: ITaskDetail;
	setTaskState: React.Dispatch<React.SetStateAction<ITaskDetail | null>>;
	refetchTaskData: any;
	projectSlugData?: string;
}

export const Estimate: FC<ITaskSummaryProps> = ({ taskState, setTaskState, refetchTaskData, projectSlugData }) => {
	const {
		isDropdownEstimateActive,
		handlePillButtonClick,
		inputValue,
		handleInputChange,
		active,
		deactivate,
		activate,
		typesWork,
		setTypeWork,
		typeWork,
		cancelation,
		onSave,
	} = useEstimateController({ taskState, setTaskState, refetchTaskData, projectSlugData });

	return (
		<DropdownMenu width='320px' position='bottom-end' active={isDropdownEstimateActive} onClose={handlePillButtonClick}>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<S.TriggerButton
						{...attributes}
						variant='ghost'
						size='small'
						highlighted={isDropdownEstimateActive}
						onClick={handlePillButtonClick}
					>
						{taskState.estimate && taskState.type_work_id ? (
							<S.MyText variant='caption-1'>{formatMinutesToHours(taskState.estimate)}</S.MyText>
						) : (
							<S.MyText variant='caption-1'>{'—'}</S.MyText>
						)}
					</S.TriggerButton>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<View padding={4} direction='row' gap={2} width='320px'>
					<S.MyInputTime
						name='estimate'
						value={inputValue || ''}
						placeholder='00:00'
						onChange={(args) => {
							handleInputChange(args);
						}}
						startIcon={<SvgComponent name='time-line-16' />}
						inputAttributes={{ autoComplete: 'off' }}
					/>
					<DropdownMenu active={active} onClose={deactivate} width='148px' position='bottom-end'>
						<DropdownMenu.Trigger>
							{(attributes) => (
								<Actionable {...attributes} onClick={() => (active ? deactivate() : activate())}>
									<S.MyInput
										inputAttributes={{ autoComplete: 'off' }}
										value={typeWork?.type || 'Выберите тип работ'}
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
					<View paddingTop={4} direction='row' justify='end' align='end' width='100%' gap={1}>
						<Button size='small' onClick={cancelation}>
							Отменить
						</Button>
						<Button
							size='small'
							color='primary'
							onClick={onSave}
							disabled={!(inputValue?.length) || typeWork === undefined}
						>
							Сохранить
						</Button>
					</View>
				</View>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
