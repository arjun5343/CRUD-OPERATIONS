import mongoose from "mongoose";


const schema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
  description: {
        type: String,
        required: true,
        unique: false
    }
});

export default mongoose.model.User || mongoose.model("Users", schema);