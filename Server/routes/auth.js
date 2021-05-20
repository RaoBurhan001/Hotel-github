const express = require("express");
const User  =  require("../models/user");
const router = express.Router();

// controllers
const { register, login } = require( "../controllers/auth");

router.post("/register", register);
router.post("/login", login);

router.get("/log", (req,res)=>{
    res.send("Hello  ")
});

router.post("/social", (req, res) => {
    console.log("REsponse ", req.body)
    // console.log("REsponse ", res)

    var newUser = new User({
        username: req.body.username,
        profile_picture: req.body.profile_picture,
        name: req.body.name,
        social_signin: req.body.social_signin
    });
    console.log(newUser)

    User.find({ "social.id": req.body.social_signin.id })
        .then(user => {
            let data;
            if (_.isEmpty(user)){
                newUser.save()
                    .then(user => {
                        data = {
                            username: user[0].username,
                            social_signin: user[0].social_signin,
                            name: user[0].name
                        }
                        res.json({code: 201, message: "user created using " + req.body.social_signin.name + " account", data: data})
                        console.log("user created using " + req.body.social_signin.name + " account")
                    })
                    .catch(err => res.json(err))
            } else {
                data = {
                    username: user[0].username,
                    social_signin: user[0].social_signin,
                    name: user[0].name
                }
                res.json({code: 208, message: "user already exists while signing in with "  + req.body.social_signin.name + " account", data: data})
                console.log("user already exists while signing in with " + req.body.social_signin.name + " account")
            }
        })
        .catch(err => res.json(err))
})

module.exports = router;
