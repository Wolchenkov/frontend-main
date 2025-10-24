import { FC } from 'react';
import { ExpensesModal, ExpensesTable } from '../../../entities';
import styled from 'styled-components';
import { SvgComponent } from '../../../shared';
import { Button, Text, View, useToggle } from 'reshaped/bundle';
interface IExpensesProps {
	projectMembers: IMember[];
	expensesData: IOneExpense[] | undefined;
	setExpensesData: React.Dispatch<React.SetStateAction<IOneExpense[] | undefined>>;
}
export const MainContainer = styled.main`
	height: calc(100vh - 144px);
	overflow: auto;
	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar {
		width: 4px;
		background-color: transparent;
		border-radius: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(207, 208, 211, 0.5);
	}
`;
export const EmptyExpenses = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 144px);
`;
export const EmptyExpensesText = styled(Text)`
	letter-spacing: -0.02em;
	font-weight: 600;
	width: 330px;
`;

export const Expenses: FC<IExpensesProps> = ({ projectMembers, expensesData, setExpensesData }) => {
	const {
		active: isDropdownExpensesActive,
		activate: activateDropdownExpenses,
		deactivate: deactivateDropdownExpenses,
	} = useToggle(false); // модалка расходов

	return (
		<MainContainer>
			{expensesData?.length ? (
				<ExpensesTable expensesData={expensesData} setExpensesData={setExpensesData} projectMembers={projectMembers} />
			) : (
				<>
					<EmptyExpenses>
						<SvgComponent name='history-fill-avatar' />
						<View gap={1}>
							<EmptyExpensesText variant='featured-3' align='center'>
								Добавьте первый расход
							</EmptyExpensesText>
							<Text
								color='neutral-faded'
								variant='caption-1'
								attributes={{ style: { fontWeight: 500, letterSpacing: '-0.02em' } }}
							>
								Расходов еще нет, добавьте первый расход по проекту
							</Text>
						</View>
						<Button
							variant='outline'
							size='small'
							attributes={{ style: { fontWeight: 500, letterSpacing: '-0.02em' } }}
							onClick={activateDropdownExpenses}
						>
							Добавить расход
						</Button>
					</EmptyExpenses>
					<ExpensesModal
						active={isDropdownExpensesActive}
						onClose={deactivateDropdownExpenses}
						projectMembers={projectMembers}
						setExpensesData={setExpensesData}
					/>
				</>
			)}
		</MainContainer>
	);
};
