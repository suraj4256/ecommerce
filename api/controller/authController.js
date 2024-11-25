const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = "suraj123";
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { error, info } = require("console");

// nbjs fntw iabw jdxb

const sendVerificationMail = (verificationToken, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "surajdey2k1@gmail.com",
      pass: "nbjsfntwiabwjdxb",
    },
  });

  const mailOptions = {
    from: "surajdey2k1@gmail.com",
    to: email,
    subject: "Verify Its You",
    text: `Please click on the link to verify yourself : http://192.168.29.164:5000/api/auth/verify/${verificationToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};

const registerUser = async (req, res) => {
  let success = false;
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      errors: [{ success, msg: "User already exists with this email" }],
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = crypto.randomBytes(20).toString("hex");

    const newUser = User.create({
      name: name,
      email: email,
      password: hashedPassword,
      verificationToken: verificationToken,
    });

    sendVerificationMail(verificationToken, email);
    const user = User.findOne({ email });
    if (user.verified) {
      console.log(user.verified);
      const user = await User.findOne({ email });
      success = true;
      console.log(user?.verified);
      if (user.verified) {
        const data = {
          user: {
            id: newUser.id,
          },
        };

        const token = jwt.sign(data, secret);
        res.json({
          success: success,
          token: token,
        });
      }
    }
  }
};

const loginUser = async (req, res) => {
  let success = false;
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "User doesn't exist",
    });
  }
  if (!user.verified) {
    return res.status(401).json({
      message: "User not verified, check your email to verify",
    });
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }
  success = true;
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, secret);
  res.json({
    data: success,
    token: token,
  });
};

const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid Verification token" });
    }
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    return res.status(200).json({ message: "User Verified" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addAddress = async (req, res) => {
  try {
    const [address, userId] = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.addresses.push(address);

    await user.save();

    return res
      .status(200)
      .json({
        success: true,
        message: "Addresses saved successfully",
        data: user,
      });
  } catch (error) {
    console.error("Error adding address:", error);

    // Respond with an error message
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const fetchAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: "false", message: "User Not Found" });
    }
    const alladresses = user.addresses;
    res.status(200).json({success:true, message:"Addresses fetched succesfully", data: alladresses})
  } catch (error) {
    console.error("Error getting address:", error);
    // Respond with an error message
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  addAddress,
  fetchAddress
};
