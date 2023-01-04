const mongoose = require("mongoose");
const activeUserSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ActiveUser", activeUserSchema);
