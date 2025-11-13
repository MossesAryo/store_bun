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
  async actions (request : Context) {
    const body  = await request.req.json();
    const id = body.id;
    if (!id) {
      const newProduct = await new Products({
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock,
        category_id: body.category_id,
      }).save();
      return Response.json({
        status: 201,
        messages: "Successfully created product",
        data: newProduct,
      });
    } else {
      const product = await Products.where({ id }).fetch({require: false});
      const updatedProduct = await product.save({
        name: body.name ?? product.get("name"),
        description: body.description ?? product.get("description"),
        price: body.price ?? product.get("price"),
        stock: body.stock ?? product.get("stock"),
        category_id: body.category_id ?? product.get("category_id"),
      });
      return Response.json({
        status: 201,
        messages: "Successfully updated product",
        data: updatedProduct,
      });
    }
  }
 
  async deleteProduct(request : Context){
    const id = request.req.param('id')
    const product = await Products.where({id}).fetch({require: false});
    await product.destroy();
    return Response.json({
        status: 200,
        messages: "Successfully deleted product",
    });
};
}
