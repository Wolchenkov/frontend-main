import { FC } from 'react';
import { View } from 'reshaped/bundle';
import DocumentsTable from '../../entities/DocumentsTable/DocumentsTable';

interface IDocumentsProps {
	currentFolder: IFolder;
	setCurrentFolder: React.Dispatch<React.SetStateAction<IFolder>>;
	type: 'groups' | 'projects';
}

export const Documents: FC<IDocumentsProps> = ({ currentFolder, setCurrentFolder, type }) => {
	return (
		<View gap={8} paddingEnd={5} paddingStart={5} paddingBottom={5} attributes={{ style: { position: 'static' } }}>
			<DocumentsTable currentFolder={currentFolder} setCurrentFolder={setCurrentFolder} type={type} />
		</View>
	);
};
