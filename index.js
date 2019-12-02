const express = require('express');

const db = require('./data/hubs-model.js'); //Import Database

const server = express();

server.use(express.json()); //Needed To Parse JSON from Body, MIddleware

//Get Request
server.get('/', (req, res) => {
  res.send({ api: 'up and running...' });
});

//Get List of Hubs
server.get('/hubs', (req, res) => {
  //Get List of Hubs From Database
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      console.log('Error on GET /hubs', error);
      res.status(500).json({ errorMessage: 'Error Getting List' });
    });
});
//Add A Hub
server.post('/hubs', (req, res) => {
  //Get The Data Client Sent
  const hubData = req.body;
  //Call The DB and ADD Hub
  db.add(hubData)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      console.log('error on Post');
      res.status(500).json({ errorMessage: 'error adding' });
    });
});
//Remove Hub by ID
server.delete('/hubs/:id', (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(removed => {
      if (removed) {
        res.status(200).json({ message: 'removed' });
      } else {
        res.status(404).json({ message: 'not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'error' });
    });
});
//Update Hub

const port = 4000;

server.listen(port, () => {
  console.log('API Running');
});
