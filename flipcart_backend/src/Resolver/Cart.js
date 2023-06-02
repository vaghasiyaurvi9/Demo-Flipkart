import Carts from "../model/CartSchema.js"


const Cart = {

    Query: {

        Carts: async (_, args) => {
            return new Promise(async (resolve, reject) => {
                const total = await Carts.find().count();
                const cart = await Carts.find();
                const users = args.userId
                const Item = await Carts.find({ userId: { $in: users } })
                resolve({ count: total, Item: Item, data: cart });
            })
        },
        getCarts: async (_, { id }) => await Carts.findById({ id }),
    },

    Mutation: {
        async addCarts(args, { cartInput: { customerId, userId, productId, name, productDetail, quantity, price, url, brand, category, Stripe_Id, Stripe_priceId } }) {
            const oldProduct = await Carts.findOne({ userId, productId });

            if (oldProduct) {
                const updCart = {};
                updCart.userId = userId
                updCart.productId = productId
                updCart.name = name
                updCart.productDetail = productDetail
                updCart.quantity = oldProduct.quantity += 1 || 1
                updCart.price = price
                updCart.totalPrice = price * oldProduct.quantity || price * 1
                updCart.url = url
                updCart.brand = brand
                updCart.category = category

                const cart = await Carts.findOneAndUpdate({ userId, productId }, { $set: updCart }, { new: true });

                return cart;
            }

            let newCart = new Carts({
                customerId: customerId,
                userId: userId,
                productId: productId,
                name: name,
                productDetail: productDetail,
                brand: brand,
                category: category,
                quantity: quantity || 1,
                price: price,
                totalPrice: price * quantity || price * 1,
                url: url,
                Stripe_Id: Stripe_Id,
                Stripe_priceId: Stripe_priceId

            });
            return await newCart.save();
        },

        deleteCart: async (_, args) => {
            await Carts.findByIdAndDelete(args.id)
            return "cart is deleted"
        },

        updateCarts: async (root, args) => {
            const { id, quantity, totalPrice } = args
            const updCart = {};
            updCart.quantity = quantity
            updCart.totalPrice = totalPrice
            const cart = await Carts.findByIdAndUpdate(id, updCart, { new: true })
            return cart;
        },

    },



}
export default Cart