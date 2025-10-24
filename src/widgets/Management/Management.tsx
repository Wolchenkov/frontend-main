import { FC } from 'react';
import * as S from './Management.styled';
import { useManagementController } from './ManagementController';
import { ManagementHeader } from './Header/Header';
import { ManagementPanel } from './Panel/Panel';
import { ManagementContent } from './Content/Content';

export const Management: FC = () => {
	const { activeTab, handleTabChange } = useManagementController();

	return (
		<S.Management>
			<ManagementHeader />
			<S.ManagementBody>
				<ManagementPanel activeTab={activeTab} changeTabChange={handleTabChange} />
				<ManagementContent activeTab={activeTab} />
			</S.ManagementBody>
		</S.Management>
	);
};
