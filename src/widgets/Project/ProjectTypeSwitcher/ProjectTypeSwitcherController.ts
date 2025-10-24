// import { useState } from 'react';
//
// interface ProjectType {
// 	type: string,
// 	icon: string;
// }
//
// type ProjectTypeList = ProjectType[];
//
// export function useProjectTypeSwitcherController(projectTypes: ProjectTypeList) {
// 	const [tabValue, setTabValue] = useState(projectTypes[0]);
//
// 	const handleTabChange = ({ value }: { value: string }) => {
// 		const newValue = projectTypes.find(({ type }) => type === value);
// 		if (newValue) {
// 			setTabValue(newValue);
// 		}
// 	};
//
// 	return {
// 		tabValue,
// 		handleTabChange
// 	};
// }
