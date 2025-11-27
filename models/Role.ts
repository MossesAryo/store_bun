import { bookshelf } from "../config/database";
import { Users } from "./Users";

export const Role = bookshelf.model("role", {
  tableName: "role",
  hasTimestamps: true, 
    users() {
    return this.hasMany(Users, "role_id","id");
    },
});
