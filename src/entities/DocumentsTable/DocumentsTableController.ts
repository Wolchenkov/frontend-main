import { useEffect, useState, useRef } from 'react';
import { useLazyGetDocsQuery } from '../../store/docs/docsApi';
import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useToggle } from 'reshaped/bundle';
import { useAppSelector, useAppDispatch } from '../../store';
import { clearUploadedFiles, clearCurrentUploads } from '../../store/uploads/uploadsSlice';

const columns = [
	{
		id: 'name',
		name: 'Название',
	},
	{
		id: 'user',
		name: 'Добавил',
	},
	{
		id: 'created_at',
		name: 'Дата добавления',
	},
	{
		id: 'type',
		name: 'Формат',
	},
	{
		id: 'actions',
	},
];

export const useDocumentsTableController = (
	currentFolder: IFolder,
	setCurrentFolder: React.Dispatch<React.SetStateAction<IFolder>>,
	type: string
) => {
	const router = useRouter();
	const { slug } = router.query;
	const projectSlug = typeof slug === 'string' ? slug : String(skipToken);

	const [getDocs, { data: docs, isFetching }] = useLazyGetDocsQuery();
	const [activeNoteOverlay, setActiveNoteOverlay] = useState(false);
	const [note, setNote] = useState({} as IDocument);
	const [breadcrumbs, setBreadcrumbs] = useState([{ id: 0, name: 'Документы' }]);
	const [modalDoc, setModalDoc] = useState({} as IDocument);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		setCurrentFolder({ id: 0, name: 'Документы' });
		setBreadcrumbs([{ id: 0, name: 'Документы' }]);
		dispatch(clearCurrentUploads());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [slug]);

	useEffect(() => {
		getDocs({ type, slug: projectSlug, folderId: currentFolder.id }).then(() => setIsLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentFolder]);

	const handleClick = (item: { id: number; name: string }, index: number) => {
		setCurrentFolder(item);
		const arr = breadcrumbs;
		arr.splice(index + 1, arr.length - index);
		setBreadcrumbs(arr);
	};

	const currentUploads = useAppSelector((state) => state.uploads.currentUploads);
	const newFiles = useAppSelector((state) => state.uploads.newFiles);
	const currentUploadsLength = Object.keys(currentUploads).length;
	const bottomEl = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();

	useEffect(() => {
		currentUploadsLength > 0 && setTimeout(() => bottomEl?.current?.scrollIntoView({ behavior: 'smooth' }), 100);
	}, [currentUploadsLength]);

	useEffect(() => {
		currentUploadsLength > 0 && dispatch(clearUploadedFiles());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [docs?.length]);

	const {
		active: activeModalMoveFolder,
		activate: activateModalMoveFolder,
		deactivate: deactivateModalMoveFolder,
	} = useToggle(false);

	const {
		active: activeModalChangeName,
		activate: activateModalChangeName,
		deactivate: deactivateModalChangeName,
	} = useToggle(false);

	const deactivateNoteOverlay = () => {
		setActiveNoteOverlay(false);
		setNote({} as IDocument);
	};

	return {
		columns,
		docs,
		breadcrumbs,
		setBreadcrumbs,
		handleClick,
		isLoading,
		isFetching,
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
	};
};
