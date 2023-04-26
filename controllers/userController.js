const Users = require('../models/users');

let today = new Date();
let yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

let formattedToday = dd + '-' + mm + '-' + yyyy;

const userAdd = async (req, resp) => {
    let { name, email, mobile, prize, resultPrizeVal } = req.body;
    console.log( name, email, mobile, prize, resultPrizeVal )
    if (!email || !name || !mobile) {
        resp.status(400).json({ message: 'Error! please enter email, name , mobile', status: 400 });
    } else {
        let user = await Users.users.findOne({ email: req.body.email });
        if (user) {
            resp.status(403).json({ message: 'Error! Email is already in use.', status: 403 });

        } else {
            let data = new Users.users({
                name,
                email,
                mobile,
                prize,
                resultPrizeVal,
                date: `${formattedToday}`,
            });
            let response = await data.save();
            resp.status(200).json({ message: 'Register Succesfully ', status: 200, data: response });

        }
    }
}

const userCheck = async (req, resp) => {
    let { name, email} = req.body;
    // console.log( name, email, mobile )
    if (!email || !name) {
        resp.status(400).json({ message: 'Error! please enter email, name , mobile', status: 400 });
    } else {
        let user = await Users.users.findOne({ email: req.body.email });
        if (user) {
            resp.status(403).json({ message: 'Error! Email is already in use.', status: 403 });

        } else {
            resp.status(200).json({ message: 'Register Succesfully ', status: 200});
        }
    }
}

const userList = async (req, res) => {

    let data = await Users.users.find({ resultPrizeVal: 1 });
    // let data = await Users.users.find();
    if (!data) {
        res.status(400).json({ "status": "400", "message": "data not found" });
    }
    else {
        res.status(200).json({ "status": "200", "message": data });
    }

}

const spindata = async (req, res) => {
    let { totalSpin, totalWinner } = req.body;
    console.log(totalSpin, totalWinner);
    if (!totalSpin || !totalWinner) {
        res.status(400).json({ message: 'Error! please enter totalSpin, totalWinner', status: 400 });
    }
    else {
        var responseType = {
            message: 'ok'
        }
        let data = await Users.spin.findOneAndUpdate({ totalSpin: totalSpin, totalWinner: totalWinner });
        let response = await data.save();
        // let totalsp =data[0].totalSpin; 
        // let totalwn = data[0].totalWinner;

        // let response = await data.save();
        res.status(200).json({ "status": "200", "message": "ok", "response": response });
    }
}

const spindatalist = async (req, res) => {
    let data = await Users.spin.find();

    let thomsonwinCount = (await Users.users.find({ date: formattedToday, prize: 'You won Thomson goodies !' })).length;
    let kodakwinCount = (await Users.users.find({ date: formattedToday, prize: 'You won Kodak goodies !' })).length;
    let blauwinCount = (await Users.users.find({ date: formattedToday, prize: 'You won Blaupunkt goodies !' })).length;

    // let thomsonwinCount = 50;
    // let kodakwinCount = 25;
    // let blauwinCount = 25;


    if (!data) {
        res.status(400).json({ "status": "400", "message": "data not found" });
    }
    else {
        res.status(200).json({ "status": "200", "message": data, thomsonwinCount,kodakwinCount, blauwinCount  });
    }
}

const spinadmin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(301).json({ message: 'Error! please enter email and password' });
    }
    let user = await Users.admin.findOne({ email: req.body.email });
    var responseType = {
        message: 'ok'
    }
    if (user) {

        if (req.body.password === user.password) {
            responseType.message = 'Login Successfully';
            responseType.status = 200;
        } else {
            responseType.message = 'Wrong Password';
            responseType.status = 401;
        }
    }
    else {
        responseType.message = 'Invalid Email id';
        responseType.status = 404;
    }
    res.status(responseType.status).json({ message: 'ok', data: responseType });
}

const spinrandomwin = async (req, res) => {
    let data = await Users.users.find({ resultPrizeVal: 1, date: formattedToday });

    let thomsonwinCount = (await Users.users.find({ prize: 'You won Thomson goodies !' })).length;
    let kodakwinCount = (await Users.users.find({ prize: 'You won Kodak goodies !' })).length;
    let blauwinCount = (await Users.users.find({ prize: 'You won Blaupunkt goodies !' })).length;

    // console.log(data);
    if (!data) {
        res.status(400).json({ "status": "400", "message": "data not found" });
    }
    else {
        res.status(200).json({ "status": "200", "message": data, "thomsonwinCount" : thomsonwinCount, "kodakwinCount" : kodakwinCount,
        "blauwinCount" : blauwinCount});
    }
}





module.exports = {
    userAdd, userList, spindata, spindatalist, spinadmin, spinrandomwin, userCheck
}