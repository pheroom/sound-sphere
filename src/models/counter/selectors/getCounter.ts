import { StateSchema } from '../../../store/store.ts';

export const getCounter = (state: StateSchema) => state.counter;
