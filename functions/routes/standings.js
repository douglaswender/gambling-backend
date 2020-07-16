const express = require('express');
const router = express.Router();



module.exports = (db) => {

    //get
    router.get('/', (req, res) => {
        (async () => {
            try {
                let query = db.collection('profile');
                let response = [];

                await query.orderBy('saldo', 'desc').limit(8).get().then((snapshot) => {
                    let docs = snapshot.docs;
                    // eslint-disable-next-line promise/always-return
                    for (let doc of docs) {
                        const selectedProfile = {
                            username: doc.id,
                            gamblings: doc.data().saldo,
                            nome: doc.data().nome,
                            email: doc.data().email,
                            time: doc.data().time
                        };
                        response.push(selectedProfile);
                    }
                }).catch((e)=>{
                    console.log(e);
                });
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