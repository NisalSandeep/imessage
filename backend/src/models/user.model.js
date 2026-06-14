import mongooes from "mongoose";

const userschema = new mongooes.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }, // createdAt and updatedAt
);

const User = mongooes.model("User", userschema);

export default User;
