import { bookshelf } from "../config/database";
import { Products } from "./Product";

export const Categories = bookshelf.model("Categories", {
  tableName: "categories",
  hasTimestamps: true,
   products() {
    return this.hasMany(Products, "category_id");
   },
});
