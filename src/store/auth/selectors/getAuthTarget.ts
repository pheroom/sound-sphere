import { StateSchema } from '../../store.ts';

export const getAuthTarget = (state: StateSchema) => state.auth.authTarget;
