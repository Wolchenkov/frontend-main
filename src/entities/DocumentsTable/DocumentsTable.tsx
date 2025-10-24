import { FC, Fragment } from 'react';
import { useDocumentsTableController } from './DocumentsTableController';
import { DocMovementModal } from '../Modal/DocMovementModal/DocMovementModal';
import { ChangeDocName } from '../Modal/ChangeDocName/ChangeDocName';
import DocumentsRow from './DocumentsRow/DocumentsRow';
import DocumentsRowUpload from './DocumentsRowUpload/DocumentsRowUpload';
import DocumentsEmpty from './DocumentsEmpty/DocumentsEmpty';
import Note from '../Note/Note';

import * as S from './DocumentsTable.styled';
import { Text, Breadcrumbs } from 'reshaped/bundle';

interface IDocumentsProps {
	currentFolder: IFolder;
	setCurrentFolder: React.Dispatch<React.SetStateAction<IFolder>>;
	type: string;
}

const DocumentsTable: FC<IDocumentsProps> = ({ currentFolder, setCurrentFolder, type }) => {
	const {
		columns,
		docs,
		breadcrumbs,
		setBreadcrumbs,
		handleClick,
		isFetching,
		isLoading,
		activeModalMoveFolder,
		activateModalMoveFolder,
		deactivateModalMoveFolder,
		modalDoc,
		setModalDoc,
		activeModalChangeName,
		activateModalChangeName,
		deactivateModalChangeName,
		activeNoteOverlay,
		setActiveNoteOverlay,
		deactivateNoteOverlay,
		note,
		setNote,
		currentUploads,
		currentUploadsLength,
		newFiles,
		bottomEl,
	} = useDocumentsTableController(currentFolder, setCurrentFolder, type);

	return (
		<div>
			{breadcrumbs.length > 1 && (
				<S.Navigation defaultVisibleItems={2}>
					{breadcrumbs.map((item, index) => (
						<Fragment key={Math.random()}>
							{breadcrumbs.length === index + 1 ? (
								<Breadcrumbs.Item key={item.id}>{item.name}</Breadcrumbs.Item>
							) : (
								<Breadcrumbs.Item key={item.id} onClick={() => handleClick(item, index)}>
									{item.name}
								</Breadcrumbs.Item>
							)}
						</Fragment>
					))}
				</S.Navigation>
			)}
			{((docs && docs.length > 0) || isFetching || currentUploadsLength > 0) &&
				!isLoading &&
				breadcrumbs.length === 1 && <Text variant='title-3'>Документы</Text>}
			{(docs && docs.length > 0 && !isLoading) || currentUploadsLength > 0 ? (
				<>
					<S.Table rootFolder={!currentFolder.id}>
						<S.TableHead>
							{columns.map((column) => (
								<Text variant='caption-1' color='neutral-faded' key={column.id}>
									{column.name}
								</Text>
							))}
						</S.TableHead>
						{docs?.map((doc) => (
							<DocumentsRow
								key={doc.id}
								doc={doc}
								setCurrentFolder={setCurrentFolder}
								setBreadcrumbs={setBreadcrumbs}
								activateModalMoveFolder={activateModalMoveFolder}
								activateModalChangeName={activateModalChangeName}
								setModalDoc={setModalDoc}
								isFetching={isFetching}
								newFiles={newFiles}
								setNote={setNote}
								setActiveNoteOverlay={setActiveNoteOverlay}
								type={type}
							/>
						))}
						{Object.entries(currentUploads).map((upload) => (
							<DocumentsRowUpload key={upload[0]} upload={upload[1]} />
						))}
						<div ref={bottomEl} />
					</S.Table>
				</>
			) : (
				<DocumentsEmpty currentFolder={currentFolder} />
			)}
			<DocMovementModal
				size='660px'
				active={activeModalMoveFolder}
				onClose={deactivateModalMoveFolder}
				doc={modalDoc}
				type={type}
			/>
			<ChangeDocName
				size='660px'
				active={activeModalChangeName}
				onClose={deactivateModalChangeName}
				doc={modalDoc}
				type={type}
			/>
			<Note
				active={activeNoteOverlay}
				deactivate={deactivateNoteOverlay}
				currentFolder={currentFolder}
				type={type}
				data={note.id ? note : undefined}
			/>
		</div>
	);
};

export default DocumentsTable;
