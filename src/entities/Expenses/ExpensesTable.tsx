import { FC } from 'react';
import { ExpensesHeader } from './ExpensesHeader/ExpansesHeader';
import { ExpensesRow } from './ExpensesRow/ExpensesRow';
interface IExpensesTableProps {
	expensesData: IOneExpense[] | undefined;
	setExpensesData: React.Dispatch<React.SetStateAction<IOneExpense[] | undefined>>;
	projectMembers: IMember[];
}

export const ExpensesTable: FC<IExpensesTableProps> = ({ expensesData, setExpensesData, projectMembers }) => {
	return (
		<table style={{ width: '100%' }}>
			{expensesData?.length ? <ExpensesHeader /> : null}
			<tbody>
				{expensesData?.map((expense) => (
					<ExpensesRow
						key={expense.id}
						data={expense}
						setExpensesData={setExpensesData}
						projectMembers={projectMembers}
					/>
				))}
			</tbody>
		</table>
	);
};
