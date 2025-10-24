import { FC } from 'react';
import { Button, useToggle } from 'reshaped/bundle';
import { SvgComponent } from '../../../../../shared';
import { ExpensesModal } from '../../../../../entities';

interface IExpensesSwitcherProps {
	projectMembers: IMember[];
	setExpensesData: React.Dispatch<React.SetStateAction<IOneExpense[] | undefined>>;
}
export const ExpensesSwitcher: FC<IExpensesSwitcherProps> = ({ projectMembers, setExpensesData }) => {
	const {
		active: isDropdownExpensesActive,
		activate: activateDropdownExpenses,
		deactivate: deactivateDropdownExpenses,
	} = useToggle(false); // модалка расходов

	return (
		<>
			<Button
				color='primary'
				startIcon={<SvgComponent name='add-white' />}
				size='small'
				onClick={isDropdownExpensesActive ? deactivateDropdownExpenses : activateDropdownExpenses}
				attributes={{ style: { letterSpacing: '-0.02em' } }}
			>
				Расходы
			</Button>
			<ExpensesModal
				active={isDropdownExpensesActive}
				onClose={deactivateDropdownExpenses}
				projectMembers={projectMembers}
				setExpensesData={setExpensesData}
			/>
		</>
	);
};
