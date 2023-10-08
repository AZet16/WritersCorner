import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        followers: {
            type: Array,
            default: [],
        },

        password: {
            type: String,
            required: true,
            min: 5,
        },

        picture_path: {
            type: String,
            default: "",
        },

        location: String,
        occupation: String,
        profileViews: Number,
        impressions: Number,
    }, { timestamps: true }); //auto dates for all of the information (created, etc)

const User = mongoose.model("User", UserSchema);
export default User;