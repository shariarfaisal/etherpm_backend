const express = require('express')
const app = express()

require('./startup/routes')(app)
require('./startup/db')()

const PORT = process.env.PORT || 1000
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`);
})
