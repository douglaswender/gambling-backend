const express = require('express');
const router = express.Router();

require('dotenv').config()
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, (err, decoded)=>{
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
      return res.status(500);
    });
    return res.status(500);
  }

module.exports = (db) => {
    //get
    router.get('/', verifyJWT, (req, res) => {
        res.send('ok');
    });

    //get
    router.get('/:id', verifyJWT, (req, res) => {
        (async () => {
            try {
                const document = db.collection('match').doc(req.params.id);
                let item = await document.get().then((doc)=>{
                    if(!doc.exists){
                        return {
                            cod: 1006,
                            erro: "Não existe esta partida"
                        };
                    } else{
                        return doc.data();
                    }
                }).catch((e)=>{
                    console.log(e);
                });
                let response = item;
                return res.status(200).send(response);

            } catch (error) {
                console.log(error);
                return res.status(500).send(error);
            }
        })();
    });

    //post
    router.post('/', (req, res) => {
        res.send('ok');
    });

    //put
    router.put('/', (req, res) => {
        res.send('ok');
    });

    //delete
    router.delete('/', (req, res) => {
        res.send('ok');
    });

    return router;
};