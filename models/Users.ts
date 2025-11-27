import { bookshelf } from "../config/database";
import { Role } from "./Role";

export const Users = bookshelf.model("users", {
  tableName: "users",
  hasTimestamps: true, 
  role() {
    return this.belongsTo(Role, "role_id");
  }
});
