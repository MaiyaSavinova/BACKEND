import { error } from "node:console";
import { CatalogService } from "../servises/catalog.service"
import {Request, Response} from 'express';

export const CatalogController = {
    async geyAll(req: Request, res: Response) {
        try {
            const catalog = await CatalogService.getAll();
            res.json(catalog);
        } catch (e) {
            res.status(500).json({ error: "Failed " + e})
        }
    },
};