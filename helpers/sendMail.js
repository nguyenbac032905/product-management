const nodemailer = require("nodemailer");

module.exports.sendMail = (email,subject,html) => {
    //kết nối với email của mình
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASS,
        },
    });
    //cấu hình email
    const mailOptions = {
        from: "akai2932005@gmail.com",
        to: email,
        subject: subject,
        html: html,
    };
    //gửi mail
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Error:", error);
        } else {
            console.log("Email sent:", info.response);
            // do something useful
        }
    });
}