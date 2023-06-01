const mongoose = require("mongoose");
const { Schema } = mongoose;

//User schema
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    streetName: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    mobile: {
      type: String
    },
    company: {
      type: String
    },
    profileImage: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

//Function to get a display name from the user,
userSchema.virtual("displayName").get(function () {
  return this.firstName + " " + this.lastName;
});

//Creating User model and exporting it
const User = mongoose.model("User", userSchema);

module.exports = User;