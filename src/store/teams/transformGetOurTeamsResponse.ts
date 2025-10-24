export const transformGetOurTeamsResponse = (response: any) => {
	const OurTeams: fetchingTeamsData = { ...response };

	// Создание Map пользователей с атрибутами из included
	const userAttributesMap = new Map();

	const updateAttributeMap = (userId: string, attributes: object) => {
		const userAttributes = userAttributesMap.get(userId);
		userAttributesMap.set(userId, { ...userAttributes, ...attributes });
	};

	OurTeams.included.forEach((item: any) => {
		if (item.type === 'users' || item.type === 'userInvitations') {
			updateAttributeMap(item.id, item.attributes);
		} else if (item.type === 'teamUserSalaries') {
			updateAttributeMap(item.attributes.user_id.toString(), item.attributes);
		}
	});

	const updateUserAttributes = (user: any) => {
		const userId = user.id;
		if (userAttributesMap.has(userId)) {
			user.attributes = userAttributesMap.get(userId);
		}
	};

	OurTeams.data
		.map((item: any) => {
			!Array.isArray(item.relationships.users.data) &&
				(item.relationships.users.data = Object.values(item.relationships.users.data));
			return item;
		})
		.forEach((item: any) => {
			item.relationships.users.data
				.sort((a: any, b: any) => {
					const nameA = userAttributesMap.get(a.id)?.name || '';
					const nameB = userAttributesMap.get(b.id)?.name || '';
					return nameA.localeCompare(nameB, 'ru');
				})
				.forEach(updateUserAttributes);

			item.relationships.invitedUsers.data.forEach(updateUserAttributes);
		});

	// eslint-disable-next-line no-console
	console.log('OurTeams.data', OurTeams.data);

	const isMyTeamTrue = OurTeams.data.filter((item) => item.attributes.isRateVisible === true);
	const isMyTeamFalse = OurTeams.data.filter((item) => item.attributes.isRateVisible === false);
	const sortedData = isMyTeamTrue.concat(isMyTeamFalse);

	return sortedData;
};
