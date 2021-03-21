const mongoose = require('mongoose');
console.log(process.env.MONGO_DB_LOCAL_URL);
const connect = () => {
  mongoose.connect(process.env.MONGO_DB_LOCAL_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(con => {
    console.log(`Mongo db connected with host: ${con.connection.host}.`)
  }).catch(err => {
    console.log('Error', err )
  })
}

module.exports = connect;