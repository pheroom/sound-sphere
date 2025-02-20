import { useCallback, useState } from 'react';
import { getFetchError } from './getFetchError.ts';

export const useFetching = <T>(callback: (...args: any[]) => Promise<T>)
    : [(...args: any[]) => Promise<void>, boolean, string] => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = useCallback(async (...args: any[]) => {
        try {
            setIsLoading(true);
            await callback(...args);
        } catch (error) {
            setError(getFetchError(error));
        } finally {
            setIsLoading(false);
        }
    }, [callback]);

    return [fetching, isLoading, error];
};
