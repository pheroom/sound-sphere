export const getFullFilePath = (name?: string, returnName: boolean = false) => {
    if (returnName) return name;
    if (!name) return '';
    return import.meta.env.VITE_STATIC_URL + name;
};
