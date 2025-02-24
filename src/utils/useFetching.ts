import { useCallback, useState } from 'react';
import { getFetchError } from './getFetchError.ts';

export const useFetching = <T>(callback: (...args: any[]) => Promise<T>)
    : [(...args: any[]) => Promise<T | undefined>, boolean, string] => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = useCallback(async (...args: any[]): Promise<T | undefined> => {
        try {
            setIsLoading(true);
            // await new Promise((resolve) => setTimeout(resolve, 1000));
            const res = await callback(...args);
            return res;
        } catch (error) {
            setError(getFetchError(error));
        } finally {
            setIsLoading(false);
        }
    }, [callback]);

    return [fetching, isLoading, error];
};
