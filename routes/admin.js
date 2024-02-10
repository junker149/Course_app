const { Router } = require("express");
const adminMiddleware = require("../Middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    try {
        const username = req.headers.username;
        const password = req.headers.password;

        await Admin.create({
            username: username,
            password: password
        })
        res.status(200).json({
            msg: "Admin created succesfully"
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

        const adminExist = await Admin.findOne({
            username: username,
            password: password
        })

        if (adminExist) {
            const token = jwt.sign({username}, JWT_SECRET)
            res.status(200).json({
                token
            })
        }
        else {
            res.status(403).json({
                msg: "Admin doesn't exist!"
            })
        }
    }
    catch (err) {
        res.status(500).send("Internal Server Error!")
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    try {

        const title = req.body.title;
        const description = req.body.description;
        const imagelink = req.body.imagelink;
        const price = req.body.price;

        new_course = await Course.create({
            title: title,
            description: description,
            imagelink: imagelink,
            price: price
        })
        res.status(200).json({
            msg: 'Course created successfully!',
            courseid: new_course._id
        })
    }
    catch (err) {
        res.status(500).send("Internal Server Error!");
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try{
        const all_courses = await Course.find({});
        res.status(200).json({
            courses: all_courses
        })
    }
    catch (err) {
        res.status(500).send("Internal Server Error!");
    }
});

module.exports = router;