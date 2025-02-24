import { StateSchema } from '../../store.ts';

export const getAuthError = (state: StateSchema) => state.auth.error;
