const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is not valid Status`,
      },
    },
  },
  { timestamps: true },
);

connectionSchema.index({ fromUserId: 1, toUserId: 1 });

const Connection = mongoose.model("Connection", connectionSchema);
module.exports = Connection;
