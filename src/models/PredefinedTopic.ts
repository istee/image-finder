export enum PredefinedTopic {
    Travel = 'Travel',
    Cars = 'Cars',
    Wildlife = 'Wildlife',
    Technology = 'Technology',
}

export const isPredefinedTopic = (value?: string): value is PredefinedTopic => {
    return Object.values(PredefinedTopic).includes(value as PredefinedTopic);
};
