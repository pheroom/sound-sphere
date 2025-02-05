import { StateSchema } from '../../../store/store.ts';

export const getAuthInited = (state: StateSchema) => state.auth._inited;
