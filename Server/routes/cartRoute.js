import mongoose from "mongoose";
import authSeller from "../middlewares/authSeller.js";
import { updateCart } from "../controllers/cartController.js";


const cartRouter = mongoose.Router();

cartRouter.post('/update', authSeller, updateCart)

export default cartRouter;