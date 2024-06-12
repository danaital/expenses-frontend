export const isDev = (): boolean => process.env.NODE_ENV === 'development';
export const getBackendBase = (): string | undefined => process.env.REACT_APP_BACKEND_URL;
export const getFrontendBase = (): string | undefined => process.env.REACT_APP_FRONTEND_URL;
// TODO: add MUI, translations, google login, personlized hooks, dayjs
// TODO: add string, date, time helpers 
// TODO: Shared home navigation, forms
// TODO: Create shared templates