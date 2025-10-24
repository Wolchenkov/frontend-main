import React, { useEffect, useRef, useState } from 'react';
import { Chart, LinearScale, CategoryScale, BarController, BarElement } from 'chart.js';
import dataLabelsPlugin from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin, dataLabelsPlugin, LinearScale, CategoryScale, BarController, BarElement);

interface BarChartData {
	values: number[];
	threshold: number;
}

export const BarChart: React.FC<BarChartData> = ({ values, threshold }) => {
	const chartRef = useRef<HTMLCanvasElement>(null);
	const chartInstanceRef = useRef<Chart | null>(null);
	const [hovered, setHovered] = useState(false);
	const tooltipRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (chartRef.current) {
			const ctx = chartRef.current.getContext('2d');

			if (!ctx) {
				return;
			}

			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
			}

			const gradient = ctx.createLinearGradient(0, 0, 0, 150);
			gradient.addColorStop(0, '#CD1C28');
			gradient.addColorStop(1, '#CFD0D3');

			const chart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: ['янв.', 'февр.', 'март', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'],
					datasets: [
						{
							data: values.map((value) => (value === 0 ? 3.1 : value)),
							backgroundColor: values.map((value) => {
								if (value === 0) return '#CFD0D3';
								return value < threshold ? '#CD1C28' : '#CFD0D3';
							}),
							borderColor: values.map((value) => {
								if (value === 0) return '#CFD0D3';
								return value < threshold ? '#CD1C28' : '#CFD0D3';
							}),
							borderRadius: 2,
							borderSkipped: 'bottom',
						},
					],
				},
				options: {
					animation: { duration: 0 },
					maintainAspectRatio: false,
					responsive: true,
					scales: {
						y: {
							type: 'linear',
							display: false,
							max: 140,
						},
						x: {
							type: 'category',
							grid: { display: false },
							maxBarThickness: 32,
							ticks: {
								maxWidth: '32px',
								color: '#898B8F',
								font: {
									family: 'Inter',
									size: 10,
									weight: '600',
									lineHeight: 1.6,
								},
							},
						},
					},
					plugins: {
						legend: { display: false },
						tooltip: { enabled: false },
						datalabels: {
							align: 'end',
							anchor: 'end',
							color: function (context: any) {
								const dataValue = context.dataset.data[context.dataIndex];
								return dataValue && dataValue < threshold ? '#CD1C28' : '#CFD0D3';
							},
							font: {
								size: 10,
								weight: '600',
								lineHeight: 1.6,
								letterSpacing: '-0.01em',
							},
							textAlign: 'center',
							formatter: function (value: number) {
								return value !== 3.1 ? value + '%' : null;
							},
						},
						annotation: {
							annotations: {
								thresholdLineBackground: {
									type: 'line',
									mode: 'horizontal',
									scaleID: 'y',
									value: threshold,
									borderColor: '#FDE7E9',
									borderWidth: hovered ? 8 : 0,
									borderDash: [],
									label: { enabled: false },
									leave: handleAnnotationLeave,
								},
								thresholdLine: {
									type: 'line',
									mode: 'horizontal',
									scaleID: 'y',
									value: threshold,
									borderColor: '#E5E7EA',
									borderWidth: 1, // тонкая линия
									borderDash: [10, 10],
									enter: handleAnnotationEnter,
								},
							},
						},
					},
					hover: { mode: null },
				} as any,
			});
			chartInstanceRef.current = chart;
		}

		return () => {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
			}
		};
	}, [values, threshold, hovered]);

	const handleAnnotationEnter = (_context: any, event: any) => {
		setHovered(true);
		const tooltip = tooltipRef.current;
		if (tooltip) {
			tooltip.style.left = `${event.native.clientX - 20}px`;
			tooltip.style.top = `${event.native.clientY - 35}px`;
		}
		return true;
	};

	const handleAnnotationLeave = () => {
		setHovered(false);
		return true;
	};

	const tooltipStyles: React.CSSProperties = {
		padding: '4px 8px',
		borderRadius: '6px',
		background: '#14171F',
		boxShadow: '0px 15px 25px 0px rgba(0, 0, 0, 0.07), 0px 5px 10px 0px rgba(0, 0, 0, 0.05)',
		color: '#FFF',
		fontSize: '12px',
		fontWeight: 500,
		lineHeight: '20px',
		letterSpacing: '-0.12px',
		position: 'fixed',
		pointerEvents: 'none',
		display: hovered ? 'block' : 'none',
		zIndex: 1000,
	};

	return (
		<div style={{ position: 'relative' }}>
			<canvas ref={chartRef} style={{ height: '116px' }} />
			<div ref={tooltipRef} style={tooltipStyles}>
				{threshold + '%'}
			</div>
		</div>
	);
};
