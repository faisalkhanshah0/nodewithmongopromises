var express = require('express');
var router = express.Router();

const { mongo } = require('.././server/mongo-connect'); 
const { fetch } = require('.././server/mongo-find');
const { add } = require('.././server/mongo-add-todo');
const { deletee } = require('.././server/mongo-delete-todo');
const { update } = require('.././server/mongo-update-todo');

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  mongo.then((db) => {
    return fetch(db);
  }).then((docs) => {
   
    res.setHeader('Content-Type', 'application/json');
    res.send(docs);
        
     }).catch((e) => {
      res.send('fetching error : ',e);
  });
  
});

router.get('/add', (req, res, next) => {
  
  res.render('add', { title: 'Add' , msg : 'No changes'});
});

router.post('/add',(req, res, next) => {
  var text = req.body.text;
  var completed = req.body.completed;
  var obj = {
    text,
    completed
  }
  mongo.then((db) => {
    return add(db, obj);
  }).then((docs) => {
    res.render('add', { title: 'Add' , msg : docs});
    // res.setHeader('Content-Type', 'application/json');
    // res.send(docs);
        
     }).catch((e) => {
      res.render('add', { title: 'Add' , msg : e});
      // res.send('fetching error : ',e);
  });

});

router.get('/delete', (req, res, next) => {
  mongo.then((db) => {
    return fetch(db);
  }).then((docs) => {
   
    res.render('delete', { title: 'Delete' , msg : JSON.stringify(docs, undefined, 2)});
        
     }).catch((e) => {
      res.send('fetching error : ',e);
  });
  
});

router.post('/delete',(req, res, next) => {
  var text = req.body.text;
  var obj = {
    text
  }
  mongo.then((db) => {
    return deletee(db, obj);
  }).then((doc) => {
    return fetch(doc.db);
    
    
        
     }).then((docs) => {
      res.render('delete', { title: 'Delete' , msg : JSON.stringify(docs, undefined, 2)});
     }).catch((e) => {
      res.render('delete', { title: 'Delete' , msg : e});
      
  });

});

router.get('/update', (req, res, next) => {
  mongo.then((db) => {
    return fetch(db);
  }).then((docs) => {
   
    res.render('update', { title: 'Update' , msg : JSON.stringify(docs, undefined, 2)});
        
     }).catch((e) => {
      res.send('fetching error : ',e);
  });
  
});

router.post('/update',(req, res, next) => {
  var eid = req.body.eid;
  var text = req.body.text;
  var obj = {
    eid,
    text
  }
  mongo.then((db) => {
    return update(db, obj);
  }).then((doc) => {
    return fetch(doc.db);
    
     }).then((docs) => {
      res.render('update', { title: 'Update' , msg : JSON.stringify(docs, undefined, 2)});
     }).catch((e) => {
      res.render('update', { title: 'Update' , msg : e});
      
  });

});
module.exports = router;
