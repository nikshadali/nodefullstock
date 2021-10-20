const mongoose = require('mongoose')
const dbConnection = process.env.MONGDB_URl;

const Name = process.env.Name

mongoose.connect(dbConnection,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex:true,
    // useFindAndModify:false
}).then(() => {
    console.log('data connect successfuly')
}).catch((err) => {
    console.log('err =>', err)
})