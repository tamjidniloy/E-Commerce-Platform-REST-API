export const CreateWish=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}

export const ReadWishList=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}

export const UpdateWish=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}

export const RemoveWish=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}