import { getDeclinedNumeral } from "./getDeclinedNumeral";

export const formatTime = (time: number) => {
	return Math.floor(time / 60) + ':' + (time % 60 < 10 ? '0' + (time % 60) : time % 60);
};

export const valueFormatterToSeconds = (value: string) => {
	if (value === '') {
		return 0;
	} else {
		const valueArray = value.split(':');
		const [hours, minutes] = valueArray;
		return Number(hours) * 3600 + Number(minutes) * 60;
	}
};

export function formatMinutes(minutes: number) {
	let hours: string | number = Math.floor(minutes / 60);
	let remainingMinutes: string | number = minutes % 60;

	hours = hours < 10 ? '0' + hours : hours;
	remainingMinutes = remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes;

	return hours + ':' + remainingMinutes;
}

export function formatMinutesToString(minutes: number) {
	const hours: string | number = Math.floor(minutes / 60);
	const resultHours = hours ? getDeclinedNumeral(hours, ['час', 'часа', 'часов']) : '';

	const remainingMinutes: string | number = minutes % 60;
	const resultMinutes = remainingMinutes ? getDeclinedNumeral(remainingMinutes, ['минута', 'минуты', 'минут']) : '';

	return `${resultHours} ${resultMinutes}`;
}
