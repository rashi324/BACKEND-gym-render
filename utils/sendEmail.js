import nodeMailer from "nodemailer";

export const sendEmail = async (options) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST, // Example: "smtp.gmail.com"
      port: process.env.SMTP_PORT, // Ensure it's defined correctly (not SMTP_POST)
      service: process.env.SMTP_SERVICE, // If using Gmail, set it to "gmail"
      auth: {
        user: process.env.SMTP_MAIL, // Your sender email
        pass: process.env.SMTP_PASSWORD, // Your app password
      },
    });

    // ✅ Corrected variable name (was "mailOpion")
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: options.email,
      subject: options.subject,
      text: `${options.message} \n\nEmail of User Who Sent The Message: ${options.userEmail}`,
    };

    // ✅ Corrected variable name in sendMail
    await transporter.sendMail(mailOptions);

    console.log("Email Sent Successfully");
  } catch (error) {
    console.error("Error Sending Email:", error);
    throw error;
  }
};
