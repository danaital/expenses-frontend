export const isDev = (): boolean => process.env.NODE_ENV === 'development';
export const getBackendBase = (): string | undefined => process.env.REACT_APP_BACKEND_URL;
export const getFrontendBase = (): string | undefined => process.env.REACT_APP_FRONTEND_URL;
