import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { PlayerSchema, RepeatMode } from './playerSchema.ts';
import { VOLUME_LOCALSTORAGE_KEY } from '../../utils/const.ts';

const initialState: PlayerSchema = {
    queue: [],
    currentIndex: 0,
    isActive: false,
    isPlaying: false,
    isMuted: false,
    repeatMode: RepeatMode.NO_REPEAT,
    currentTime: 0,
    duration: 1,
    volume: Number(localStorage.getItem(VOLUME_LOCALSTORAGE_KEY) ?? 50),
};

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setQueue: (state, action: PayloadAction<Partial<PlayerSchema>>) => {
            state.queue = action.payload.queue || state.queue || [];
            state.currentIndex = action.payload.currentIndex || 0;
            state.isPlaying = true;
            state.isActive = true;
        },
        playNextTrackByEnd: (state) => {
            if (state.repeatMode === RepeatMode.REPEAT_ONE) {
                state.currentTime = 0;
                return;
            }
            if (state.currentIndex === state.queue.length - 1) {
                if (state.repeatMode === RepeatMode.NO_REPEAT) {
                    state.isPlaying = false;
                    return;
                }
                state.currentIndex = 0;
            } else {
                state.currentIndex += 1;
            }
        },
        playNextTrack: (state) => {
            state.currentIndex = state.currentIndex === state.queue.length - 1 ? 0 : state.currentIndex + 1;
            state.isPlaying = true;
            state.isActive = true;
        },
        playPrevTrack: (state) => {
            state.currentIndex = state.currentIndex === 0 ? state.queue.length - 1 : state.currentIndex - 1;
            state.isPlaying = true;
            state.isActive = true;
        },
        resetQueue: (state, action: PayloadAction<Partial<PlayerSchema>>) => {
            state.isPlaying = false;
            state.isActive = false;
            state.queue = [];
            state.currentIndex = 0;
        },
        setIsActive: (state, action: PayloadAction<boolean>) => {
            state.isActive = action.payload;
        },
        setCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload;
        },
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
        setIsMuted: (state, action: PayloadAction<boolean>) => {
            state.isMuted = action.payload;
        },
        setDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload;
        },
        setNextRepeatMode: (state) => {
            switch (state.repeatMode) {
                case RepeatMode.NO_REPEAT:
                    state.repeatMode = RepeatMode.REPEAT;
                    break;
                case RepeatMode.REPEAT:
                    state.repeatMode = RepeatMode.REPEAT_ONE;
                    break;
                default:
                    state.repeatMode = RepeatMode.NO_REPEAT;
            }
        },
    },
});

export const { actions: playerActions } = playerSlice;

export const { reducer: playerReducer } = playerSlice;
