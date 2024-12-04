export interface Photo {
    id: string;
    alt_description?: string | null;
    width: number;
    height: number;
    urls: { regular: string; raw: string; small: string };
    color: string | null;
    user: {
        username: string;
        name: string;
    };
}
