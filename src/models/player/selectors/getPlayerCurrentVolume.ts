import { StateSchema } from '../../../store/store.ts';

export const getPlayerCurrentVolume = (state: StateSchema) => (state.player.isMuted ? 0 : state.player.volume);
