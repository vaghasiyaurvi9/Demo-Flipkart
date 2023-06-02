
import productSchema from "../model/productSchema.js";
import categorySchema from "../model/categorySchema.js";


const Category = {
    Query: {
        category: async () => await categorySchema.find({}),
        productsByCategory: async (_, { name }) => {
            return await productSchema.find({ category: name })

        },
    },
    Mutation: {
        //Add Category
        category: async (_, { category }) => {
            const categoryData = new categorySchema(category);


            return await categoryData.save();
        },
    }

}
export default Category