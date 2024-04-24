const mongoose = require('mongoose');

const conn = async (req, res) => {
    try {
        await mongoose.connect("mongodb+srv://jubinthomas:jubinthomas@cluster0.guh44nh.mongodb.net/todo-list?retryWrites=true&w=majority&appName=Cluster0");
        console.log("connected");
    } catch (error) {
        res.status(400).json({ message: "not connected" });
    }
}

conn();
