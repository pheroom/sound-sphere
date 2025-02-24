import { StateSchema } from '../../store.ts';

export const getUserIsLoading = (state: StateSchema) => state.user.isLoading || false;
