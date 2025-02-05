import { StateSchema } from '../../../store/store.ts';

export const getUserAuthData = (state: StateSchema) => state.user.authData;
