import CartModel from "../models/cartsModel.js";
import profilesModel from "../models/profilesModel.js";
import mongoose from "mongoose";


const ObjectId = mongoose.Types.ObjectId;

export const CreateCartListService=async(req)=>{
    try {
        let user_id = req.headers.user_id;
        let {productID,color,qty,size} = req.body;
        let postJSON={
            productID:productID,
            userID:user_id,
            color:color,
            qty:qty,
            size:size
        }
        let data = await CartModel.create(postJSON);
        return {status:"success", message:"New Cart created successfully",data:data};
    }catch (error) {
        console.log(error)
        return {status:"error", message:error.toString()};
    }
}


export const ReadCartListService=async(req)=>{
    try {
        let user_id = new ObjectId(req.headers.user_id);

        let profileData = await profilesModel.findOne({userID:user_id}).select("cus_name").lean();
        let customerName = profileData.cus_name;

        let matchStage = {$match:{userID:user_id}};
        let JoinStageProduct = {
            $lookup:{
                from:"products",
                localField:"productID",
                foreignField:"_id",
                as:"product"
            }
        }
        const data = await CartModel.aggregate([
            matchStage,
            JoinStageProduct
        ])
        return {status:"success", message:`${customerName} list of Wish: `,data:data};
    }catch (error) {
        console.log(error)
        return {status:"error", message:error.toString()};
    }
}


export const RemoveCartListService = async (req) => {
    try {
        const cartId = new ObjectId(req.body);
        const userObjectId = new ObjectId(req.headers.user_id);
        const data = await CartModel.deleteOne({_id: cartId, userID: userObjectId});
        if (data.deletedCount === 0) {
            return {status: "fail", message: "Cart item not found or you are not authorized to remove it"};
        }
        return {status: "success", message: "Cart item deleted successfully", data};
    } catch (error) {
        console.log("Remove cart error:", error);
        return {status: "error", message: error.toString()};
    }
};