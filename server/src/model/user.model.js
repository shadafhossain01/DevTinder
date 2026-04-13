const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: [true, "fullName is Required"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "Email is Required"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    about: {
      type: String,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is Required"],
    },
    age: {
      type: Number,
      required: [true, "Age is Required"],
      min: [18, "Age is less then 18"],
    },
    gender: {
      type: String,
      required: [true, "Gender is Required"],
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender Data is not Valid");
        }
      },
    },
    skills: {
      type: [String],
    },
    imageUrl: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return 
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.validatePassword=async function(userInputPassword){
    const password=this.password
    const isValidPassword= await bcrypt.compare(userInputPassword,password)
    return isValidPassword
}

userSchema.methods.getJWT=async function(){
    const user=this
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRESIN,
    });
    return token
}

const User=mongoose.model("User", userSchema)
module.exports=User