export const transformGetClientTeamsResponse = (response: fetchingTeamsData) => {
	const clientTeams = { ...response };

	// Создание карты пользователей с атрибутами из included
	const userAttributesMap = new Map();

	clientTeams.included.forEach((item) => {
		userAttributesMap.set(item.id, item.attributes);
	});

	clientTeams.data.forEach((item) => {
		const users = item.relationships.users.data;
		users.sort((a: any, b: any) => {
			const nameA = userAttributesMap.get(a.id)?.name || '';
			const nameB = userAttributesMap.get(b.id)?.name || '';

			return nameA.localeCompare(nameB, 'ru');
		});
		users.forEach((user) => {
			const userId = user.id;
			if (userAttributesMap.has(userId)) {
				const userAttributes = userAttributesMap.get(userId);
				user.attributes = {
					avatar: userAttributes.avatar,
					email: userAttributes.email,
					name: userAttributes.name,
				};
			}
		});
		const invitedUsers = item.relationships.invitedUsers.data;
		invitedUsers.forEach((invitedUser) => {
			const userId = invitedUser.id;
			if (userAttributesMap.has(userId)) {
				const userAttributes = userAttributesMap.get(userId);
				invitedUser.attributes = {
					email: userAttributes.email,
					name: userAttributes.name,
				};
			}
		});
	});
	return clientTeams.data;
};
