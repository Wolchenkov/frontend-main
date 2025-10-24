import Head from 'next/head';
import React, { FC, useState } from 'react';
import { Button, Loader, Tabs, Text, useToggle } from 'reshaped/bundle';
import { SvgComponent } from '../../shared';
import { AddTeamModal, AddUserModal, EmptyTeam } from '../../entities';
import * as S from './Teams.styled';
import { useGetClientTeamsDataQuery, useGetOurTeamsDataQuery } from '../../store/teams/teamsApi';
import { TableOurTeam } from './TeamsTables/TableOurTeam/TableOurTeam';
import { TableClientTeam } from './TeamsTables/TableClientTeam/TableClientTeam';

const Teams: FC = () => {
	// eslint-disable-next-line no-console
	console.log('Teams page');
	const [tab, setTab] = useState('1');
	const { active, activate, deactivate } = useToggle(false); // модалкa создания команды
	const {
		active: activeModalAddUser,
		activate: activateModalAddUser,
		deactivate: deactivateModalAddUser,
	} = useToggle(false); //  модалкa добавления нашего пользователя
	const {
		active: activeModalAddClient,
		activate: activateModalAddClient,
		deactivate: deactivateModalAddClient,
	} = useToggle(false); //  модалкa добавления клиента

	//получение данных о командах
	const { data: ourTeamsData, isLoading } = useGetOurTeamsDataQuery();
	const ourTeamsNames = ourTeamsData?.map((el) => el.attributes.name).flat();
	const { data: clientTeamsData, isLoading: isLoadingClientData } = useGetClientTeamsDataQuery();
	const clientTeamsNames = clientTeamsData?.map((el) => el.attributes.name).flat();

	return (
		<>
			<Head>
				<title>Команды</title>
			</Head>
			<Text variant='title-2' attributes={{ style: { padding: '24px 20px', letterSpacing: '-0.015em' } }}>
				Команды
			</Text>
			<S.HeaderContainer>
				<Tabs onChange={({ value }) => setTab(value)} variant='pills'>
					<Tabs.List>
						<Tabs.Item icon={<SvgComponent name='group-neutral' />} value='1'>
							<Text
								variant='body-2'
								attributes={{
									style: { letterSpacing: '-0.02em' },
								}}
							>
								Наши команды
							</Text>
						</Tabs.Item>
						<Tabs.Item icon={<SvgComponent name='user-2' />} value='2'>
							<Text
								variant='body-2'
								attributes={{
									style: { letterSpacing: '-0.02em' },
								}}
							>
								Клиенты
							</Text>
						</Tabs.Item>
					</Tabs.List>
				</Tabs>
				<div>
					<Button
						color='primary'
						size='small'
						onClick={activate}
						type='button'
						startIcon={<SvgComponent name='add-white' />}
						attributes={{ style: { marginRight: 4 } }}
					>
						<Text variant='body-2' attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}>
							Создать команду{tab === '1' ? '' : ' клиента'}
						</Text>
					</Button>
					<AddTeamModal
						size='660px'
						active={active}
						onClose={deactivate}
						mode={tab === '1' ? 'ourTeams' : 'clientTeams'}
						names={tab === '1' ? ourTeamsNames : clientTeamsNames}
					/>
					{(tab === '1' && ourTeamsData?.length) || (tab !== '1' && clientTeamsData?.length) ? (
						<Button
							size='small'
							onClick={tab === '1' ? activateModalAddUser : activateModalAddClient}
							type='button'
							startIcon={<SvgComponent name='user-add' />}
						/>
					) : null}

					<AddUserModal
						size='660px'
						active={activeModalAddUser}
						onClose={deactivateModalAddUser}
						mode={false}
						isClientTeam={false}
					/>
					<AddUserModal
						size='660px'
						active={activeModalAddClient}
						onClose={deactivateModalAddClient}
						mode={false}
						isClientTeam={true}
					/>
				</div>
			</S.HeaderContainer>
			<S.MainContainer>
				{tab === '1' ? (
					ourTeamsData?.length ? (
						ourTeamsData?.map((tableData) => (
							<TableOurTeam
								key={tableData.id}
								title={tableData.attributes.name}
								data={tableData.relationships.users.data}
								invitedUsers={tableData.relationships.invitedUsers.data}
								teamId={tableData.id}
								isRateVisible={tableData.attributes.isRateVisible}
								teamNames={ourTeamsNames}
							/>
						))
					) : isLoading ? (
						<S.LoaderContainer>
							<Loader size='medium' />
						</S.LoaderContainer>
					) : (
						<EmptyTeam onClick={activate} />
					)
				) : clientTeamsData?.length ? (
					clientTeamsData?.map((tableData) => (
						<TableClientTeam
							key={tableData.id}
							title={tableData.attributes.name}
							data={tableData.relationships.users.data}
							teamId={tableData.id}
							invitedUsers={tableData.relationships.invitedUsers.data}
							teamNames={clientTeamsNames}
						/>
					))
				) : isLoadingClientData ? (
					<S.LoaderContainer>
						<Loader size='medium' />
					</S.LoaderContainer>
				) : (
					<EmptyTeam onClick={activate} />
				)}
			</S.MainContainer>
		</>
	);
};

export default Teams;
