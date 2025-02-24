import { StateSchema } from '../../store.ts';

export const getAuthIsLoading = (state: StateSchema) => state.auth.isLoading || false;
