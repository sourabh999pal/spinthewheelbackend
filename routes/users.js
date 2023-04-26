const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const jwtAuth = require('../middleware/middleware');



// passport setup for authentication //
var passport = require('passport');
require('../middleware/passport')(passport)

var bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended:false}));


router.get('/', (req , resp)=>{
  resp.send('hello')
});



router.post('/add', userCtrl.userAdd);
router.post('/check', userCtrl.userCheck);
router.get('/list', userCtrl.userList);

router.post('/spindata', userCtrl.spindata);
router.get('/spindatalist', userCtrl.spindatalist);

router.get('/spinrandomwin', userCtrl.spinrandomwin);

router.post('/spinadmin', userCtrl.spinadmin);

module.exports = router;