const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect('mongodb://localhost/etherpm', {useNewUrlParser: true},() => {
    console.log('Database connected!');
  });
}
