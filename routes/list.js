const router = require('express').Router();
const bodyParser = require('body-parser');
// const urlencodedParser = bodyParser.urlencoded({ extended: false })
const database = require('../datatabase.js');
const db = database.getDb();

function handleURL(req, res) {

  let response = {};

  const userID = req.query.userID;
  
  db.collection('users').find({ id: userID }, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      result.count()
      .then((count) => {
        console.log(count);
        if (count > 0) {
          // user found
          result.toArray()
          .then ( docs => {
            response.username = docs[0].user
            response.userID = userID
            response.exercises = docs[0].exercises
            res.send(response)
          })
          // db.collection('users').updateOne(
          //   { id: userID }, 
          //   { $push: 
          //     { exercises: 
          //       {
          //         exercise: exercise,
          //         duration: duration,
          //       }
          //     }
          //   }, (error, result) => {
          //   if (error) {
          //     console.log(error);
          //     return
          //   }
          //   console.log(result.modifiedCount);
          //   response.user = username;
          //   response.userID = userID;
          //   response.exercise = exercise;
          //   response.duration = duration;
          //   res.send(response)
          // })
        } else {
          // user not found
          res.json( {error: 'userID not in the database'} )
        }
      });
    }
  })
}


router.get('/api/exercise/log', handleURL);

module.exports = router;