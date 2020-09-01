const express = require('express')
const app = express()

require('./startup/routes')(app)
require('./startup/db')()


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


const PORT = process.env.PORT || 1000
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`);
})
