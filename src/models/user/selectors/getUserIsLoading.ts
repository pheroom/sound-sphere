import { StateSchema } from '../../../store/store.ts';

export const getUserIsLoading = (state: StateSchema) => state.user.isLoading || false;
