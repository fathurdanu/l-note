const { Cart, User, LineItem, Product, Order } = require('../models')

class CartController {
    static async getAllCarts(req, res, next) {
        try {
            let carts = await Cart.findAll({
                include: User
            })
            res.status(200).json(carts)
        } catch (err) {
            next(err)
        }
    }
    static async getCartByUserId(req, res, next) {
        const id = +req.userData.id
        try {
            let getCart = await Cart.findOne({
                where: { status: "open", UserId: id }
            })
            let lineItems = await LineItem.findAll({
                // attributes: ["*"],
                include: [Product],
                where: { CartId: getCart.id }
            })
            let newVar = { ...getCart.dataValues, lineItems: lineItems }
            res.status(200).json(newVar)
        } catch (err) {
            next(err)
        }
    }
    static async addToCart(req, res, next) {
        try {
            const id = +req.userData.id
            const { qty, ProductId } = req.body;

            // cari keranjang yang open
            const shoppingCart = await Cart.findOne({
                where: { status: "open", UserId: id }
            })

            // masukkan product ke keranjang
            let result = await LineItem.create({
                CartId: shoppingCart.id,
                ProductId,
                qty,
                status: "cart"
            })
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }
    static async checkout(req, res, next) {
        try {
            const id = +req.userData.id

            const shoppingCart = await Cart.findOne({
                where: { status: "open", UserId: id }
            })

            const lineItems = await LineItem.findAll({
                include: Product,
                where: { CartId: shoppingCart.id }
            })

            let totalQty = 0;
            let subtotal = 0;
            lineItems.forEach(lineItem => {
                totalQty = totalQty + lineItem.qty
                subtotal = subtotal + (lineItem.qty * lineItem.Product.price)
            })

            let discount
            if (totalQty > 2) {
                discount = Math.floor((subtotal * 5) / 100)
            } else {
                discount = 0
            }

            let totalDiscount = subtotal - discount

            let totalTax = (subtotal * 0.2) / 100

            let totalDue = totalDiscount + totalTax

            let order = await Order.create({
                subtotal: subtotal,
                discount: discount,
                totalDue: totalDue,
                totalQty: totalQty,
                tax: totalTax,
                status: 'unpaid',
                UserId: id
            })

            let update = await LineItem.update({
                status: 'order',
                OrderId: order.id,
            }, { where: { CartId: shoppingCart.id } })

            await Cart.update({
                status: 'close'
            }, {
                where: { status: 'open', UserId: id }
            })

            await Cart.create({
                UserId: id,
                status: "open"
            })

            for (const lineItem of lineItems){
                const product = await Product.findByPk(lineItem.ProductId);
                await Product.update({
                    stock: product.stock - lineItem.qty,
                    totalSold: product.totalSold + lineItem.qty,
                },{
                    where: { id: lineItem.ProductId }
                })
            }

            res.status(201).json(order);
        } catch (err) {
            next(err)
        }
    }


    static async editLineItem(req, res, next) {
        try {
            const id = +req.params.id;
            const { qty } = req.body;

            const result = await LineItem.update({
                qty: Number(qty),
            }, {
                where: { id }
            })

            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }


    static async deleteLineItem(req, res, next) {
        try {
            const id = +req.params.id;
            const result = await LineItem.destroy({
                where: { id }
            })
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }
}
module.exports = CartController