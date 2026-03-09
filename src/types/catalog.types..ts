export interface Catalog {
    id: number;
    title: string;
    is_completed: boolean;
    create_at: Date;
}

export type CreateCatalog = Omit<Catalog, 'id' | 'create_at'> 