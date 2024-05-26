

import userModel from "../model/crud.schema.js"


export async function create(req, res) {
    try {
        let { userId, description} = req.body;
        if (!(userId && description)) {
            return res.status(400).json({
                msg: "Input fields cannot be empty!"
            })
        }
        
       let usid = await userModel.findOne({userId})
        if(usid){
            return res.status(400).json({
                msg: "UserId already exists"
            })
        }
       await userModel.create({
            userId,
           description
        });
        return res.status(201).json({
            msg: "Description Added Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error occured!"
        })
    }
}


export async  function read(req,res) {
    try {
        let result = await userModel.find();
        res.json(result)
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error occured!"
        })
    }
}

export async function remove(req, res) {
    try {
        const userId = req.params.userId;
        const deleteduser = await userModel.findOneAndDelete({ userId: userId });
        if (!deleteduser) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}


export async function update(req, res) {
    try {
        const userId = req.params.userId;
        const {description } = req.body;

        // Check if the user exists
        const existingUser = await userModel.findOne({ userId: userId });
        if (!existingUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        existingUser.description = description;

        // Save the updated user
        await existingUser.save();

        return res.status(200).json({ msg: "User updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}