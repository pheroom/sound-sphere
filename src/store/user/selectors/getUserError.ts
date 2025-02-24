import { StateSchema } from '../../store.ts';

export const getUserError = (state: StateSchema) => state.user.error;
