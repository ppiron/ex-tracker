const router = require('express').Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const database = require('../datatabase.js');
const db = database.getDb();

function handleURL(req, res) {

  let response = {};

  const userID = req.body.userID;
  const exercise = req.body.exercise;
  const duration = req.body.duration;
  
  db.collection('users').find({ id: userID }, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      result.count()
      .then((count) => {
        console.log(count);
        if (count > 0) {
          // user found
          let username;
          result.toArray()
          .then ( docs => username = docs[0].user)
          db.collection('users').updateOne(
            { id: userID }, 
            { $push: 
              { exercises: 
                {
                  exercise: exercise,
                  duration: duration,
                }
              }
            }, (error, result) => {
            if (error) {
              console.log(error);
              return
            }
            console.log(result.modifiedCount);
            response.user = username;
            response.userID = userID;
            response.exercise = exercise;
            response.duration = duration;
            res.send(response)
          })
        } else {
          // user not found
          res.json( {error: 'userID not in the database'} )
        }
      });
    }
  })
}


router.post('/api/exercise/add', jsonParser, handleURL);

module.exports = router;