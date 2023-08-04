const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id : { type : Number },
  user_name: { type: String, required: true },
  qrc: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


mongoose.model("User", userSchema);
