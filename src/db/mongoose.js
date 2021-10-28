const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
//mongoose.connect('mongodb+srv://myfam:T!hisismydatabasepassword789@cluster0.qphw2.mongodb.net/my-fam-db', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})