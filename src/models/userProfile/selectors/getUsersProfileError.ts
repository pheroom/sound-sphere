import { StateSchema } from '../../../store/store.ts';

export const getUsersProfileError = (state: StateSchema) => state.usersProfile.error;
