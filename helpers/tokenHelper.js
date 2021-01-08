const jwt = require('jsonwebtoken');
const TOKEN_SECRET = 'gdhgfdhfbdjfvkjv'

const TokenHelper = {
    generate(payload,expires){
        console.log(payload,expires);
        return jwt.sign(payload,TOKEN_SECRET,expires ? {expiresIn:expires} : null)
    },
    isValid(token){
        return new Promise((resolve,reject)=>{
            jwt.verify(token, TOKEN_SECRET, (err,decoded)=>{
                if(err){
                    resolve(false)
                }
                else{
                    resolve(decoded._id)
                }
            })
        })
    }
}
module.exports=TokenHelper;