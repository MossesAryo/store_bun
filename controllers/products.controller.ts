import type { Context } from "hono";
import { Products } from "../models/Product";

export class ProductsController {

  async getAllproducts (response : Context) {
    const products = await Products.fetchAll({
      withRelated: ["category"],
    });
       
    const data = products.toJSON().map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        stock: item.stock,
        category: {  
                      id: item.category.id,
                      name: item.category.name,
                      description: item.category.description,
      }    
      }));
  
      return Response.json({
           status: 200,
           messages: "Successfully retrieved products",
           data
  });
  };
}
