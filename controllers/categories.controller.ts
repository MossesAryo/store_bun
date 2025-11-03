import { Categories } from "../models/categories";

export const getAllCategories = async (response : any)  => {
  const category = await Categories.fetchAll();
     
  const data = category.toJSON().map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
    }));

    return response.json({
         status: true,
         messages: "Successfully retrieved categories",
         data
});
};
