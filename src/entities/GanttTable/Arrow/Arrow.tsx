import { useState, useEffect, FC } from 'react';

import styled from 'styled-components';
import { Text } from 'reshaped/bundle';

import { calculateDeltas, calculateCanvasDimensions, calculateControlPoints } from './utils/arrow-utils';
import { useMousePosition } from '../../../shared/utility/Hooks';

const CONTROL_POINTS_RADIUS = 5;

type Props = {
	taskFrom: number | null;
	taskTo: number;
	rowHeight: number;
	onClick: () => void;
};

type TranslateProps = {
	$xTranslate: number;
	$yTranslate: number;
};

const Line = styled.svg.attrs(({ $xTranslate, $yTranslate }: TranslateProps) => ({
	style: { transform: `translate(${$xTranslate}px, ${$yTranslate}px)` },
}))<TranslateProps>`
	pointer-events: none;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 1;
`;

const HoverableLine = styled.path`
	cursor: pointer;
`;

const RenderedLine = styled.path`
	pointer-events: none;
	transition: stroke 300ms;
`;

const Endings = styled(Line)`
	pointer-events: none;
`;

const Tooltip = styled.div.attrs(({ $xTranslate, $yTranslate }: TranslateProps) => ({
	style: { left: `${$xTranslate + 20}px`, top: `${$yTranslate + 20}px` },
}))<TranslateProps>`
	position: fixed;
	background: var(--rs-color-foreground-neutral);
	color: var(--rs-color-background-elevated);
	border-radius: 6px;
	width: 101px;
	height: 28px;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 3;
`;

const ArrowHeadEnding = styled.path.attrs(({ $xTranslate, $yTranslate }: TranslateProps) => ({
	style: { transform: `translate(${$xTranslate}px, ${$yTranslate}px)` },
}))<TranslateProps>`
	transition: stroke 300ms;
`;

const Arrow: FC<Props> = ({ taskFrom, taskTo, rowHeight, onClick }) => {
	const strokeWidth = 1;
	const arrowHeadEndingSize = 8;
	const arrowHeadOffset = arrowHeadEndingSize / 2;
	const boundingBoxElementsBuffer = strokeWidth + arrowHeadEndingSize / 2 + CONTROL_POINTS_RADIUS / 2;

	const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
	const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);
	const mousePosition = useMousePosition();

	useEffect(() => {
		const el1 = document.getElementById(String(taskFrom));
		const el2 = document.getElementById(String(taskTo));
		const halfBar = rowHeight / 2;

		if (el1 && el2) {
			setStartPoint({ x: el1.offsetLeft + el1.offsetWidth, y: el1.offsetTop + halfBar });
			setEndPoint({ x: el2.offsetLeft, y: el2.offsetTop + halfBar });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [taskFrom, taskTo]);

	const { absDx, absDy, dx, dy } = calculateDeltas(startPoint, endPoint);

	const { p1, p4, boundingBoxBuffer } = calculateControlPoints({
		boundingBoxElementsBuffer,
		dx,
		dy,
		absDx,
		absDy,
	});

	const { canvasWidth, canvasHeight } = calculateCanvasDimensions({
		absDx,
		absDy,
		boundingBoxBuffer,
	});

	const canvasXOffset = Math.min(startPoint.x, endPoint.x) - boundingBoxBuffer.horizontal;
	const canvasYOffset = Math.min(startPoint.y, endPoint.y) - boundingBoxBuffer.vertical;

	const curvedLinePath =
		endPoint.x > startPoint.x
			? `
				M ${p1.x} ${p1.y}
				h ${p4.x - p1.x - 16},
				a6,6 0 0 1 6,6,
				v ${p4.y - p1.y - 12},
				a6,6 0 0 0 6,6,
				L ${p4.x} ${p4.y}`
			: endPoint.y < startPoint.y
			? `
				M ${p1.x} ${p1.y}
				h 4,
				a6,6 0 0 1 6,6,
				v 4,
				a6,6 0 0 1 -6,6,
				h -${p1.x - p4.x + 8},
				a6,6 0 0 1 -6,-6,
				v ${p4.y - p1.y - 4},
				a6,6 0 0 1 6,-6,
				L ${p4.x} ${p4.y}`
			: `
    			M ${p1.x} ${p1.y}
				h 4,
				a6,6 0 0 1 6,6,
				v 4,
				a6,6 0 0 1 -6,6,
				h -${p1.x - p4.x + 8},
				a6,6 0 0 0 -6,6,
				v ${p4.y - p1.y - 28},
				a6,6 0 0 0 6,6,
    			L ${p4.x} ${p4.y}`;
	return (
		<>
			{isHovered && (
				<Tooltip $xTranslate={mousePosition.x} $yTranslate={mousePosition.y}>
					<Text variant='caption-1'>Удалить связь</Text>
				</Tooltip>
			)}

			<Line width={canvasWidth} height={canvasHeight} $xTranslate={canvasXOffset} $yTranslate={canvasYOffset}>
				<RenderedLine
					d={curvedLinePath}
					strokeWidth={strokeWidth}
					stroke={isHovered ? '#eaebef' : '#cfd0d3'}
					fill='none'
				/>
				<HoverableLine
					d={curvedLinePath}
					strokeWidth='15'
					stroke='transparent'
					pointerEvents='all'
					fill='none'
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					onClick={onClick}
				/>
			</Line>
			<Endings width={canvasWidth} height={canvasHeight} $xTranslate={canvasXOffset} $yTranslate={canvasYOffset}>
				<ArrowHeadEnding
					d={`
            M ${(arrowHeadEndingSize / 5) * 2} 0
            L ${arrowHeadEndingSize} ${arrowHeadEndingSize / 2}
            L ${(arrowHeadEndingSize / 5) * 2} ${arrowHeadEndingSize}`}
					fill='none'
					stroke={isHovered ? '#eaebef' : '#cfd0d3'}
					strokeWidth={strokeWidth}
					strokeLinecap='round'
					$xTranslate={p4.x - arrowHeadOffset * 2}
					$yTranslate={p4.y - arrowHeadOffset}
				/>
			</Endings>
		</>
	);
};

export default Arrow;
