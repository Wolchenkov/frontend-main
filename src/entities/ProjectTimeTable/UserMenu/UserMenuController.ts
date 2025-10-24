import { useState, useEffect } from 'react';

export const useUserMenuController = (timeRecords: ITimeRecord[] | undefined) => {
	const [searchUser, setSearchUser] = useState('');
	const [userOptions, setUserOptions] = useState<{ [id: number]: ITimeRecord }>({});

	useEffect(() => {
		if (timeRecords) {
			const users = {} as { [id: number]: ITimeRecord };
			timeRecords.forEach((timeRecord) => {
				if (!users[timeRecord.user.id]) {
					users[timeRecord.user.id] = timeRecord;
				}
			});
			setUserOptions(users);
		}
	}, [timeRecords]);

	return { searchUser, setSearchUser, userOptions, setUserOptions };
};
