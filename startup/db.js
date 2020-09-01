const mongoose = require('mongoose')

module.exports = function(){
  mongoose.connect(
    'mongodb://localhost/etherpm',
    {useNewUrlParser: true,  useUnifiedTopology: true},
    () => {
    console.log('Database connection established...');
  })
}
