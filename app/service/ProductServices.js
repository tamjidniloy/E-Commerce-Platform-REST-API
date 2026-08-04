import mongoose from "mongoose";
import ReviewModel from "../models/reviewsModel.js";
import slidersModel from "../models/slidersModel.js";
import CategoryModel from "../models/categoriesModel.js";
import BrandModel from "../models/brandsModel.js";
import ProductModel from "../models/productsModel.js";

const ObjectId = mongoose.Types.ObjectId;

const escapeRegex = (value = "") => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};


// Reused by every product-list and product-details aggregation.
const productDetailsStages = [
    {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}},
    {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}},
    {$unwind: "$brand" },
    {$unwind: "$category" },
    {$project: {"brand._id": 0, "category._id": 0, categoryID: 0, brandID: 0}}
];
const findProducts = async (matchQuery) => {
    return ProductModel.aggregate([{ $match: matchQuery }, ...productDetailsStages]);
};



// Brand and category services
export const Brand_List_Service = async () => {
    try {
        return await BrandModel.find();
    } catch (error) {
        console.error(error);
        return {status: "fail", message: error.toString()};
    }
};


export const Category_List_Service = async () => {
    try {
        return await CategoryModel.find();
    } catch (error) {
        console.error(error);
        return {status: "fail", message: error.toString()};
    }
};


// Product services
export const Product_List_BY_Category_Service = async (req) => {
    try {
        const categoryID = new ObjectId(req.params.CategoryID);
        const data = await findProducts({ categoryID });
        return {status:"success",data:data};
    } catch (error) {
        console.error(error);
        return {status: "fail", message: error.toString()};
    }
};


export const Product_List_BY_Remarks_Service = async (req) => {
    try {
        const remark = req.params.Remark;
        const data = await findProducts({ remark });
        return {status:"success",data:data};
    } catch (error) {
        console.error(error);
        return {status: "fail", message: error.toString()};
    }
};


export const Product_List_BY_Brand_Service = async (req) => {
    try {
        const brandID = new ObjectId(req.params.BrandID);
        const data = await findProducts({ brandID });
        return {status:"success",data:data};
    } catch (error) {
        console.error(error);
        return {status: "fail", message: error.toString()};
    }
};


export const Product_List_BY_Slider_Service = async () => {
    try {
        return await slidersModel.find();
    } catch (error) {
        console.error(error);
        return {status: "fail", message: error.toString()};
    }
};


export const Product_Details_ID_Service = async (req) => {
    try {
        const productID = new ObjectId(req.params.ProductID);
        const data = await findProducts({ _id: productID });
        return {status:"success",data:data};
    } catch (error) {
        console.error(error);
        return {status: "fail", message: error.toString()};
    }
};

export const Product_List_BY_Keyword_Service = async (req) => {
    try {
        const keyword = String(req.params.keyword || "").trim();
        const regex = new RegExp(escapeRegex(keyword), "i");
        const searchQuery = {$or: [{ title: regex }, { shortDes: regex }]};
        const data = await findProducts(searchQuery);
        return {status:"success",data:data};
    } catch (error) {
        console.error(error);
        return {status: "fail", message: error.toString()};
    }
};


// Review services
export const Product_List_BY_Review_Service = async (req) => {
    try {
        const productID = new ObjectId(req.params.ProductID);

        const data = await ReviewModel.aggregate([
            {$match: { productID }},
            {$lookup: {from: "profiles", localField: "userID", foreignField: "userID", as: "profile"}},
            {$unwind: "$profile"},
            {$project: {des: 1, rating: 1, "profile.cus_name": 1}},
        ]);
        return {status:"success",data:data};
    } catch (error) {
        console.error(error);
        return {status: "fail", message: error.toString()};
    }
};


export const ProductsDetailsService = async (req) => {
    return Product_Details_ID_Service(req);
};
