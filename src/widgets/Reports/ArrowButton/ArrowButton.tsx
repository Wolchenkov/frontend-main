import { SvgComponent } from '../../../shared';

interface IArrowButtonProps {
	disabled: boolean;
	direction: string;
	onClick: () => void;
}

export const ArrowButton = ({ disabled, direction, onClick }: IArrowButtonProps) => (
	<SvgComponent
		name={disabled ? `arrow-${direction}-s-min-disabled` : `arrow-${direction}-s-min`}
		style={{ pointerEvents: 'all' }}
		onClick={(e: MouseEvent) => {
			if (disabled) e.stopPropagation();
			else {
				e.stopPropagation();
				onClick();
			}
		}}
	/>
);
