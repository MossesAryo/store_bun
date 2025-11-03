import { Hono } from "hono";
import { getAllCategories } from "../controllers/categories.controller";
import { getAllproducts } from "../controllers/products.controller";
const api = new Hono();

api.get("/", (c) => {
  return c.json({ message: "Hello World!" });
});
api.get("/categories", getAllCategories);
api.get("/products", getAllproducts);
export default api;
