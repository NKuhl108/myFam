const mongoose = require('mongoose')

//now use this environment variable. set in my local .env file as well as on heroku
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})