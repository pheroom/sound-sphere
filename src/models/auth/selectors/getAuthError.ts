import { StateSchema } from '../../../store/store.ts';

export const getAuthError = (state: StateSchema) => state.auth.error;
