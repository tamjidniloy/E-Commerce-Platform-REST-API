import nodemailer from "nodemailer";
import {EMAIL_USER, EMAIL_PASS, EMAIL_FROM} from "../config/config.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

const SendEmail = async (emailTo, emailText, emailSubject) => {
    const mailOptions = {
        from: EMAIL_FROM,
        to: emailTo,
        subject: emailSubject,
        text: emailText,
    };

    return transporter.sendMail(mailOptions);
};

export default SendEmail;