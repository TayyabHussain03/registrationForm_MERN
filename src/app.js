const express = require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')
const Register = require('./models/users')
require('./db/connection')

const template_path = path.join(__dirname, "./templates/views")
const partials_path = path.join(__dirname, "./templates/partials")

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "hbs")
app.set("views", template_path)
hbs.registerPartials(partials_path)

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/register", (req, res) => {
    res.render("register")
})
app.post("/register", async (req, res) => {
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    try {

        if (password === confirmPassword) {
            const users = new Register({
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: password,
                confirmPassword: confirmPassword
            })

            const registerUsers = await users.save()
            res.status(201).render('index')
        }
        else {
            res.send("password are not matching")
        }
    } catch (err) {
        res.status(404).send(error)
    }
})

app.listen(port, () => {
    console.log(`Server running on port= ${port}`)
})

