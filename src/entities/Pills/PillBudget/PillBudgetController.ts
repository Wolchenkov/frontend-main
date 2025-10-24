import { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { getRates } from '../../../shared/utility/Utils';
import { useWindowDimensions } from '../../../shared/utility/Hooks';

export function usePillBudgetController(
	title: string,
	rates: fetchingDictionaryTypeWork[],
	budgetTypes: { type: string; name: string }[],
	name: string,
	onChange: (fieldName: string, fieldValue: IBudget) => void,
	value?: { type: string; amount: number }
): any {
	const [pillTitle, setPillTitle] = useState(value ? budgetTypes.find(({ type }) => type === value.type)?.name : title);
	const [isPillActive, setIsPillActive] = useState(false);
	const { active: isDropdownActive, activate: activateDropdown, deactivate: deactivateDropdown } = useToggle(false);

	const [projectBudget, setProjectBudget] = useState(value ? value.amount : '');
	const [projectRates, setProjectRates] = useState(rates);
	const [tabValue, setTabValue] = useState(
		value ? budgetTypes.find(({ type }) => type === value.type) : budgetTypes[0]
	);
	const pillTabInputRef = useRef<HTMLInputElement>(null);

	const { height } = useWindowDimensions();
	const pillRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (pillTitle === title) return;
		switch (tabValue?.type) {
			case 'fixed':
				onChange(name, {
					type: tabValue.type,
					amount: +projectBudget,
					type_work: getRates(projectRates),
				});
				break;
			case 'Time&Material':
				onChange(name, {
					type: tabValue.type,
					type_work: getRates(projectRates),
				});
				break;
			case 'not_billable':
				onChange(name, {
					type: tabValue.type,
				});
				break;
			default:
				throw new Error(`Unknown sort type: ${tabValue?.type}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pillTitle, projectRates, projectBudget]);

	useEffect(() => {
		if (isDropdownActive) {
			setTimeout(() => {
				pillTabInputRef.current?.focus();
			}, 100);
		}
	}, [isDropdownActive]);

	const handlePillButtonClick = () => {
		setIsPillActive(!isPillActive);
		isDropdownActive ? deactivateDropdown() : activateDropdown();
	};

	const handleModalClose = () => {
		setIsPillActive(false);
		deactivateDropdown();
	};

	const handleTabChange = ({ value }: { value: string }) => {
		const newValue = budgetTypes.find(({ type }) => type === value);
		setTabValue(newValue as { type: string; name: string });
		newValue && setPillTitle(newValue.name);
	};

	const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (!/[0-9]/.test(event.key)) {
			event.preventDefault();
		}
	};

	const dropDownMaxHeight = useMemo(() => {
		if (!pillRef.current || !height) return 'none';
		const { top: searchTopCoord, height: searchHeight } = pillRef.current.getBoundingClientRect();
		const maxHeight = height - searchTopCoord - searchHeight - 40;
		return `${maxHeight}px`;
	}, [height]);

	return {
		pillRef,
		pillTabInputRef,
		isPillActive,
		isDropdownActive,
		pillTitle,
		tabValue,
		projectBudget,
		dropDownMaxHeight,
		projectRates,
		handleTabChange,
		handlePillButtonClick,
		handleModalClose,
		handleKeyPress,
		setPillTitle,
		setProjectRates,
		setProjectBudget,
	};
}
