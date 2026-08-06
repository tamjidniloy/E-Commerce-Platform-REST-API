import {CreateWishListService, ReadWishListService, RemoveWishListService} from "../service/WishService.js";

export const CreateWish=async(req,res)=>{
    try {
        let result = await CreateWishListService(req);
        if(result.status === "success") {
            return res.status(200).json({ status:"success", message:"New Wish ListService successfully",data:result});
        }else{
            return res.status(400).json(result);
        }
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const ReadWishList=async(req,res)=>{
    try {
        let result = await ReadWishListService(req);
        if(result.status === "success") {
            return res.status(200).json({ status:"success", message:"Here is the wish list : ",data:result});
        }else{
            return res.status(400).json(result);
        }
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const RemoveWish=async(req,res)=>{
    try {
        let result = await RemoveWishListService(req);
        if(result.status === "success") {
            return res.status(200).json({ status:"success", message:"Deleted Wishlist Successfully",data:result});
        }else{
            return res.status(400).json(result);
        }
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}