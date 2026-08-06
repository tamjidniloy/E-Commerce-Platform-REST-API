import WishModel from "../models/wishesModel.js";
import res from "express/lib/response.js";

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