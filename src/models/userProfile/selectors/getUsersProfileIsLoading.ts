import { StateSchema } from '../../../store/store.ts';

export const getUsersProfileIsLoading = (state: StateSchema) => state.usersProfile.isLoading || false;
