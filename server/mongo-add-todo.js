var add = (db,obj) => {
    return new Promise((resolve, reject) => {
        db.collection('Todos').insertOne(obj, (err, docs) => {
            if(err)
            {
                reject('something went wrong in insertion document',err);
            }
            else{
                resolve(docs);
            }
        });
    });
  }

  module.exports = {
      add
  }