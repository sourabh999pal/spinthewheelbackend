const mongoose = require('mongoose')
const conn = require('../config/db')
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
   
    name:String,
    email:String,
    prize:String,
    mobile:String,
    resultPrizeVal:Number,
    date:String,
    tokens:[
        {
            token:{
                type:String,
                require:true
            }
        }
    ],
    
},{
    timestamps:true
})

var spinSchema = new mongoose.Schema({
    totalSpin:String,
    totalWinner:String,
},{
    timestamps:true
})

var spinAdmin = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
},{
    timestamps:true
})


userSchema.methods.getAuthToken = async function(data){
    let params = {
        id:this._id,
        email:this.email,
        mobile:this.mobile
    }
    var tokenValue = jwt.sign(params, process.env.SECRETKEY,{expiresIn:'300000s'});
    this.tokens = this.tokens.concat({token:tokenValue})
    await this.save();
    return tokenValue;
}

let users = conn.model('users',userSchema)

let spin = conn.model('spindata',spinSchema)
let admin = conn.model('admin',spinAdmin)
module.exports = {users, spin, admin};