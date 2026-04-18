const User = require("../model/user.model");

// handle showProfile
const handleShowProfile = async (req, res) => {
  const user = req.user;
  res.json({
    success: true,
    data: user,
  });
};

// handle profileUpdate
const handleProfileUpdate = async (req, res) => {
  const user = req.user;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "fullname",
      "password",
      "about",
      "imageUrl",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((item) =>
      ALLOWED_UPDATES.includes(item),
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data.skills && Array.isArray(data.skills)) {
      if (data.skills.length > 10) {
        throw new Error("Skills cannot be more than 10");
      }
    }

    const updatedUser = await User.findByIdAndUpdate({ _id: user._id }, data, {
      runValidators: true,
      returnDocument: "after",
    });

    res.status(200).json({
      success: true,
      data:updatedUser,
      message: `${updatedUser.fullname} Profile Updated Successfully.`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  handleShowProfile,
  handleProfileUpdate,
};
