import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const port = process.env.RADIO_PORT || 4000;

app.use(cors());

// Serve static files from Radio_Habbus directory
app.use(express.static(path.join(__dirname, 'Radio_Habbus')));

// API endpoint to get list of music files
app.get('/api/music-list', (req, res) => {
    const musicDir = path.join(__dirname, 'Radio_Habbus', 'assets', 'music');
    fs.readdir(musicDir, (err, files) => {
        if (err) {
            return res.status(500).json([]);
        }
        const musicFiles = files.filter(file => {
            return ['.mp3', '.wav', '.ogg'].includes(path.extname(file).toLowerCase());
        }).map(file => ({
            name: file,
            url: `/assets/music/${file}`
        }));
        res.json(musicFiles);
    });
});

app.listen(port, () => {
    console.log(`Servidor de radio escuchando en el puerto ${port}`);
});
