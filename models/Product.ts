import { bookshelf } from "../config/database";
import { Categories } from "./categories";


export const Products = bookshelf.model("Products", {
  tableName: "products",
  hasTimestamps: true,
     category() {
    return this.belongsTo(Categories, "category_id"); 
   },
});
