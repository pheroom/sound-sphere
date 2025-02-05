import { StateSchema } from '../../../store/store.ts';

export const getUserError = (state: StateSchema) => state.user.error;
