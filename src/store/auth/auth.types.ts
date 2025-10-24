export interface User {
	avatar: string | null;
	email: string;
	id: number;
	name: string;
	permissions: {
		name: string;
		label: string;
	}[];
	token: string | null;
	role: {
		name: string;
		label: string;
	};
	teamId: number | null;
	timers: ITimerInUser[];
}

export interface LoginRequest {
	email: string;
	password: string;
	remember: boolean;
}
