import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import authReducer from './auth/authSlice';
import hostReducer from './host/hostSlice';
import timeReducer from './time/timeSlice';
import uploadsReducer from './uploads/uploadsSlice';
import taskReducer from './tasks/tasksSlice';
import { dictionaryApi } from './dictionaries/dictionariesApi';
import { teamsApi } from './teams/teamsApi';
import { projectsApi } from './projects/projectsApi';
import { tasksApi } from './tasks/tasksApi';
import { timeApi } from './time/timeApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { groupsApi } from './groups/groupsApi';
import { authApi } from './auth/authApi';
import { historyApi } from './history/historyApi';
import { expensesApi } from './expenses/expensesApi';
import { docsApi } from './docs/docsApi';
import { uploadsApi } from './uploads/uploadsApi';
import { templatesApi } from './templates/templatesApi';
import { trashApi } from './trash/trashApi';
import { reportsApi } from './reports/reportsApi';
import { resourcesApi } from './resources/resourcesApi';
import { myWorkApi } from './myWork/myWorkApi';
import { notificationsApi } from './notifications/notificationsApi';
import { managementApi } from './management/managementApi';
import { importApi } from './import/importApi';

const rootReducer = combineReducers({
	auth: authReducer,
	host: hostReducer,
	tasks: taskReducer,
	time: timeReducer,
	uploads: uploadsReducer,
	[authApi.reducerPath]: authApi.reducer,
	[dictionaryApi.reducerPath]: dictionaryApi.reducer,
	[teamsApi.reducerPath]: teamsApi.reducer,
	[projectsApi.reducerPath]: projectsApi.reducer,
	[groupsApi.reducerPath]: groupsApi.reducer,
	[tasksApi.reducerPath]: tasksApi.reducer,
	[timeApi.reducerPath]: timeApi.reducer,
	[historyApi.reducerPath]: historyApi.reducer,
	[expensesApi.reducerPath]: expensesApi.reducer,
	[docsApi.reducerPath]: docsApi.reducer,
	[uploadsApi.reducerPath]: uploadsApi.reducer,
	[templatesApi.reducerPath]: templatesApi.reducer,
	[trashApi.reducerPath]: trashApi.reducer,
	[reportsApi.reducerPath]: reportsApi.reducer,
	[resourcesApi.reducerPath]: resourcesApi.reducer,
	[myWorkApi.reducerPath]: myWorkApi.reducer,
	[notificationsApi.reducerPath]: notificationsApi.reducer,
	[managementApi.reducerPath]: managementApi.reducer,
	[importApi.reducerPath]: importApi.reducer,
});

const makeStore = () => {
	const store = configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat([
				dictionaryApi.middleware,
				teamsApi.middleware,
				projectsApi.middleware,
				groupsApi.middleware,
				authApi.middleware,
				tasksApi.middleware,
				timeApi.middleware,
				historyApi.middleware,
				expensesApi.middleware,
				docsApi.middleware,
				uploadsApi.middleware,
				templatesApi.middleware,
				trashApi.middleware,
				reportsApi.middleware,
				resourcesApi.middleware,
				myWorkApi.middleware,
				notificationsApi.middleware,
				managementApi.middleware,
				importApi.middleware,
			]),
		devTools: process.env.NODE_ENV !== 'production',
	});
	setupListeners(store.dispatch);
	return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore);
