const express = require('express');
const fs = require('fs');

const app = express();


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next();
})

app.get('/', (req, res) => {
    let path = __dirname + '/index.html';
    console.log(path);
    res.sendFile(path);
})

app.get('/video', (req, res) => {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send('Missing range header')
    }

    const videoPath = 'chess_match.mp4';
    const videoSize = fs.statSync(videoPath).size;

    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1)

    const contentLength = end - start + 1;
    const headers = {
        'Content-Range': `bytes ${start} - ${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'video/mp4'
    }

    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });

    videoStream.pipe(res);
})


app.listen(3000, () => {
    console.log('App is listening on 3000')
})