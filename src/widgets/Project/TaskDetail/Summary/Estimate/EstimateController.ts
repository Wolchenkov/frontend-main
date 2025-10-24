import { useEffect, useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { useRouter } from 'next/router';
import { convertTimeToMinutes, formatMinutesToHours00, formatEstimateTime } from '../../../../../shared/utility/Utils';
import { useGetCurrentIssueTypeWorkQuery } from '../../../../../store/dictionaries/dictionariesApi';
import { useUpdateIssueMutation } from '../../../../../store/projects/projectsApi';

interface ITaskSummaryProps {
	taskState: ITaskDetail;
	setTaskState: React.Dispatch<React.SetStateAction<ITaskDetail | null>>;
	refetchTaskData: any;
	projectSlugData?: string;
}

export function useEstimateController({
	taskState,
	setTaskState,
	refetchTaskData,
	projectSlugData,
}: ITaskSummaryProps) {
	const router = useRouter();
	const { slug: projectSlug } = router.query;

	const [inputValue, setInputValue] = useState(formatMinutesToHours00(taskState.estimate));

	const { data: typesWork } = useGetCurrentIssueTypeWorkQuery(taskState.id.toString());

	const [typeWork, setTypeWork] = useState<fetchingTypeWork | undefined>(
		typesWork?.find((typeWork) => typeWork.id === taskState.type_work_id)
	);

	useEffect(() => {
		typesWork && setTypeWork(typesWork?.find((typeWork) => typeWork.id === taskState.type_work_id));
	}, [taskState, typesWork]);

	const {
		active: isDropdownEstimateActive,
		activate: activateEstimateDropdown,
		deactivate: deactivateEstimateDropdown,
	} = useToggle(false); // дропдаун для оценки

	const { active, activate, deactivate } = useToggle(false); // дропдаун для типов работ

	const handlePillButtonClick = () => {
		isDropdownEstimateActive ? deactivateEstimateDropdown() : activateEstimateDropdown();
	};

	const handleInputChange = (args: any) => {
		const regex = /^(\d{1,}(:\d{0,2})?)$/;
		const isValid = regex.test(args.value) || args.value === '';

		if (isValid) {
			setInputValue(args.value);
		} else {
			return;
		}
	};

	const [updateIssue] = useUpdateIssueMutation();

	function onSave() {
		const estimateTime = inputValue ? formatEstimateTime(inputValue) : null;
		setInputValue(estimateTime);

		setTaskState((prev) => {
			if (prev) {
				return {
					...prev,
					estimate: convertTimeToMinutes(estimateTime),
					type_work_id: typeWork ? typeWork.id : null,
				};
			} else return prev;
		});
		deactivateEstimateDropdown();
		const body = estimateTime
			? { estimate: convertTimeToMinutes(estimateTime), type_work_id: typeWork?.id }
			: { estimate: null, type_work_id: null };
		const payload = { projectSlug: projectSlugData ?? projectSlug, body, projectIssueId: taskState.id };
		updateIssue(payload).then(() => {
			// deactivateEstimateDropdown();
			refetchTaskData();
		});
	}

	function cancelation() {
		setInputValue('');
		setTypeWork(typesWork?.find((typeWork) => typeWork.id === taskState.type_work_id));
		setInputValue(formatMinutesToHours00(taskState.estimate));
		deactivateEstimateDropdown();
	}
	return {
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
	};
}
