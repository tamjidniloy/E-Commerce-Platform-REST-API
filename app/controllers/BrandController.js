import { Brand_List_Service } from "../service/ProductServices.js";

export const BrandList = async (req, res) => {
    try {
        const result = await Brand_List_Service();

        return res.status(200).json({
            status: "success",
            message: "Brand list retrieved successfully",
            data: result
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            error: error.message
        });
    }
};