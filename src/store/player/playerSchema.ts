import { Track } from '../../models/Track.ts';

export enum RepeatMode{
    REPEAT,
    REPEAT_ONE,
    NO_REPEAT,
}

export interface PlayerSchema {
    queue: Track[]
    currentIndex: number

    isActive: boolean
    isPlaying: boolean
    isMuted: boolean
    currentTime: number
    duration: number
    volume: number
    repeatMode: RepeatMode
}
