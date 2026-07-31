import mongoose from 'mongoose';

const DataSchema_users = new mongoose.Schema(
    {
        email:{type:String,unique:true,required:true,lowercase:true},
        otp:{type:String,required:true}
    }
    ,
    {
        timestamps: true,
        versionKey:false,
    }

)


const UserModel =mongoose.model('users',DataSchema_users);
export default UserModel