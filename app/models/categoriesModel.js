import mongoose from 'mongoose'

const DataSchema_Category = new mongoose.Schema(
    {
        categoryName: {type: String, required: true, index: true, unique: true},
        categoryImg: {type: String, required: true},
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const CategoryModel = mongoose.model('categories', DataSchema_Category)
export default CategoryModel;