import {Category_List_Service} from "../service/ProductServices.js";

export const CategoryList = async (req, res) => {
    try {
        const result = await Category_List_Service();
        return res.status(200).json({
            status: "success",
            message: "Category list retrieved successfully",
            data: result
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            error: error.message
        });
    }
};