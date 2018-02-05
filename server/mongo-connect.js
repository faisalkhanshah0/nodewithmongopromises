const { MongoClient, ObjectId } = require('mongodb');

var mongo = new Promise((resolve, reject) => {
    // var uri = 'mongodb://admin:admin123@localhost:27017/todoapi?authSource=admin';
    var uri = 'mongodb://shah:shah@localhost:27017/todoapi';
    MongoClient.connect(uri, (err, db) => {
        if(err){
            reject('something went wrong in connection',err);
        }
        else{
            resolve(db);
        }
    
    });
});

var fetch = (db) => {
    return new Promise((resolve, reject) => {
        db.collection('Todos').find().toArray().then((docs) => {
            resolve(docs);
            
        }).catch((e) => {
            reject('fetching unsuccessfull', e);
        });
    });
}

mongo.then((db) => {

    //console.log('inside success : ',db);
    // db.collection('Todos').find().toArray().then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }).catch((e) => {
    //     console.log('fetching unsuccessfull', e);
    // });
    // or
    //  fetch(db).then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }).catch((e) => {
    //     console.log('error in fetching :',e);
    // });
    return fetch(db);
}).then((docs) => {
         console.log(JSON.stringify(docs, undefined, 2));
     }).catch((e) => {
 console.log('inside first promise error part : ',e);
});



module.exports = {
    MongoClient
}