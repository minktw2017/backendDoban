import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 5
    },
    picturePath: {
        type: String,
        require: true,
        default: ""
    },
    friends: {
        type: Array,
        default: []
    },
    localcation: String,
    occuupation: String,
    viewedProfile: Number,
    impressionsß: Number
  },
	{
		timestamps: true
	}
);

const User = mongoose.model("User", UserSchema);
export default User;