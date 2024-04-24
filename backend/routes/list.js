const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

router.post("/addTask", async (req, res) => {
    try {
        const { title, body, email } = req.body;
        
        if (!title || !body || !email) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            const list = new List({ title, body, user: existingUser._id });
            await list.save();
            
            await User.findOneAndUpdate({ email }, { $push: { user: list._id } });

            res.status(200).json({ list });
        } else {
            res.status(400).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});





router.put("/updateTask/:id", async (req, res) => {
    try {
        const { title, body } = req.body;
        
        // Update the list item
        await List.findByIdAndUpdate(req.params.id, { title, body });

        res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/completeTask/:id", async (req, res) => {
    try {
        // Update the completion status of the task
        await List.findByIdAndUpdate(req.params.id, { completionStatus: "Task completed" });

        res.status(200).json({ message: "Task completed successfully" });
    } catch (error) {
        console.error("Error completing task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        // Find the task by ID and delete it
        const deletedTask = await List.findByIdAndDelete(req.params.id);
        
        if (!deletedTask) {
            // If the task doesn't exist, return an error
            return res.status(404).json({ message: "Task not found" });
        }

        // Return a success message
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/getList/:userId", async (req, res) => {
    try {
        const lists = await List.find({ user: req.params.userId });

        if (!lists || lists.length === 0) {
            return res.status(404).json({ message: "No lists found for this user" });
        }

        res.status(200).json({ lists });
    } catch (error) {
        console.error("Error retrieving lists:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});




module.exports = router;