import { FC } from 'react';
import { Button, Tooltip } from 'reshaped/bundle';
import { SvgComponent } from '../../../../shared';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { useApproveTimeRecordsMutation } from '../../../../store/time/timeApi';
import { useShowToast } from '../../../../shared/utility/Hooks';
import { clearCheckedTimeRecords } from '../../../../store/time/timeSlice';

interface ITimeSwitcherProps {
	showTimeFilters: boolean;
	setShowTimeFilters: React.Dispatch<React.SetStateAction<boolean>>;
}

const TimeSwitcher: FC<ITimeSwitcherProps> = ({ showTimeFilters, setShowTimeFilters }) => {
	const checkedTimeRecords = useAppSelector((state) => state.time.checkedTimeRecords);

	const [approveTimeRecords] = useApproveTimeRecordsMutation();
	const dispatch = useAppDispatch();
	const showToast = useShowToast();

	const confirm = () => {
		const body = {
			time_records: checkedTimeRecords,
			is_approved: true,
		};

		approveTimeRecords(body).then((response) => {
			if ('error' in response) {
				showToast(`Ошибка!`);
				return;
			}
			showToast('Время согласовано', `Вы согласовали время по задачам (${checkedTimeRecords.length})`);
			dispatch(clearCheckedTimeRecords());
		});
	};

	return (
		<>
			<Button
				color='primary'
				size='small'
				startIcon={<SvgComponent name='check-fill' />}
				attributes={{ style: { letterSpacing: '-0.02em' } }}
				disabled={checkedTimeRecords.length === 0}
				onClick={() => confirm()}
			>
				Подтвердить {checkedTimeRecords.length > 0 && `(${checkedTimeRecords.length})`}
			</Button>
			<Tooltip text={showTimeFilters ? 'Скрыть фильтры' : 'Показать фильтры'} position='top'>
				{(attributes) => (
					<Button
						color={showTimeFilters ? 'primary' : 'neutral'}
						startIcon={<SvgComponent name='filter' />}
						size='small'
						attributes={{
							...attributes,
							style: showTimeFilters
								? {
										background: 'var(--rs-color-background-primary-faded)',
										color: 'var(--rs-color-background-primary)',
								  }
								: undefined,
						}}
						onClick={() => setShowTimeFilters(!showTimeFilters)}
					/>
				)}
			</Tooltip>
		</>
	);
};

export default TimeSwitcher;
