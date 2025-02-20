import { StateSchema } from '../../../store/store.ts';

export const getPlayerTrack = (state: StateSchema) => state.player.queue[state.player.currentIndex];
