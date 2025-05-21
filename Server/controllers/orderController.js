import Order from '../models/Order.js';
import Product from '../models/Product.js';

// Place Order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
	try {
		const { userId, items, address } = req.body;
		if (!address || items.length === 0) {
			return res.json({
				success: false,
				message: 'Invalid order data',
			});
		}
		// calculate total amount
		let amount = await items.reduce(async (acc, item) => {
			const product = await Product.findById(item.product);
			if (!product) {
				return res.json({
					success: false,
					message: 'Product not found',
				});
			}
			return (await acc) + product.offerPrice * item.quantity;
		}, 0);

		// Add tax 2%
		amount += Math.floor((amount * 2) / 100);

		await Order.create({
			userId,
			items,
			address,
			amount,
			paymentType: 'COD',
		});

		return res.json({
			success: true,
			message: 'Order placed successfully',
		});
	} catch (error) {
		return res.json({
			success: false,
			message: error.message,
		});
	}
};

// Get Orders by User ID : /api/order/user
export const getUserOrders = async (req, res) => {
	try {
		const { userId } = req.body;
		const orders = await Order.find({
			userId,
			$or: [
				{
					paymentType: 'COD',
				},
				{
					isPaid: 'true',
				},
			],
		})
			.populate('items.product.address')
			.sort({
				createdAt: -1,
			});

		res.json({
			success: true,
			orders,
		});
	} catch (error) {
		return res.json({
			success: false,
			message: error.message,
		});
	}
};

// Get All Orders (for seller and admin): /api/order/seller
export const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find({
			$or: [
				{
					paymentType: 'COD',
				},
				{
					isPaid: 'true',
				},
			],
		}).populate('items.product.address');

		res.json({
			success: true,
			orders,
		});
	} catch (error) {
		return res.json({
			success: false,
			message: error.message,
		});
	}
};
