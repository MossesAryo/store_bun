import { Hono } from "hono";
import {CategoriesController} from "../controllers/categories.controller";
import { ProductsController } from "../controllers/products.controller";
const api = new Hono();
const productsController = new ProductsController();
const categoriesController = new CategoriesController();

api.get("/", (c) => {
  return c.json({ message: "Hello World!" });
});
api.get("/categories", categoriesController.getAllCategories);
api.post("/categories/store",  categoriesController.actions);
api.post("/categories/update/:id", categoriesController.actions);
api.delete("/categories/delete/:id", categoriesController.deleteCategory);

api.get("/products", productsController.getAllproducts);

export default api;
