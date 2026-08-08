

export const CreateInvoice=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const PaymentSuccess=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const PaymentCancel=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const PaymentFail=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const PaymentIPN=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const ReadInvoiceList=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const ReadInvoiceDetails=async(req,res)=>{
    try {
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}