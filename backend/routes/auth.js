const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Signup

router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashPassword = bcrypt.hashSync(password, 10);
        const user = new User({ email, username, password: hashPassword });
        await user.save();
        res.status(200).json({ user: { email, username } }); // Return only necessary information
    } catch (error) {
        res.status(400).json({ message: "User already exists or invalid input" });
    }
});


// Sign In
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "Please sign up first" }); // Return to exit the function
        }
        
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password is incorrect" }); // Return to exit the function
        }
       const {password,...others} = user._doc;   // If both email and password are correct
        res.status(200).json({ message: "Login successful",others });
    } catch (error) {
        res.status(400).json({ message: "An error occurred" });
    }
});

module.exports = router;
