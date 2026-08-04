import ProfileModel from "../models/profilesModel.js";
import {TokenEncode} from "../utility/tokenUtility.js";
import UserModel from "../models/usersModel.js";
import SendEmail from "../utility/emailUtility.js";

export const UserLoginService = async (req) => {
    try {
        let emailTo= req.body.email;
        let code = Math.floor(100000+Math.random()*900000);
        let EmailSubject = `Email Verification`;
        let EmailText = `Your Varification Code is : ${code}`;

        await SendEmail(emailTo, EmailSubject, EmailText);
        await UserModel.updateOne({email:emailTo},{$set:{otp:code}},{upsert:true});
        return {status:"success",message:"6 digit code send successfully"};

    }catch(error) {
        console.log(error)
        return {status:"error", message:error.toString()};
    }
}



export const UserVerificationService = async (req) => {
    try {
        const email = req.body.email;
        const verificationOtp = Number(req.body.otp);
        if (!email || !verificationOtp) {
            return {status: "error", message: "Email and OTP are required"};
        }
        const user = await UserModel.findOne({email: email, otp: verificationOtp});
        if (!user) {
            return {status: "error", message: "Invalid email or OTP"};
        }
        let userEmail = user.email;
        let userID = user._id.toString();
        const token = TokenEncode(userEmail, userID);
        //await UserModel.updateOne({ _id: userID}, { $set: { otp: 0 } });
        return {
            status: "success",
            message: "OTP verified successfully",
            token: token
        };
    } catch (error) {
        console.log("Verification Error:", error);
        return {status: "error", message: error.message};
    }
}



export const UserCreatProfileService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let user_email = req.body.email;
        let reqBody = req.body;
        reqBody.userID = user_id;
        let data = await ProfileModel.updateOne({userID:user_id},{$set:reqBody}, {upsert:true});
        return {status:"success",message:"Profile saved successfully", data:data};
    }catch(error) {
        console.log(error)
        return {status:"error", message:error.toString()};
    }
}



export const UserReadProfileService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let data = await ProfileModel.findOne({userID:user_id});
        return {status:"success",message:"Profile read successfully", data:data};
    }catch(error) {
        console.log(error)
        return {status:"error", message:error.toString()};
    }
}


export const UserUpdateProfileService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let user_email = req.body.email;
        let reqBody = req.body;
        reqBody.userID = user_id;
        let data = await ProfileModel.updateOne({userID:user_id},{$set:reqBody}, {upsert:true});
        return {status:"success",message:"Profile Updated successfully", data:data};
    }catch(error) {
        console.log(error)
        return {status:"error", message:error.toString()};
    }
}


