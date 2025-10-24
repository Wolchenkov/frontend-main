/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
import { DropdownMenu, Text, View } from 'reshaped/bundle';
import * as S from './TimeZone.styled';
import { SvgComponent } from '../../../../shared';
import { useGetRegionsQuery, useLazyGetTimeZonesQuery } from '../../../../store/dictionaries/dictionariesApi';
import { useSetTimeZoneMutation } from '../../../../store/management/managementApi';

interface ITimeZoneProps {
	regionData: { region: string; timezone: string };
}

export const ManagementTimeZone: FC<ITimeZoneProps> = ({ regionData }) => {
	const [timeRegions, setTimeRegions] = useState<fetchingDictionaryRegion[]>();

	const [currentRegion, setCurrentRegion] = useState<string>();
	const [currentTimeZone, setCurrentTimeZone] = useState<string>(regionData.timezone);

	const { data: regions } = useGetRegionsQuery();
	const [getTimeZones, { data: timeZones }] = useLazyGetTimeZonesQuery();
	const [setTimeZone] = useSetTimeZoneMutation();

	useEffect(() => {
		if (regions) {
			setTimeRegions(regions);
			setCurrentRegion(regions.find((region) => region.id === regionData.region)?.value);
		}
	}, [regions]);

	useEffect(() => {
		getTimeZones(regionData.region);
	}, []);

	return (
		<View direction='row' gap={4}>
			<div>
				<Text variant='body-medium-2' attributes={{ style: { marginBottom: '4px', letterSpacing: '-0.02em' } }}>
					Регион
				</Text>
				<DropdownMenu width='359px'>
					<DropdownMenu.Trigger>
						{(attributes) => (
							<S.DropdownMenuButton
								{...attributes}
								width='359px'
								size='medium'
								variant='outline'
								endIcon={<SvgComponent name='arrow-down' />}
							>
								{currentRegion}
							</S.DropdownMenuButton>
						)}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						{timeRegions?.map((option) => (
							<DropdownMenu.Item
								key={option.id}
								onClick={() => {
									setCurrentRegion(regions?.find((region) => region.id === option.id)?.value);
									getTimeZones(option.id);
								}}
							>
								{option.value}
							</DropdownMenu.Item>
						))}
					</DropdownMenu.Content>
				</DropdownMenu>
			</div>

			<div>
				<Text variant='body-medium-2' attributes={{ style: { marginBottom: '4px', letterSpacing: '-0.02em' } }}>
					Часовой пояс
				</Text>
				<DropdownMenu>
					<DropdownMenu.Trigger>
						{(attributes) => (
							<S.DropdownMenuButton
								{...attributes}
								width='172px'
								size='medium'
								variant='outline'
								endIcon={<SvgComponent name='arrow-down' />}
							>
								{currentTimeZone}
							</S.DropdownMenuButton>
						)}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<S.DropdownMenuContentWrap>
							{timeZones?.map((option) => (
								<DropdownMenu.Item
									key={option.area}
									onClick={() => {
										setTimeZone({ area: option.area });
										setCurrentTimeZone(option.timezone);
									}}
								>
									{`${option.area} (${option.timezone})`}
								</DropdownMenu.Item>
							))}
						</S.DropdownMenuContentWrap>
					</DropdownMenu.Content>
				</DropdownMenu>
			</div>
		</View>
	);
};
