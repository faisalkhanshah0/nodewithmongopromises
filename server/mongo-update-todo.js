var { ObjectId } = require('mongodb');
var updatetodo = (db,obj) => {
    return new Promise((resolve, reject) => {
        
        db.collection('Todos').findOneAndUpdate({
            _id : new ObjectId(obj.eid)
        }, {
            $set : {
                text : obj.text
            }
        }, (err, docs) => {
            if(err)
            {
                reject('something went wrong in insertion document',err);
            }
            else{
                var doc = {
                    docs,
                    db
                }
                resolve(doc);
            }
        });
    });
  }

  module.exports = {
    update : updatetodo
  }