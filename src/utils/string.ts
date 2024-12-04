export const isEmptyOrUndefined = (value?: string): boolean => {
    return value === undefined || value.trim() === '';
};
