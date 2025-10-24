import { format, parseISO, isToday } from 'date-fns';

export function formatDateInComment(dateStr: string) {
	const date = parseISO(dateStr);
	if (isToday(date)) {
		return `Сегодня в ${format(date, 'HH:mm')}`;
	} else {
		return format(date, 'dd.MM.yy в HH:mm');
	}
}

export const formatProjectDate = (date: string | null) => {
	if (!date) return '';
	return date
		.split('-')
		.reverse()
		.map((digit) => digit.slice(-2))
		.join('.');
};

export function formatRussianDate(dateStr: string) {
	const date = new Date(dateStr);
	const today = new Date();
	if (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	) {
		return 'Сегодня';
	} else {
		return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
			.format(date)
			.replace('г.', '');
	}
}

export function formatTime(time: string) {
	const date = new Date(time);
	return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

export function getDateInterval(type: string) {
	const now = new Date();
	let start, end;

	if (type === 'Неделя') {
		let dayOfWeek = now.getDay();
		if (dayOfWeek === 0) dayOfWeek = 7;
		const millisTillNow = now.getTime();
		const millisInADay = 24 * 60 * 60 * 1000;
		start = new Date(millisTillNow - (dayOfWeek - 1) * millisInADay);
		start.setHours(0, 0, 0, 0);
		end = new Date(start.getTime() + 6 * millisInADay);
		end.setHours(23, 59, 59, 999);
	} else if (type === 'Месяц') {
		start = new Date(now.getFullYear(), now.getMonth(), 1);
		end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
		end.setHours(23, 59, 59, 999);
	} else if (type === 'Год') {
		start = new Date(now.getFullYear(), 0, 1);
		end = new Date(now.getFullYear(), 11, 31);
		end.setHours(23, 59, 59, 999);
	} else if (type === 'Квартал') {
		const quarter = Math.floor(now.getMonth() / 3);
		start = new Date(now.getFullYear(), quarter * 3, 1);
		end = new Date(now.getFullYear(), quarter * 3 + 2, 31);
		end.setHours(23, 59, 59, 999);
	} else {
		return ['', ''];
	}

	return [formatDate(start), formatDate(end)];
}

export function formatDate(date: Date) {
	const year = date.getFullYear();
	const month = (1 + date.getMonth()).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');

	return `${year}-${month}-${day}`;
}

export const formatMinutesToHours = (minutes: number | null) => {
	if (minutes === 0 || minutes === null) {
		return '0:00';
	}

	const totalMinutes = Math.abs(Math.round(minutes % 60));
	const totalHours = Math.floor(minutes / 60);

	return `${totalHours}:${totalMinutes.toString().padStart(2, '0')}`;
};

export const formatMinutesToHours00 = (minutes: number | null | undefined) => {
	if (minutes === 0 || minutes === null || minutes === undefined) {
		return null;
	}

	const totalMinutes = minutes % 60;
	const totalHours = Math.floor(minutes / 60);

	return `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}`;
};

export function formatSecondsToHours(seconds: number | undefined) {
	if (seconds === undefined) return null;
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);

	const formattedHours = String(hours).padStart(2, '0');
	const formattedMinutes = String(minutes).padStart(2, '0');

	return `${formattedHours}:${formattedMinutes}`;
}

export function convertTimeToMinutes(timeString: string | null) {
	if (!timeString) return null;
	const [hours, minutes] = timeString.split(':').map(Number);
	return hours * 60 + minutes;
}

export const formatEstimateTime = (timeString: string) => {
	const time = timeString.trim();

	if (!time.includes(':')) {
		return `${time}:00`;
	} else if (time.endsWith(':0')) {
		return `${time}0`;
	} else if (time.endsWith(':')) {
		return `${time}00`;
	} else if (time[time.length - 2] === ':') {
		return `${time}0`;
	}

	return time;
};
