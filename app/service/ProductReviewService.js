import mongoose from "mongoose";
import ReviewModel from "../models/reviewsModel.js";

const ObjectId = mongoose.Types.ObjectId;

export const CreateReviewService=async(req)=>{
    try {
        let user_id = new ObjectId(req.headers.user_id);
        let {userID, productID, des, rating} = req.body;
        let postJSON={
            userID:user_id,
            productID:productID,
            des:des,
            rating:rating
        }
        let data = await ReviewModel.updateOne(postJSON, {$set:postJSON},{upsert:true});
        return {status:"success", message:"New Wish ListService successfully",data:data};
    }catch (error) {
        console.log(error)
        return {status:"error", message:error.toString()};
    }
}



export const UpdateReviewService=async(req)=>{
    try {
        let user_id = new ObjectId(req.headers.user_id);
        let {productID, des, rating} = req.body;
        let postJSON={
            userID:user_id,
            productID:productID,
            des:des,
            rating:rating
        }
        let data = await ReviewModel.updateOne({userID:user_id, productID:productID}, {$set:postJSON},{upsert:true});
        return {status:"success", message:"New Wish ListService successfully",data:data};
    }catch (error) {
        console.log(error)
        return {status:"error", message:error.toString()};
    }
}