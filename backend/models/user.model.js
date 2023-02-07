const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  resetToken : String,
  expireToken:Date,
  password: { type: String, required: true, minlength: 5 },
  displayName: { type: String },
  profilePicture:
    {
        type:String
    },
    verified:Boolean,
    resetToken:String,expireToken:String
});

module.exports = User = mongoose.model("user", userSchema);