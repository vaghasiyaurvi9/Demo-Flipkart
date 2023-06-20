import productSchema from "../model/productSchema.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51N6WIySEXyEfFfEC2Gdy7czIdtzu2vcwU2nKHcMAacfFIMvjUzN0ea2xup5ylD8zkmxOr2CS6l3BpZpxlGMT7u0y006dNaPn0T');

const Product = {
    Query: {
        products: async (_, { limit, offset }) => {
            const products = await productSchema.find().limit(limit).skip(offset);
            return products;

        },
        product: async (_, { _id }) => await productSchema.findById({ _id }),
        searchItem: async (_, { searchItem }) => {
            if (!searchItem) {
                return await productSchema.find({});
            }
            return await productSchema.find({
                "$or": [
                    { "name": { $regex: searchItem } },

                ]
            })
        },
        pagination: async (_, { page, pageSize }) => {
            const productData = await productSchema.find({});

            const startIndex = (page - 1) * pageSize
            const lastIndex = (page) * pageSize

            const results = {}
            results.totalProduct = productData.length;
            results.pageCount = Math.ceil(productData.length / pageSize);


            if (lastIndex < productData.length) {
                results.next = {
                    page: page + 1,
                }
            }
            if (startIndex > 0) {
                results.prev = {
                    page: page - 1,
                }
            }

            results.product = productData.slice(startIndex, lastIndex);
            // console.log('results.result',results.result);
            console.log("results===", results);
            return results;
        }

    },

    Mutation: {
        //add product
        addProduct: async (_, { addProduct }) => {
            // product add in stripe

            const product = await stripe.products.create({
                name: addProduct.name,
                description: addProduct.description,

                default_price_data: {
                    unit_amount: addProduct.price * 100,
                    currency: 'inr',
                    // recurring: { interval: Recurring },
                },
                metadata: {
                    'brand': addProduct.brand,
                    'category': addProduct.category
                }
            })
            // console.log(product);

            const products = new productSchema({

                ...addProduct,
                Stripe_Id: product.id,
                Stripe_priceId: product.default_price
            })
            console.log("===product",product);
            return await products.save();

        },

        //update product
        updateProduct: async (_, { updateProduct }) => {
            // console.log(updateProduct);
            const updProduct = {};
            updProduct._id = updateProduct._id
            updProduct.name = updateProduct.name
            updProduct.price = updateProduct.price
            updProduct.brand = updateProduct.brand
            updProduct.category = updateProduct.category
            updProduct.productDetail = updateProduct.productDetail
            updProduct.url = updateProduct.url
            updProduct.status =updateProduct.status

            const product = productSchema.findByIdAndUpdate(updateProduct._id, updProduct, { new: true });
            return await product;
        },

        // delete product
        deleteProduct: async (_, { _id }) => {
            const product = productSchema.findByIdAndDelete({ _id })
            return await product;

        },
        rateProduct :async (_,{rating,productId,userId}) =>{
            const createrating = await productSchema.create({rating})
            
            const product =await new productSchema({
                    rating:createrating,
                    productId:productId,
                    userId:userId
            })
            return await product.save();
        }


    }

}
export default Product