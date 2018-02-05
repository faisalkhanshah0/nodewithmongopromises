var fetch = (db) => {
    return new Promise((resolve, reject) => {
        db.collection('Todos').find().toArray().then((docs) => {
            resolve(docs);
            
        }).catch((e) => {
            reject('fetching unsuccessfull', e);
        });
    });
  }

  module.exports = {
      fetch
  }