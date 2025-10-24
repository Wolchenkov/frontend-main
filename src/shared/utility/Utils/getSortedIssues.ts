const sortIssuesByName = (direction: string) => {
	return direction === 'down'
		? (a: ITask, b: ITask) => b?.name.localeCompare(a?.name)
		: (a: ITask, b: ITask) => a?.name.localeCompare(b?.name);
};

const sortIssuesByPriority = (direction: string) => {
	return direction === 'down'
		? (a: ITask, b: ITask) =>
				+(a?.priority?.sort === 1) - +(b?.priority?.sort === 1) || a?.priority?.sort - b?.priority?.sort
		: (a: ITask, b: ITask) =>
				+(b?.priority?.sort === 1) - +(a?.priority?.sort === 1) || b?.priority?.sort - a?.priority?.sort;
};

const sortIssuesByDeadline = (direction: string) => {
	return direction === 'down'
		? (a: ITask, b: ITask) =>
				+(b?.deadline === null) - +(a?.deadline === null) ||
				new Date(b?.deadline as string).getTime() - new Date(a?.deadline as string).getTime()
		: (a: ITask, b: ITask) =>
				+(a?.deadline === null) - +(b?.deadline === null) ||
				new Date(a?.deadline as string).getTime() - new Date(b?.deadline as string).getTime();
};

const sortIssuesByEstimate = (direction: string) => {
	return direction === 'down'
		? (a: ITask, b: ITask) => b?.estimate - a?.estimate
		: (a: ITask, b: ITask) => a?.estimate - b?.estimate;
};

const sortIssuesByTimeAmount = (direction: string) => {
	return direction === 'down'
		? (a: ITask, b: ITask) => b?.time_amount - a?.time_amount
		: (a: ITask, b: ITask) => a?.time_amount - b?.time_amount;
};

const sortIssuesByBudget = (direction: string) => {
	return direction === 'down'
		? (a: ITask, b: ITask) => b?.budget - a?.budget
		: (a: ITask, b: ITask) => a?.budget - b?.budget;
};

const sortIssuesByBalance = (direction: string) => {
	return direction === 'down'
		? (a: ITask, b: ITask) => b?.balance - a?.balance
		: (a: ITask, b: ITask) => a?.balance - b?.balance;
};

export const getSortedIssues = ([...issues]: ITask[], sortOption: { type: string; direction: string }) => {
	switch (sortOption.type) {
		case 'name':
			return issues.sort(sortIssuesByName(sortOption.direction));
		case 'priority':
			return issues.sort(sortIssuesByPriority(sortOption.direction));
		case 'deadline':
			return issues.sort(sortIssuesByDeadline(sortOption.direction));
		case 'estimate':
			return issues.sort(sortIssuesByEstimate(sortOption.direction));
		case 'time_amount':
			return issues.sort(sortIssuesByTimeAmount(sortOption.direction));
		case 'budget':
			return issues.sort(sortIssuesByBudget(sortOption.direction));
		case 'balance':
			return issues.sort(sortIssuesByBalance(sortOption.direction));
		default:
			return issues;
	}
};
