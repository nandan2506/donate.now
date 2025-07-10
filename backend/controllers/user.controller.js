const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const nodemailer = require("nodemailer");
const { transporter } = require("../middlewares/email.config");

const allUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users.length) {
      return res.status(200).json({ message: "No users found", data: [] });
    }
    res.status(200).json({ message: "Users retrieved successfully", data: users });
  } catch (error) {
    console.log("error while fetching users", error);
    res.status(500).json("Error while fetching users");
  }
};

const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ message: "User already exists, please login." });
      } else {
        return res.status(403).json({ message: "User exists but not verified. Please verify your email." });
      }
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
      verificationCode: otp,
      otpExpiry,
      isVerified: false
    });

    

    await transporter.sendMail({
      from: `"DonateNow" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email - DonateNow",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>👋 Hello ${username},</h2>
          <p>Thank you for registering on <strong>DonateNow</strong>!</p>
          <p>Your OTP for verifying your email is:</p>
          <h1 style="letter-spacing: 5px; color: #01BFBD;">${otp}</h1>
          <p>This OTP will expire in <strong>5 minutes</strong>.</p>
        </div>
      `
    });

    return res.status(201).json({
      message: "User registered successfully. Please verify your email.",
      userId: newUser._id,
      email: newUser.email
    });

  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Server error during registration" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) return res.status(400).json({ msg: 'OTP not received' });

    const user = await userModel.findOne({ verificationCode: otp });

    if (!user) return res.status(404).json({ msg: "Invalid OTP" });
    if (user.otpExpiry < Date.now()) return res.status(400).json({ msg: "OTP has expired" });

    user.isVerified = true;
    user.verificationCode = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return res.status(200).json({ msg: "Email verified successfully" });

  } catch (error) {
    console.log("Error while verifying email:", error);
    return res.status(500).json({ msg: "Internal server error during verification" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found. Please register." });
    if (!user.isVerified) return res.status(403).json({ message: "Please verify your email first." });

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) return res.status(401).json({ message: "Incorrect password." });

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    return res.status(200).json({ message: "User logged in successfully", token });

  } catch (error) {
    console.log("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const userProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });
    return res.status(200).json({ msg: "User found", userProfile: user });
  } catch (error) {
    console.log("Error while fetching profile:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const { username, email } = req.body;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const emailExist = await userModel.findOne({ email });

    if (emailExist && emailExist._id.toString() !== userId && emailExist.isVerified) {
      return res.status(400).json({ msg: "This email is already used by another user." });
    }

    user.username = username;
    user.email = email;
    await user.save();

    await transporter.sendMail({
      from: `"DonateNow" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Profile Updated - DonateNow",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>${username}, Your profile was updated successfully</h2>
          <p>If this wasn't you, please contact our support immediately.</p>
             <br/>
             <p>Thanks,<br/>CrowdFund Team</p>
        </div>
      `
    });

    return res.status(200).json({ msg: "Profile updated successfully", updatedProfile: user });
  } catch (error) {
    console.log("Error while updating profile:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_PASS, { expiresIn: "15m" });

    

    const resetLink = `http://localhost:5173/setNewPassword?token=${resetToken}`;

    await transporter.sendMail({
      from: `"DonateNow" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: `
        <h2>Reset Password</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link expires in 15 minutes.</p>
      `
    });

    return res.status(200).json({ msg: "Reset link sent to your email" });

  } catch (error) {
    console.log("Error while sending reset link:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const checkPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) return res.status(404).json({ msg: "User not found" });

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) return res.status(401).json({ msg: "Incorrect password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_PASS, { expiresIn: "5m" });
    return res.status(200).json({ msg: "Password verified", token });

  } catch (error) {
    console.log("Error while verifying password:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const setNewPassword = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Token required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_PASS);
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.findByIdAndUpdate(decoded.userId, { password: hashedPassword });

    return res.status(200).json({ msg: "Password changed successfully" });

  } catch (error) {
    console.log("Error while setting new password:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expired" });
    }
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  userRegister,
  userLogin,
  allUsers,
  userProfile,
  updateProfile,
  verifyOtp,
  forgetPassword,
  checkPassword,
  setNewPassword,
};
