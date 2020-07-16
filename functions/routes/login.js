const express = require('express');
const router = express.Router();
require('dotenv').config()
const jwt = require('jsonwebtoken');

module.exports = (db)=>{

    //login retornando token para frontend
    router.post('/', (req, res)=>{
        let login = req.body.login;
        let pwd = req.body.password;
        let doc;
        db.collection('profile').doc(login).get().then((docRef)=>{
            doc = docRef.data();

            if(pwd === doc.senha){
                let token = jwt.sign({login}, process.env.SECRET, {
                    expiresIn: '1d'
                });

                return res.send({
                    auth: true,
                    token: token,
                    username: login
                });
            } else{
                return res.send({
                    erro: "Usuário ou senha inválida1",
                    secret: process.env.SECRET,
                    password: doc.senha
                });
            }
            
            
        }).catch((e)=>{
            return res.send({
                erro: "Usuário ou senha inválida2",
                secret: process.env.SECRET,
                log: e
            });
        });

       
    });

    return router;
};