import { FC } from 'react';
import { TableHead } from './TableHead/TableHead';
import { TableRow } from './TableRow/TableRow';
import { useGanttTableController } from './GanttTableController';

import { Text, Switch } from 'reshaped/bundle';
import * as S from './GanttTable.styled';

interface IGanttTableProps {
	data: IGanttItem[];
	isFetching: boolean;
	activateTaskModal: () => void;
}

export const GanttTable: FC<IGanttTableProps> = ({ data, isFetching, activateTaskModal }) => {
	const { interval, start, showPlan, setShowPlan } = useGanttTableController(data);

	return (
		<S.Table>
			<S.PlanSwitch>
				<Switch name='plan' checked={showPlan} onChange={(e) => setShowPlan(e.checked)} />
				<Text variant='caption-1'>План</Text>
			</S.PlanSwitch>
			<TableHead interval={interval} />
			{data.map((item) => (
				<TableRow
					key={item.id}
					item={item}
					interval={interval}
					start={start}
					showPlan={showPlan}
					isFetching={isFetching}
					activateTaskModal={activateTaskModal}
				/>
			))}
		</S.Table>
	);
};
