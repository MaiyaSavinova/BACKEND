export interface Catalog {
    id: number;
    title: string;
    is_completed: boolean;
    description?: string;
    create_at: Date;
}

export type CreateCatalogInput = Omit<Catalog, 'id' | 'create_at'> 

export type UpdateCatalogInput = Omit<Partial<Catalog>, "id"> & Pick<Catalog, "id">;

export type DeleteCatalogInput = Pick <Catalog, "id">;