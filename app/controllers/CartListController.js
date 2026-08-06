import {
    CreateCartListService,
    ReadCartListService,
    RemoveCartListService,
    UpdateCartListService
} from "../service/CartService.js";

export const CreateCart=async(req,res)=>{
    try {
        let result = await CreateCartListService(req);
        if(result.status === "success") {
            return res.status(200).json({ status:"success", message:"New cart added successfully", data:result});
        }else{
            return res.status(400).json(result.message);
        }
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const ReadCartList=async(req,res)=>{
    try {
        let result = await ReadCartListService(req);
        if(result.status === "success") {
            return res.status(200).json({ status:"success", message:"New cart added successfully", data:result});
        }else{
            return res.status(400).json(result.message);
        }
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const UpdateCart=async(req,res)=>{
    try {
        let result = await UpdateCartListService(req);
        if(result.status === "success") {
            return res.status(200).json({ status:"success", message:"New cart added successfully", data:result});
        }else{
            return res.status(400).json(result.message);
        }
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const RemoveCart = async (req, res) => {
    try {
        const result = await RemoveCartListService(req);
        if(result.status === "success") {
            return res.status(200).json({ status:"success", message:"Cart removed successfully", data:result});
        }else{
            return res.status(400).json(result.message);
        }
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.toString()
        });
    }
};