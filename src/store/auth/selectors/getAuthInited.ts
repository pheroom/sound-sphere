import { StateSchema } from '../../store.ts';

export const getAuthInited = (state: StateSchema) => state.auth._inited;
