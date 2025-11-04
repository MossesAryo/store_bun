import { Categories } from "../models/Categories";
import type { Context } from "hono";
export class CategoriesController {

async getAllCategories(request : Context){
  const category = await Categories.fetchAll();
     
  const data = category.toJSON().map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
    }));

    return Response.json({
         status: 200,
         messages: "Successfully retrieved categories",
         data
});
};

 async actions (request : Context) {
  const body  = await request.req.json();
    const id = body.id;
   
   if (!id) {
  
       const newCategory = await new Categories({
        name: body.name,
        description: body.description,
      }).save();
    return Response.json({
        status: 201,
        messages: "Successfully created category",
        data: newCategory,
    });
   
   }
   else{
        const category = await Categories.where({ id }).fetch({require: false});
        const updatedCategory = await category.save({
            name: body.name ?? category.get("name"),
            description: body.description ?? category.get("description"),
        });
    return Response.json({
        status: 201,
        messages: "Successfully updated category",
        data: updatedCategory,
    });
   }
    };

 async deleteCategory(request : Context){
    const id = request.req.param('id')
    const category = await Categories.where({id}).fetch({require: false});
    await category.destroy();
    return Response.json({
        status: 200,
        messages: "Successfully deleted category",
    });
};
}
