import { StateSchema } from '../../store.ts';

export const getUserAuthData = (state: StateSchema) => state.user.authData;
