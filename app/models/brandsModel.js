import mongoose from 'mongoose'

const DataSchema_Brand = new mongoose.Schema(
    {
        brandName: {type: String, required: true, index: true, unique: true},
        brandImg: {type: String, required: true},
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const BrandModel = mongoose.model('brand', DataSchema_Brand)
export default BrandModel