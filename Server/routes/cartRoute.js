import express from 'express';
import authSeller from '../middlewares/authSeller.js';
import { updateCart } from '../controllers/cartController.js';
import authUser from '../middlewares/authUser.js';

const cartRouter = express.Router();

cartRouter.post('/update', authUser, updateCart);

export default cartRouter;
