import { query } from "../db"


export const CatalogService = {
    async getAll(){
        return (await query('SEECT * FROM catalog')).rows;
    }

 /*async crate(catalogData: CreateCatalog) {
const result = await query()
    }*/
}

