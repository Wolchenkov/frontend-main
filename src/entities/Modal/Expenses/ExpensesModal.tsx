import { FC } from 'react';
import { SvgComponent } from '../../../shared';
import { Button, Divider, FormControl, Modal, View } from 'reshaped/bundle';
import * as S from './ExpensesModal.styled';
import { PillCalendarExpenses } from './PillCalendarExpenses';
import { format } from 'date-fns';
import { PillPersonExpenses } from './PillPersonExpenses';
import { useExpensesModalController } from './ExpensesModalController';

interface IEditExpensesModal {
	active: boolean;
	onClose: () => void;
	projectMembers: IMember[];
	data?: IOneExpense;
	setExpensesData: React.Dispatch<React.SetStateAction<IOneExpense[] | undefined>>;
}

export const ExpensesModal: FC<IEditExpensesModal> = ({ onClose, active, projectMembers, data }) => {
	const {
		closeModal,
		error,
		setCost,
		cost,
		updateDate,
		date,
		performer,
		updatePerformer,
		description,
		setDescription,
		newExpense,
	} = useExpensesModalController({ data, onClose });
	return (
		<>
			<S.MyModal size='520px' active={active} onClose={closeModal} padding={0}>
				<View padding={4} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
					<Modal.Title>
						<S.MyText variant='body-2'>{data?.id ? 'Редактировать расходы' : 'Расходы'}</S.MyText>
					</Modal.Title>
					<SvgComponent
						name='close-line-modal'
						style={{ cursor: 'pointer', pointerEvents: 'all' }}
						onClick={closeModal}
					/>
				</View>
				<Divider />

				<S.InputWrapper error={error.cost || error.description}>
					<View paddingBottom={3} direction='row' gap={2}>
						<S.MyInputCost
							hasError={error.cost}
							name='cost'
							value={cost.toLocaleString('ru-RU')}
							placeholder='Сумма'
							onChange={(args) => {
								const value = args.value.replace(/\D/g, '');
								if (value === '') {
									setCost('');
									return;
								}
								if (value.length > 9) return;
								setCost(Number(value));
							}}
							startIcon={<SvgComponent name='money-ruble-circle-line' />}
							inputAttributes={{ autoComplete: 'off' }}
						/>
						<PillCalendarExpenses
							onChange={updateDate}
							title={format(date, 'dd.MM')}
							icon='calendar-todo-line'
							selectedDate={date}
						/>
						{performer ? (
							<PillPersonExpenses onChange={updatePerformer} me={performer} members={projectMembers} />
						) : null}
					</View>
					<FormControl>
						<FormControl.Label>Комментарий</FormControl.Label>
						<S.MyInputDescription
							hasError={error.description}
							value={description}
							name='comment'
							placeholder='Введите комментарий'
							onChange={(args) => setDescription(args.value)}
							inputAttributes={{ autoComplete: 'off', style: { maxHeight: '56px', minHeight: '56px' } }}
						/>
					</FormControl>
					{error.cost || error.description ? <S.TextError variant='caption-1'>Заполните все поля</S.TextError> : null}
				</S.InputWrapper>
				<S.ButtonWrapper>
					<Button onClick={closeModal} size='small'>
						Отменить
					</Button>
					<Button onClick={newExpense} color='primary' type='button' size='small'>
						{data?.id ? 'Сохранить' : 'Добавить'}
					</Button>
				</S.ButtonWrapper>
			</S.MyModal>
		</>
	);
};
