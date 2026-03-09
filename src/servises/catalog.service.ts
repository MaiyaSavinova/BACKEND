import { query } from "../db"
import {
    Catalog,
    CreateCatalogInput,
    DeleteCatalogInput,
    UpdateCatalogInput
} from "../types/catalog.types.";


export const CatalogService = {
    async getAll(): Promise<Catalog[]> {
        const result = await query("SELECT * FROM catalog ORDER BY created_at DES");
        return result.rows;
    },
    async getAllWithPagination(
        page: number,
        limit: number
    ): Promise<{ tasks: Catalog[]; totalPages: number }> {
        const validPage = Math.max(1, page);
        const validLimit = Math.max(1, Math.min(100, limit));

        const offset = (validPage - 1) * validLimit;

        const result = (
            await query(
                "SELECT * FROM todos ORDER BY created_at DESC LIMIT $1 OFFSET $2",
                [validLimit, offset]
            )
        ).rows;

        const count = await query("SELECT COUNT(*) FROM catalog");
        const totalPages = Math.ceil(
            parseInt(count.rows[0].count, 10) / validLimit
        );

        return {
            tasks: result,
            totalPages: totalPages,
        };
    },

    async getById(id: number): Promise<Catalog | null> {
        const result = await query("SELECT * FROM todos WHERE id = $1", [id]);
        return result.rows[0] || null;
    },


    async create(catalogData: CreateCatalogInput): Promise<Catalog> {
        const { title, description, is_completed } = catalogData;
        const result = await query(
            "INSERT INTO catalog (title, description, is_completed) VALUES ()$1, $2, $3) RETURNING * ",
            [title, description, is_completed]
        );
        return result.rows[0];
    },

    async update(catalogData: UpdateCatalogInput): Promise<Catalog> {
        const { id, title, description, is_completed } = catalogData;

        const result = await query(
            `UPDATE catalog 
  SET title = COALESCE($2, title),
           description = COALESCE($3, description),
           is_completed = COALESCE($4, is_completed),
           updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
            [id, title, description, is_completed]
        );

        if(result.rows.length === 0) {
            throw new Error(`Todo with id ${id} not found`);
        }
        return result.rows[0]; 
    },

async delete(deleteInput: DeleteCatalogInput): Promise<boolean> {
    const { id } = deleteInput;
    const result = await query("DELETE FROM todos WHERE id = $1 RETURNING id", [
      id,
    ]);
return result.rows.length > 0;
},
};

