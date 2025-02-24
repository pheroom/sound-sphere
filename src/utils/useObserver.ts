import { useEffect, useRef } from 'react';

export const useObserver = (
    canLoad: boolean,
    isLoading: boolean,
    callback: () => void,
) => {
    const lastItemRef = useRef<HTMLDivElement | null>(null);
    const observer = useRef<IntersectionObserver>();

    useEffect(() => {
        if (isLoading || !lastItemRef.current) return;
        if (observer.current) observer.current.disconnect();

        const cb: IntersectionObserverCallback = (entries, observer) => {
            if (entries[0].isIntersecting && canLoad) {
                callback();
            }
        };

        observer.current = new IntersectionObserver(cb);
        observer.current.observe(lastItemRef.current);
    }, [isLoading]);

    return lastItemRef;
};
