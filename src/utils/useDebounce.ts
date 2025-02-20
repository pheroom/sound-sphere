import { useCallback, useRef } from 'react';

export const useDebounce = <T>(callback: (...args: any[]) => T, delay: number): (...args: any[]) => void => {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debouncedCallback = useCallback((...args: any[]) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);

    return debouncedCallback;
};
