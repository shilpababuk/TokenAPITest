const { ObjectId, ObjectID } = require('mongodb');
var db = require('../config/db-connection');
var collection = require('../config/db-collections')
const bcrypt = require('bcrypt');
const user ={
    create:(data)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.COL_USESRS).insertOne({'name':data.name,'email':data.email,'password':data.password},(err,result)=>{
                if(!err){
                    resolve(result.ops[0])
                }else{
                    resolve(false)
                }
            })
        })
    },
    findByEmail:(email)=>{
        return new Promise((resolve,reject) =>{
            db.get().collection(collection.COL_USESRS).findOne({'email':email},(err,user)=>{
                if(!err){
                    resolve(user)
                }
                else{
                    resolve(err)
                }
            })
        })
    },
    hashpassword:(plainPassword)=>{
        //need to handle the error cases
        return new Promise((resolve,reject)=>{
            resolve(bcrypt.hashSync(plainPassword,collection.SALT_ROUNDS));
        })
    },
    comparePassword:(currentPassword,originalPassword)=>{
        return new Promise((resolve,reject)=>{
            resolve(bcrypt.compareSync(currentPassword,originalPassword))
        })
    },
    findById: (id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.COL_USESRS).findOne({ _id : ObjectID(id)}, (err,user)=>{
                if(user != null){
                    resolve(user)
                }
                else{
                    resolve(null)
                }
            })
        })
    }
}
module.exports=user