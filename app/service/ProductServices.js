import mongoose from "mongoose";
import slidersModel from "../models/slidersModel.js";
import CategoryModel from "../models/categoriesModel.js";
import BrandModel from "../models/brandsModel.js";
import ProductModel from "../models/productsModel.js";
const ObjectId = mongoose.Types.ObjectId;

export const Brand_List_Service = async () => {
    try {
        const data = await BrandModel.find();
        return data;
    }catch (error){
        console.log(error);
        return {status:"fail",data:error.toString()}
    }
};

export const Category_List_Service = async () => {
    try {
        const data = await CategoryModel.find();
        return data;
    }catch (error){
        console.log(error);
        return {status:"fail", message:error.toString()}
    }
};

export const Product_List_BY_Category_Service = async () => {

};

export const Product_List_BY_Remarks_Service = async () => {

};

export const Product_List_BY_Brand_Service = async (req) => {
    try{
        let BrandID = req.params.BrandID;
        const brandObjectID = new mongoose.Types.ObjectId(BrandID);

        let MatchStage={$match:{brandID:brandObjectID}}

        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};

        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}

        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        // Query
        let data= await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ])

        return {status:"success",data:data}
    }catch (error) {
        console.log(error);
        return {status:"fail", message:error.toString()}
    }
};

export const Product_List_BY_Slider_Service = async () => {
    try {
        const data = await slidersModel.find();
        return data;
    }catch (error){
        console.log(error);
        return {status:"fail", message:error.toString()}
    }
};

export const Product_Details_ID_Service = async () => {

};

export const Product_List_BY_Keyword_Service = async () => {

};

export const Product_List_BY_Review_Service = async () => {

};

export const ProductsDetailsService = async () => {

};