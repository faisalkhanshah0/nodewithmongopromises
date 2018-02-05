var deletetodo = (db,obj) => {
    return new Promise((resolve, reject) => {
        db.collection('Todos').deleteOne(obj, (err, docs) => {
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
    deletee : deletetodo
  }