const User = require("../model/user.model")

// handle Signup
const handleSignup = async (req, res) => {
  const { fullname, email, password, age, gender, skills, imageUrl, about } = req.body;
  try {
    const exitsUser = await User.findOne({ email });
    if (exitsUser) {
      throw new Error("User Already Exits");
    }
    const user = await User.create({
      fullname,
      email,
      password,
      age,
      gender,
      skills,
      imageUrl,
      about,
    });

    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.status(201).json({
      suceess: true,
      message: `${user.fullname} Created Successfully.`,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      suceess: false,
      message: error.message,
    });
  }
};

// handle Login
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if(!email || !password){
       throw new Error("Email and Password is Required for login");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User doesn't found");
    }
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid Credential");
    }

    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    
    res.status(200).json({
      suceess: true,
      message: `${user.fullname} login Successfully.`,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      suceess: false,
      message: error.message,
    });
  }
};

// handle logout
const handleLogout = async (req, res) => {
  req.user = null;
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).json({
    suceess: true,
    message: "logout Successfully.",
  });
};


module.exports = {
  handleSignup,
  handleLogin,
  handleLogout,
};