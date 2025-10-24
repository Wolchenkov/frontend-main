import { ChangeEvent, useEffect, useRef, useState } from 'react';

export function useRenameGroupModalController(groupName: string, active: boolean, deactivate: () => void) {
	const renameInputRef = useRef<HTMLInputElement>(null);
	const [isValid, setIsValid] = useState<boolean>(true);
	const [inputValue, setInputValue] = useState(groupName);

	useEffect(() => {
		if (active) {
			setTimeout(() => {
				renameInputRef.current?.focus();
			}, 100);
		}
	}, [active]);

	useEffect(() => {
		if (groupName) {
			setInputValue(groupName);
		}
	}, [groupName]);

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setIsValid(true);
		setInputValue(e.target.value);
	};

	const onCloseModal = () => {
		deactivate();
		setTimeout(() => {
			setInputValue(groupName);
		}, 200);
		setIsValid(true);
	};

	return {
		renameInputRef,
		inputValue,
		changeHandler,
		isValid,
		onCloseModal,
		setIsValid,
		setInputValue,
	};
}
