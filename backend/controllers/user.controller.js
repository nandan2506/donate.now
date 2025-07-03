const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const nodemailer = require("nodemailer");




const allUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users.length) {
      return res.status(200).json({ message: "No users found", data: [] });
    }

    res
      .status(200)
      .json({ message: "Users retrieved successfully", data: users });
  } catch (error) {
    console.log("error while fetching users", error);
    res.status(404).json("error while fetching users");
  }
};


const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "user already exist, please login" });
    }

    const hash = bcrypt.hashSync(password, 10);
    // const token = jwt.sign(
    //   process.env.JWT_SECRET,
    //   // { expiresIn: "1h" } // expires in 1 hour
    // );

    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.ethereal.email',
    //   port: 587,
    //   auth: {
    //     EMAIL_USER: 'nella25@ethereal.email',
    //     EMAIL_PASS: '3xHFk285t9j9EvR5VX'
    //   }
    // });

    // const mailOptions = {
    //   from: '"DonateNow" <yourapp@example.com>',
    //   to: req.body.email,
    //   subject: "Verify your email",
    //   html: `
    // <h1>Email Verification</h1>
    // <p>Click the link below to verify your email:</p>
    // <a href="http://localhost:8000/user/verifyEmail?token=${token}">Verify Email</a>`,
    // };

    // await transporter.sendMail(mailOptions);

    await userModel.create({ username, email, password: hash });
    res.status(201).json({ message: "user register successfully" });
  } catch (error) {
    res.status(500).json({ message: "error while registration" });
    console.log("error while registration", error);
  }
};


const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await userModel.findOne({ email: email });
    if (userExist) {
      const isPasswordCorrect = bcrypt.compareSync(
        password,
        userExist.password
      );

      if (isPasswordCorrect) {
        const tkn = jwt.sign(
          { userId: userExist._id, email: userExist.email },
          process.env.JWT_SECRET,
          { expiresIn: "1 day" }
        );
        return res
          .status(200)
          .json({ message: "user login successfully", tkn, });
      }
    }

    return res
      .status(404)
      .json({ message: "user not found, please register " });
  } catch (error) {
    res.status(404).json({ message: "error while login" });
    console.log("error while login", error);
  }
};


const userProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const userProfile = await userModel.findOne({ _id: userId });
    if (userProfile) {
      return res.status(202).json({ msg: "user found", userProfile });
    }
    return res.status(404).json({ msg: "user not found" });
  } catch (error) {
    console.log("error while finding user profile", error);
    return res.status(500).json({ msg: "something went wrong" });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const { username, email } = req.body;
    const userExist = await userModel.findById(userId);
    if (userExist) {
      const emailExist = await userModel.findOne({ email });
      if (emailExist) {
        return res.status(400).json({ msg: "this email already registered" });
      }
      const updatedProfile = await userModel.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true }
      );
      return res
        .status(200)
        .json({ msg: "user updated successfully", updatedProfile });
    }
  } catch (error) {
    console.log("error while updating user", error);
    return res.status(500).json({ msg: "something went wrong" });
  }
};



const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body
    const user = await userModel.findOne({email})
    if (user) {
      // send mail to user with password change link
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.email.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.MAIL ,
          pass: process.env.PASS,
        },
      })
      const info = await transporter.sendMail({
        from: '"DonateNow"', // sender address
        to: `${user.email}`, // list of receivers
        subject: "reset passowrd", // Subject line
        text: "click the link to reset password", // plain text body
        html: "<b>https://localhost:8000/user/checkPassword</b>", // html body
      })
      return res.status(200).json({ msg: "link sent to your registered email" })
    }
    return res.status(404).json({ msg: "user not found" })
  } catch (error) {
    console.log("error while changing password", error)
    return res.status(500).json({ msg: "something went wrong" })
  }
}


const checkPassword = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (isPasswordCorrect) {
        const tkn = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_PASS, { expiresIn: "5m" })
        return res.status(200).json({ msg: "password verified, valid for only 5 minuts", token: tkn })
      }
      return res.status(404).json({ msg: "incorrect password" })
    }
    return res.status(404).json({ msg: "user not found" })
  } catch (error) {
    console.log("error while changing password", error)
    return res.status(500).json({ msg: "something went wrong" })
  }
}


const setNewPassword = async (req, res) => {
  try {
    const token  = req.headers.passToken.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Token required" });
    }

    // Verify token and extract userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET_PASS);
    const { password, verifyPassword } = req.body

    if (password === verifyPassword) {
      const hashedPass = await bcrypt.hash(password, 10)
      await userModel.findByIdAndUpdate(decoded.userId, { password: hashedPass })
      return res.status(200).json({ msg: "password changed succesfully" })
    }
    return res.status(400).json({ msg: "both password did not match" })

  } catch (error) {
    console.log("error while setting new password", error)
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expired" });
    }
    return res.status(500).json({ msg: "something went wrong" })
  }
}



module.exports = {
  userRegister,
  userLogin,
  allUsers,
  userProfile,
  updateProfile,
  // verifyEmail,
  forgetPassword,
  checkPassword,
  setNewPassword,
};
