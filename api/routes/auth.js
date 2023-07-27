const router = require("express").Router();
const nodemailer = require("nodemailer");
const User = require("../models/users");
const UserOTPVerification = require("../models/userOTPVerification");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const dotenv = require("dotenv");

dotenv.config();

//Register
router.post("/register", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      verified: false,
    });
    const user = await newUser
      .save()
      .then((result) => {
        sendOTPVerificationEmail(result, res);
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "An Error Occurred while saving your account",
        });
      });
  } catch (err) {
    console.log(err);
  }
});

// nodemailer
let transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  logger: true,
  secureConnection: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

// send otp verification email
const sendOTPVerificationEmail = async ({ _id, email }, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    // mail options
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Enter ${otp} to verify your email address</p>`,
    };
    // hash the otp
    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    const newOTPVerification = await new UserOTPVerification({
      userId: _id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    // save the otp record
    await newOTPVerification.save();
    await transporter.sendMail(mailOptions);
    res.json({
      status: "PENDING",
      message: "Verification OTP Email sent",
      data: {
        userId: _id,
        email,
      },
    });
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};

// verify otp email
router.post("/verifyOTP", async (req, res) => {
  try {
    let { userId, otp } = req.body;
    if (!userId || !otp) {
      throw Error("OTP Details are not found");
    } else {
      const UserOTPVerificationRecords = await UserOTPVerification.find({
        userId,
      });
      if (UserOTPVerificationRecords.length <= 0) {
        // no records found
        throw new Error(
          "Account record does not found or has been verified already. Please signup or login"
        );
      } else {
        // user otp record exist
        const { expiresAt } = UserOTPVerificationRecords[0];
        const hashedOTP = UserOTPVerificationRecords[0].otp;
        if (expiresAt < Date.now()) {
          // user otp has been expired
          await UserOTPVerification.deleteMany({ userId });
          throw new Error("Code has expired, please request again ");
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);
          if (!validOTP) {
            // OTP is wrong
            throw new Error("Invalid code. Please check your inbox");
          } else {
            // success
            await User.updateOne({ _id: userId }, { verified: true });
            await UserOTPVerification.deleteMany({ userId });
            res.json({
              status: "VERIFIED",
              message: "User Email verified successfully",
            });
          }
        }
      }
    }
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const username = await req.body.username;
    const password = await req.body.password;
    User.findOne({ username: username }, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          bcrypt.compare(password, foundUser.password, function (err, result) {
            if (result == true) {
              console.log("User logged in successfully!");
              res.json(foundUser);
            }
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
