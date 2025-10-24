export const getInitials = (name: string) =>
	name
		.split(' ')
		.map((i) => i.charAt(0))
		.join('')
		.toUpperCase();
