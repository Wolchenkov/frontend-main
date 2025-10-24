import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import Link from 'next/link';
import * as S from './Item.styled';
import { Badge, Icon, Text, View } from 'reshaped/bundle';
import { SvgComponent } from '../../../../shared';
import { TasksRow } from '../Row/Row';

interface ITasksItemProps {
	data: IMyWorkTask;
	setActiveTaskData: Dispatch<SetStateAction<{ id: number; projectSlug: string } | undefined>>;
}

export const TasksItem: FC<ITasksItemProps> = ({ data, setActiveTaskData }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const { slug, name, project_issues } = data;

	return (
		<>
			<View direction='row' gap={2} attributes={{ style: { padding: '4px 4px 4px 20px', marginBottom: '16px' } }}>
				<Icon
					size={5}
					svg={<SvgComponent name='arrow-right-fill-black' onClick={() => setIsExpanded((prevState) => !prevState)} />}
					attributes={{
						style: {
							transform: `${isExpanded ? 'rotate(90deg)' : 'none'}`,
							transition: 'transform 0.3s ease',
							cursor: 'pointer',
						},
					}}
				/>
				<Link href={`/project/${slug}`}>
					<S.ItemLink>
						<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
							{name}
						</Text>
					</S.ItemLink>
				</Link>
				<Badge color='primary' size='small' variant='faded'>
					{project_issues.length}
				</Badge>
			</View>

			<S.Table isExpanded={isExpanded}>
				<S.TableHead>
					<S.TableHeadCell variant='caption-1' color='neutral-faded'>
						Задачи
					</S.TableHeadCell>
					<S.TableHeadCell variant='caption-1' color='neutral-faded'>
						Оценка
					</S.TableHeadCell>
					<S.TableHeadCell variant='caption-1' color='neutral-faded'>
						Факт
					</S.TableHeadCell>
				</S.TableHead>
				{project_issues.map((issue) => (
					<TasksRow key={issue.id} projectSlug={slug} data={issue} setActiveTaskData={setActiveTaskData} />
				))}
			</S.Table>
		</>
	);
};
