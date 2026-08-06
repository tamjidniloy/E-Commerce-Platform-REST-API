import profilesModel from "../models/profilesModel.js";
import mongoose from "mongoose";
import WishModel from "../models/wishesModel.js";
import res from "express/lib/response.js";
const ObjectId = mongoose.Types.ObjectId;

export const CreateWishListService=async(req)=>{
    try {
        let user_id = req.headers.user_id;
        let productID = req.body.productID;
        let postJSON={
            productID:productID,
            userID:user_id
        }
        let data = await WishModel.updateOne(postJSON, {$set:postJSON},{upsert:true});
        return {status:"success", message:"New Wish ListService successfully",data:data};
    }catch (error) {
        console.log(error)
        return {status:"error", message:error.toString()};
    }
}


export const ReadWishListService=async(req)=>{
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
        const data = await WishModel.aggregate([
            matchStage,
            JoinStageProduct
        ])
        return {status:"success", message:`${customerName} list of Wish: `,data:data};
    }catch (error) {
        console.log(error)
        return {status:"error", message:error.toString()};
    }
}


export const RemoveWishListService=async(req)=>{
    try {
        let user_id = req.headers.user_id;
        let productID = req.body.productID;
        let postJSON={
            productID:productID,
            userID:user_id
        }
        let data = await WishModel.deleteOne(postJSON);
        return {status:"success", message:"Deleted Wish ListService successfully",data: data};
    }catch (error) {
        console.log(error)
        return {status:"error", message:error.toString()};
    }
}