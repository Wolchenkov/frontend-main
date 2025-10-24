import { useToggle } from 'reshaped/bundle';
import { useDeleteProjectMutation } from '../../../store/projects/projectsApi';
import { useRouter } from 'next/router';
import { useShowToast } from '../../../shared/utility/Hooks';

import { format } from 'date-fns';

interface ProjectMoreMenuProps {
	groupId: number;
}

export function useProjectMoreMenuController({ groupId }: ProjectMoreMenuProps) {
	const { active, deactivate, activate } = useToggle(false);
	const {
		active: activeConfirmModal,
		deactivate: deactivateConfirmModal,
		activate: activateConfirmModal,
	} = useToggle(false);

	const {
		active: activeMovementModal,
		deactivate: deactivateMovementModal,
		activate: activateMovementModal,
	} = useToggle(false);

	const {
		active: activeAddProjectModal,
		deactivate: deactivateAddProjectModal,
		activate: activateAddProjectModal,
	} = useToggle(false);

	const {
		active: activeAddTemplateModal,
		deactivate: deactivateAddTemplateModal,
		activate: activateAddTemplateModal,
	} = useToggle(false);

	const onRemoveProject = () => {
		activateConfirmModal();
	};

	const handleDropDownClickOpen = () => {
		active ? deactivate() : activate();
	};

	const [deleteProject] = useDeleteProjectMutation();
	const router = useRouter();
	const showToast = useShowToast();

	const onSharedProject = () => {
		navigator.clipboard
			.writeText(window.location.href)
			.then(() => {
				showToast('Ссылка скопирована в буфер обмена');
			})
			.catch((err) => {
				throw new Error(err);
			});
	};

	const onConfirmDeleteProject = () => {
		if (router.query.slug) {
			deleteProject({ projectSlug: router.query.slug })
				.unwrap()
				.then(() => {
					deactivateConfirmModal();
					router.push(`/projects/${groupId}`);
					showToast('Проект удален');
				});
		}
	};

	const { slug: projectSlug } = router.query;

	//export
	function exportProject() {
		const url = `/projects/${projectSlug}/export`;
		showToast('Файл загружается');
		fetch(process.env.NEXT_PUBLIC_HTTP_SERVICE_URL + url, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			method: 'POST',
		})
			.then((response) => response.blob())
			.then((blob) => {
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `Проект ${projectSlug} ${format(new Date(), 'dd.MM.yyyy HH.mm')}.csv`;
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
			});
	}
	return {
		active,
		handleDropDownClickOpen,
		activeConfirmModal,
		deactivateConfirmModal,
		activateConfirmModal,
		onRemoveProject,
		activeMovementModal,
		activateMovementModal,
		deactivateMovementModal,
		activeAddProjectModal,
		activateAddProjectModal,
		deactivateAddProjectModal,
		activeAddTemplateModal,
		deactivateAddTemplateModal,
		activateAddTemplateModal,
		onSharedProject,
		onConfirmDeleteProject,
		exportProject,
	};
}
