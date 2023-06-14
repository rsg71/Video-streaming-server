const express = require('express');

const app = express();

app.get('/video', (req, res) => {
    res.send('hello')
})

app.listen(3000, () => {
    console.log('App is listening on 3000')
})

