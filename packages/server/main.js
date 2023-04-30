const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors());
// Define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('Hello from the server')
})


// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000')
})
