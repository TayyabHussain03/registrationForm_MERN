const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/registerUsers').then(() => {
    console.log("connection successfull")
}).catch((error) => {
    console.log(`error is===>${error}`)
})