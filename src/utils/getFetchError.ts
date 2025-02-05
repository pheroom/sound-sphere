export function getFetchError(error: any): string {
    return error?.response?.data?.message || 'Request execution error';
}
