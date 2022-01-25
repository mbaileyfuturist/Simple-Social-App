const port = process.env.PORT || 3001;
const express = require('express')
const app = express()
const cors = require('cors');
const path = require('path')

app.use(express.json())
app.use(cors())
    
    // All other GET requests not handled before will return our React app
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });

app.listen(port, () => {
    console.log('Server running on port ' + port)
})