import { StateSchema } from '../../../store/store.ts';

export const getAuthIsLoading = (state: StateSchema) => state.auth.isLoading || false;
