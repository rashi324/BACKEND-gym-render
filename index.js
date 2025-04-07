import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

config({ path: "./config.env" });

const app = express();

// ✅ Load middleware before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Allow CORS for your Vercel frontend
const allowedOrigins = [process.env.FRONTEND_URL];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// ✅ Route defined after all middleware
app.post("/send/mail", async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }

    await sendEmail({
      email: "rashiidrashi5@gmail.com",
      subject: "GYM WEBSITE CONTACT",
      message,
      userEmail: email,
    });

    res.status(200).json({
      success: true,
      message: "Message Sent Successfully.",
    });
  } catch (error) {
    console.error("Error Sending Email:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
