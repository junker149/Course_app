const { Router } = require("express");
const router = Router();
const userMiddleware = require("../Middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    try {
        const username = req.headers.username;
        const password = req.headers.password;

        await User.create({
            username: username,
            password: password
        })
        res.status(200).json({
            msg: "User created succesfully"
        })
    }
    catch (err) {
        res.status(500).send("Internal Server Error!");
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    try {
        const username = req.headers.username;
        const password = req.headers.password;

        const userExist = await User.findOne({
            username: username,
            password: password
        })

        if (userExist) {
            const token = jwt.sign({ username: username }, JWT_SECRET)
            res.status(200).json({
                token
            })
        }
        else {
            res.status(403).json({
                msg: "User doesn't exist!"
            })
        }
    }
    catch (err) {
        res.status(500).send("Internal Server Error!")
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try {
        const all_courses = await Course.find({});
        res.status(200).json({
            courses: all_courses
        })
    }
    catch (err) {
        res.status(500).send("Internal Server Error!");
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    try {
        const courseId = req.params.id;
        const username = req.headers.username;

        await User.updateOne(
            {username: username},
            {"$push": {purchasedCourses: courseId}}
        )
        res.status(200).json({
            msg: "Course Purchased Successfully!"
        })
    }
    catch (err) {
        res.status(500).send("Internal Server Error!")
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try{
        const username = req.headers.username;

        const user = await User.findOne({username: username})

        const purchased = await Course.find({
            _id: {"$in": user.purchasedCourses}
        })

        res.status(200).json({
            courses: purchased
        });
    }
    catch (err) {
        res.status(500).send("Internal Server Error!");
    }
});

module.exports = router