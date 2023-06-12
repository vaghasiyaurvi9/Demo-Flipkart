
import productSchema from "../model/productSchema.js";
import categorySchema from "../model/categorySchema.js";


const Category = {
    Query: {
        category: async () => await categorySchema.find({}),
        categoryById :async (_,{_id}) => await categorySchema.findById({_id}),
        productsByCategory: async (_, { name }) => {
            return await productSchema.find({ category: name })

        },
    },
    Mutation: {
        category: async (_, { category }) => {
            const categoryData = new categorySchema(category);



            return await categoryData.save();
        },
        deleteCategory:async (_,{ _id }) => {
            const deleteData =  categorySchema.findByIdAndDelete({_id})
            return await deleteData
        },

        updateCategory:async (_,{ _id, name,status}) => { 
            // console.log("===name",name);
            let updcategory = {}
            updcategory.name = name
            updcategory.status =  status
            const updateData = await categorySchema.findByIdAndUpdate({_id},{$set:updcategory},{new:true})
            
            return await updateData
        }
    }

}
export default Category