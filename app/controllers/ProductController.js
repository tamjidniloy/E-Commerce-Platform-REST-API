import {
    Product_List_BY_Brand_Service,
    Product_List_BY_Category_Service,
    Product_List_BY_Slider_Service
} from "../service/ProductServices.js";

export const ProductListByCategory=async(req,res)=>{
    try {
        const result = await Product_List_BY_Category_Service(req);
        return res.status(200).json({
            status: "success",
            message: "Product list by Category retrieved successfully",
            data: result
        });
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const ProductListByRemark=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const ProductListByBrand=async(req,res)=>{
    try {
        const result = await Product_List_BY_Brand_Service(req);
        return res.status(200).json({
            status: "success",
            message: "Product list by brand retrieved successfully",
            data: result
        });
    }catch (error) {
        console.error("ProductListByBrand controller error:", error);
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const ProductListBySlider=async(req,res)=>{
    try {
        let result = await Product_List_BY_Slider_Service();
        return res.status(200).json({ status:"success", message:"Here is the Product Sliders : ", data : result });
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const ProductDetailsID=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const ProductListByKeyword=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const ProductReviewListById=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const CreateProductReview=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}