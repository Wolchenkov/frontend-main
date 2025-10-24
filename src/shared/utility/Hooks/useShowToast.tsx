import { Icon, Text, useToast } from 'reshaped/bundle';
import { SvgComponent } from '../../ui/SvgComponent/SvgComponent';

export const useShowToast = () => {
	const toast = useToast();

	const showToast = (text: string, additionalText?: string) => {
		toast.show({
			size: 'small',
			color: 'inverted',
			text: (
				<>
					<Text variant='body-strong-2' attributes={{ style: { letterSpacing: '-0.01em', color: 'white' } }}>
						{text}
					</Text>
					{additionalText && <Text variant='body-2'>{additionalText}</Text>}
				</>
			),
			icon: <Icon svg={<SvgComponent name='zap' />} size={5} />,
		});
	};

	return showToast;
};
