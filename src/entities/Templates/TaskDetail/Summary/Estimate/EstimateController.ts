import { useEffect, useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { convertTimeToMinutes, formatMinutesToHours00 } from '../../../../../shared/utility/Utils';
import { useGetCurrentIssueTypeWorkQuery } from '../../../../../store/dictionaries/dictionariesApi';
import { useUpdateIssueMutation } from '../../../../../store/projects/projectsApi';

interface IEstimateControllerProps {
	taskState: ITaskDetail;
	refetchTaskData: any;
	dataProject: IOneProject;
	isUserTeamTemplate: boolean;
}

export function useEstimateController({
	taskState,
	refetchTaskData,
	dataProject,
	isUserTeamTemplate,
}: IEstimateControllerProps) {
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
		if (!isUserTeamTemplate) return;
		isDropdownEstimateActive ? deactivateEstimateDropdown() : activateEstimateDropdown();
	};
	// Проверка каждого символа по паттерну
	const checkInput = (value: string, index: number) => {
		switch (index) {
			case 0:
			case 1:
			case 4:
				return /[0-9]/.test(value);
			case 2:
				return value === ':';
			case 3:
				return /[0-5]/.test(value);
			default:
				return false;
		}
	};
	const handleInputChange = (args: any) => {
		let value = args.value.replace(/[^0-9:]/g, '');
		if (value.length > 5) value = value.slice(0, 5);
		// Добавление двоеточия после первых двух чисел
		if (value.length === 2 && value[2] !== ':') value = value + ':';
		// Проверка каждого символа
		for (let i = 0; i < value.length; i++) {
			if (!checkInput(value[i], i)) {
				value = value.substring(0, i) + value.substring(i + 1);
			}
		}

		setInputValue(value);
	};
	const [updateIssue] = useUpdateIssueMutation();
	function onSave() {
		const body = inputValue
			? { estimate: convertTimeToMinutes(inputValue), type_work_id: typeWork?.id }
			: { estimate: null, type_work_id: null };
		const payload = { projectSlug: dataProject.slug, body, projectIssueId: taskState.id };
		updateIssue(payload).then(() => {
			deactivateEstimateDropdown();
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
