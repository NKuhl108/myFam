const mongoose = require('mongoose')

//mongoose.connect('mongodb://127.0.0.1:27017/my-fam-db', {

mongoose.connect('mongodb+srv://myfam:T!hisismydatabasepassword789@cluster0.qphw2.mongodb.net/my-fam-db2', {
        useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})