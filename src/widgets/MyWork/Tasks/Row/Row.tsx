import React, { Dispatch, FC, MouseEvent, SetStateAction, useState } from 'react';
import * as S from './Row.styled';
import { SvgComponent } from '../../../../shared';
import { useCompleteIssueMutation } from '../../../../store/projects/projectsApi';
import { useShowToast } from '../../../../shared/utility/Hooks';
import { formatMinutesToHours } from '../../../../shared/utility/Utils';

interface ITasksRowProps {
	projectSlug: string;
	data: {
		estimate: number | null;
		id: number;
		name: string;
		project_id: number;
		time_amount: number;
	};
	setActiveTaskData: Dispatch<SetStateAction<{ id: number; projectSlug: string } | undefined>>;
}

export const TasksRow: FC<ITasksRowProps> = ({ projectSlug, data, setActiveTaskData }) => {
	const { id, name, estimate, time_amount } = data;

	const [isRowHovered, setIsRowHovered] = useState(false);
	const [isFinishIconHovered, setIsFinishIconHovered] = useState(false);
	const [isFinishIconFocused, setIsFinishIconFocused] = useState(false);

	const [completeIssue] = useCompleteIssueMutation();
	const showToast = useShowToast();

	const handleFinishIconClick = (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		setIsFinishIconFocused(true);
		completeIssue({
			projectSlug,
			projectIssueId: id,
		})
			.unwrap()
			.then(() => {
				showToast('Задача завершена');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	return (
		<S.TableRow
			isHovered={isRowHovered}
			onMouseEnter={() => setIsRowHovered(true)}
			onMouseLeave={() => setIsRowHovered(false)}
			onClick={() => setActiveTaskData({ id, projectSlug })}
		>
			<S.TableRowCell variant='caption-1'>
				<S.TableRowFinishIcon
					size={4}
					svg={
						<SvgComponent
							name={
								isFinishIconFocused
									? 'checkbox-issue-active'
									: isFinishIconHovered
									? 'checkbox-issue-hover'
									: 'checkbox-issue-default'
							}
						/>
					}
					attributes={{
						tabIndex: 0,
						onMouseEnter: () => setIsFinishIconHovered(true),
						onMouseLeave: () => {
							setIsFinishIconHovered(false);
							setIsFinishIconFocused(false);
						},
						onClick: (e) => handleFinishIconClick(e),
					}}
				/>
				{name}
			</S.TableRowCell>
			<S.TableRowCell variant='caption-1'>{`${formatMinutesToHours(estimate)} ч`}</S.TableRowCell>
			<S.TableRowCell variant='caption-1'>{`${formatMinutesToHours(time_amount)} ч`}</S.TableRowCell>
		</S.TableRow>
	);
};
