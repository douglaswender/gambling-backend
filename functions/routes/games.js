const express = require('express');
const router = express.Router();

module.exports = (db) => {
    //get
    router.get('/', (req, res) => {
        (async () => {
            try {
                let query = db.collection('games');
                let response = [];

                await query.get().then((snapshot) => {
                    let docs = snapshot.docs;
                    // eslint-disable-next-line promise/always-return
                    for (let doc of docs) {
                        const selectedGame = {
                            titulo: doc.data().titulo,
                            jogos: doc.data().jogos
                        };
                        response.push(selectedGame);
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

    //get
    router.get('/:id', (req, res) => {
        (async () => {
            let id = req.params.id;
            try {
                let query = db.collection('games');
                let response = [];

                await query.get().then((snapshot) => {
                    let docs = snapshot.docs;
                    // eslint-disable-next-line promise/always-return
                    for (let doc of docs) {
                        const selectedGame = {
                            titulo: doc.data().titulo,
                            jogos: doc.data().jogos
                        };
                        response.push(selectedGame);
                    }
                }).catch((e)=>{
                    console.log(e);
                });

                let matchIdeal;
                let tituloIdeal;

                for(let games of response){
                    let jogos = games.jogos;
                    

                    for(let match of jogos){
                        console.log(match);
                        console.log(match.id);
                        console.log(id);
                        console.log('\n \n')
                        
                        if(match.id == id){
                            console.log('achei jogo com id: ', id)
                            matchIdeal = match;
                            tituloIdeal = games.titulo;
                            break;
                        } else{
                            console.log('nao achei jogo com id', id)
                        }
                    }
                }
                return res.status(200).send({
                    titulo: tituloIdeal,
                    match: matchIdeal
                });
            } catch (error) {
                console.log(error);
                return res.status(500).send(error);
            }
            
        })();

    });

    //post
    router.post('/', async (req, res) => {
        (async () => {
            try {
                await db.collection('items').doc('/' + req.body.id + '/')
                    .create({ item: req.body.item });
                return res.status(200).send();
            } catch (error) {
                console.log(error);
                return res.status(500).send(error);
            }
        })();
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