const express = require('express')
const app = express()

require('./startup/routes')(app)
require('./startup/db')()

app.use('/',(req,res) => {
  res.send("OK!")
})

const PORT = 1000
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`);
})
