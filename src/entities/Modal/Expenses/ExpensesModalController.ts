import { useEffect, useState } from 'react';

import { useGetUserQuery } from '../../../store/auth/authApi';
import { formatDate } from '../../../shared/utility/Utils';
import { useAddExpenseMutation, useUpdateExpenseMutation } from '../../../store/expenses/expensesApi';
import { useRouter } from 'next/router';
import { useShowToast } from '../../../shared/utility/Hooks';

interface IEditExpensesModal {
	onClose: () => void;

	data?: IOneExpense;
}

export function useExpensesModalController({ data, onClose }: IEditExpensesModal) {
	const showToast = useShowToast();
	const router = useRouter();
	const { slug: projectSlug } = router.query;
	const { data: me } = useGetUserQuery();

	const [cost, setCost] = useState(data?.cost || '');
	const [description, setDescription] = useState(data?.description || '');
	const [performer, setPerformer] = useState<any>(data?.user || me);

	useEffect(() => {
		if (me && !data?.id) setPerformer(me);
	}, [me, data]);

	const [date, setDate] = useState(data?.date ? new Date(data?.date).getTime() : Date.now());

	const updateDate = (fieldValue: any) => {
		const newDate = new Date(fieldValue).getTime();
		setDate(newDate);
	};

	const updatePerformer = (fieldValue: any) => {
		setPerformer(fieldValue);
	};

	function closeModal() {
		setCost(data?.cost ? (cost ? cost : data?.cost) : '');
		setDescription(data?.description ? (description ? description : data?.description) : '');
		setDate(data?.date ? date : Date.now());
		setPerformer(data?.user.id ? performer : me);
		setError({ cost: false, description: false });
		onClose();
	}

	const [error, setError] = useState({ cost: false, description: false });
	const [addExpense] = useAddExpenseMutation();
	const [updateExpense] = useUpdateExpenseMutation();
	const [isRequestPending, setIsRequestPending] = useState(false);

	function newExpense() {
		if (isRequestPending) return;
		if (cost.toString().trim().length === 0 || description.trim().length === 0 || cost === 0) {
			setError({
				cost: cost.toString().trim().length === 0 || cost === 0,
				description: description.trim().length === 0,
			});
			return;
		}
		setIsRequestPending(true);
		if (data?.id) {
			const payload = {
				projectSlug,
				body: { user_id: performer.id, description, date: formatDate(new Date(date)), cost: Number(cost) },
				id: data.id,
			};
			updateExpense(payload).then(() => {
				closeModal();
				showToast('Запись отредактирована');
				setIsRequestPending(false);
			});
		} else {
			const payload = {
				projectSlug,
				body: { user_id: performer.id, description, date: formatDate(new Date(date)), cost: Number(cost) },
			};
			addExpense(payload).then(() => {
				closeModal();
				showToast('Запись успешно создана');
				setIsRequestPending(false);
			});
		}
	}
	return {
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
	};
}
