const TokenHelper = require('../tokenHelper');
var tokenHelper = require('../tokenHelper')
var userHelper = require('../userHelper')
const auth = {
    checkToken: async(req,res,next) =>{
        console.log(`checkToken Middleware called`);
        const bearerHeader = req.headers['authorization'];
        console.log('bearerheader:',bearerHeader);
        if(!bearerHeader){
            console.log('bearer token error');
            return res.sendStatus(403);
        }
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        // console.log(token);

        if(!token){
            console.log('cannot get token in bearer error');
            return res.sendStatus(403)
        }

        const isValid = await tokenHelper.isValid(token);
        if(!isValid){
            console.log(`token not valid`);
            return res.sendStatus(403)
        }

        const user = await userHelper.findById(isValid);


        req.user = user;
        next()
    }
}
module.exports=auth;