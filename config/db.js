// Using Node.js `require()`
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect(`${process.env.MONGODB_URI}`)
.then(() => console.log("Db Connected"))
.catch((err)=>{
    console.log("error "+ err)
})

module.exports = mongoose;