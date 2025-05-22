import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
	const { token } = req.cookies;
	if (!token) {
		return res.json({
			success: false,
			message: 'Token not found',
		});
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (decoded.id) {
			req.body = req.body || {};
			req.body.userId = decoded.id;
		} else {
			return res.json({
				success: false,
				message: 'Id not found',
			});
		}
		next();
	} catch (error) {
		console.error(error.message);
		return res.json({
			success: false,
			message: 'Unauthorized',
		});
	}
};

export default authUser;
