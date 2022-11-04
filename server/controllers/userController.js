/**
 * Controller for the users collection.
 * Contains the CRUD functions that can be called on the users collection.
 */

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

/**
 * findUsers gets the entire collection of users.
 *
 * @param {*} req the object containing information about the HTTP request that raised the event
 * @param {*} res the object to send back to the desired HTTP response
 */
exports.findUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.send({ data: users });
});

/**
 * getMe gets the user data.
 *
 * @param {*} req the object containing information about the HTTP request that raised the event
 * @param {*} res the object to send back to the desired HTTP response
 */
exports.getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

/**
 * createUser creates a user and saves it into the users collection.
 *
 * @param {*} req the object containing information about the HTTP request that raised the event
 * @param {*} res the object to send back to the desired HTTP response
 */
exports.createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, gender, birthDate, nric, password } =
    req.body;

  // Check if all fields are defined
  if (
    !firstName ||
    !lastName ||
    !email ||
    !gender ||
    !birthDate ||
    !nric ||
    !password
  ) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Check if NRIC/FIN is in the correct format
  const nric_re = /^[0-9]{3}[A-Z]{1}$/;
  if (!nric_re.test(nric)) {
    res.status(400);
    throw new Error("Invalid NRIC/FIN");
  }

  // Check if E-mail is valid
  const email_re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email_re.test(email)) {
    res.status(400);
    throw new Error("Invalid E-mail");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    gender,
    birthDate,
    nric,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).send({
      data: user,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * updateUser updates a user in the collection by id.
 *
 * @param {*} req the object containing information about the HTTP request that raised the event
 * @param {*} res the object to send back to the desired HTTP response
 */
exports.updateUser = asyncHandler(async (req, res) => {
  if (Object.keys(req.body)[0] == "registeredEvents") {
    // referral email
    referral =
      req.body["registeredEvents"][0]["634e3415d68ee70244ecc53f"][
        "inviteEmail"
      ];

    // Check if E-mail is valid
    const email_re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email_re.test(referral)) {
      res.status(400);
      throw new Error("Invalid E-mail Format");
    }

    // check if the referral email exists
    const userExists = await User.findOne({ referral });
    if (userExists) {
      res.status(400);
      throw new Error(
        "There is no user registered with the email: " + referral
      );
    }
  }

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (user) {
    res.status(201).send({
      data: user,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User does not exist");
  }
});

/**
 * deleteUser deletes a user from the collection by id.
 *
 * @param {*} req the object containing information about the HTTP request that raised the event
 * @param {*} res the object to send back to the desired HTTP response
 */
exports.deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send({ data: true });
  } catch {
    res.status(404);
    throw new Error("User is not found");
  }
});

/**
 * loginUser authenticates a user
 *
 * @param {*} req the object containing information about the HTTP request that raised the event
 * @param {*} res the object to send back to the desired HTTP response
 */
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.send({
      data: user,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

/**
 * forgetPassword sends an email to the user containing a link to reset password
 */
exports.forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email required");
  }

  const token = crypto.randomBytes(20).toString("hex");
  const user = await User.findOneAndUpdate(
    { email: email },
    {
      $set: {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
    }
  );

  if (!user) {
    res.status(400);
    throw new Error("User with this email does not exist");
  } else {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });

    const mailOptions = {
      from: `${process.env.EMAIL_ADDRESS}`,
      to: `${user.email}`,
      subject: "Link To Reset Password",
      text:
        "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
        `http://localhost:3000/api/users/reset/${token}\n\n` +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n",
    };

    console.log("sending mail");

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error("there was an error: ", err);
      } else {
        console.log("here is the res: ", response);
        res.status(200).json("recovery email sent");
      }
    });
  }
});

exports.authenticateResetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    console.log("password reset link is invalid or has expired");
    res.status(400).send("password reset link is invalid or has expired");
  } else {
    console.log("password reset link authenticated");
    res.status(200).send({ data: user });
  }
});

exports.updatePassword = asyncHandler(async (req, res) => {
  const { userId, password, password2 } = req.body;

  if (!password || !password2) {
    res.status(400);
    throw new Error("Please fill in all fields");
  } else {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user with new password
    const updatedUser = await User.findByIdAndUpdate(userId, {
      password: hashedPassword,
    });

    if (!updatedUser) {
      res.status(400);
      throw new Error("User is not found in database");
    } else {
      res.status(200).send({ data: updatedUser });
    }
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
