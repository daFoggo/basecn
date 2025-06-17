export interface INoteBook {
    id: string;
    title?: string;
    description?: string;
    sources?: ISource[];
    updatedAt?: string;
    isPublic?: boolean;
}

export interface ISource {
    id: string;
    title?: string;
}