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
api.post("/categories/action",  categoriesController.actions);
api.delete("/categories/delete/:id", categoriesController.deleteCategory);

api.get("/products", productsController.getAllproducts);
api.post("/products/action", productsController.actions);
api.delete("/products/delete/:id", productsController.actions);


export default api;
