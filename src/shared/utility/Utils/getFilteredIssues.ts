export const getFilteredIssues = ([...issues]: ITask[], filter: IFilter) => {
	const activeFilter = Object.keys(filter)
		.filter((key) => filter[key as keyof IFilter] !== null)
		.reduce(
			(result, key) => ({ ...result, [key]: filter[key as keyof IFilter] }),
			{} as {
				status: number;
				delegate_id: number;
				priority: number;
				date_start: [string, string];
			}
		);

	if (Object.keys(activeFilter).length === 0) return issues;

	Object.keys(activeFilter).map((filterName) => {
		if (filterName === 'status') {
			switch (activeFilter.status) {
				case 1:
					issues = issues.filter((issue) => issue.completed_on === null);
					break;
				case 2:
					issues = issues.filter((issue) => !issue.delegate_id);
					break;
				case 3:
					issues = issues.filter(
						(issue) =>
							(issue.completed_on === null &&
								issue.deadline !== null &&
								new Date().setHours(0, 0, 0, 0) > new Date(issue.deadline).setHours(0, 0, 0, 0)) ||
							(issue.completed_on !== null &&
								issue.deadline !== null &&
								new Date(issue.completed_on).setHours(0, 0, 0, 0) > new Date(issue.deadline).setHours(0, 0, 0, 0))
					);
					break;
				case 4:
					issues = issues.filter((issue) => issue.completed_on !== null);
					break;
				default:
					return issues;
			}
		}
		if (filterName === 'delegate_id') {
			issues = issues.filter((issue) => issue.delegate_id === activeFilter.delegate_id);
		}
		if (filterName === 'priority') {
			issues = issues.filter(
				(issue) =>
					issue?.priority?.id === activeFilter.priority || issue?.project_issue_priority_id === activeFilter.priority
			);
		}
		if (filterName === 'date_start') {
			issues = issues.filter((issue) => {
				if (activeFilter.date_start[1] !== null) {
					return (
						new Date(issue.date_start) !== null &&
						new Date(issue.date_start).setHours(0, 0, 0, 0) >=
							new Date(activeFilter.date_start[0]).setHours(0, 0, 0, 0) &&
						new Date(issue.date_start).setHours(0, 0, 0, 0) <= new Date(activeFilter.date_start[1]).setHours(0, 0, 0, 0)
					);
				} else {
					return (
						new Date(issue.date_start) !== null &&
						new Date(issue.date_start).setHours(0, 0, 0, 0) ===
							new Date(activeFilter.date_start[0]).setHours(0, 0, 0, 0)
					);
				}
			});
		}
	});

	return issues;
};
