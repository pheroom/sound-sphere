import { StateSchema } from '../../../store/store.ts';

export const getAuthTarget = (state: StateSchema) => state.auth.authTarget;
