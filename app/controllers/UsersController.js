import SendEmail from "../utility/emailUtility.js";
import {TokenEncode} from "../utility/tokenUtility.js";

export const Login=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:"I am stupid"});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}



export const Verification=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const CreateUserProfile=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}



export const UpdateUserProfile=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}



export const ReadUserProfile=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}




