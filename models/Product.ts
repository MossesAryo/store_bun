import { bookshelf } from "../config/database";
import { Categories } from "./Categories";


export const Products = bookshelf.model("Products", {
  tableName: "products",
  hasTimestamps: true,
     category() {
    return this.belongsTo(Categories, "category_id"); 
   },
});
