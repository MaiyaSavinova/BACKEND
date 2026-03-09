import { Router } from "express"
import { CatalogController } from "../controllers/catalog.controller";

const router = Router();

/**
 * @swagger
 * /api/catalog:
 *   get:
 *     summery: Get all catalog
 *     responses: 
 *       200: 
 *         description: Array catalog
 */

router.get("/catalog", CatalogController.geyAll);

export default router;



