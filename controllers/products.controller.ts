import { Products } from "../models/product";

export const getAllproducts = async (response : any)  => {
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

    return response.json({
         status: true,
         messages: "Successfully retrieved products",
         data
});
};
