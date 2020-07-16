const express = require('express');
const router = express.Router();



module.exports = (db) => {
    //get
    router.post('/', (req, res) => {
        (async () => {
            try {
                let query = db.collection('profile');
                console.log(req.body.user);
                await query.doc(req.body.user).get().then((doc) => {
                    if (!doc.exists) {
                        return res.status(500).send({
                            erro: 'Usuário não encontrado!'
                        });
                    } else {
                        let response = doc.data();
                        response.username = req.body.user;  
                        console.log(response);                      
                        return res.status(200).send(response);
                    }
                }).catch((e) => {
                    console.log(e);
                    return res.status(500).send({
                        erro: "Houve um erro inesperado! Código 001"
                    });
                });
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