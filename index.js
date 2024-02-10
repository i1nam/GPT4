const express = require('express');
const cheerio = require('cheerio');
const request = require('request');

const app = express();
const port = 3000;

app.get('/om', (req, res) => {
    const url = 'https://azoramoon.com';

    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const images = [];
            $('img').each((index, element) => {
                const src = $(element).attr('src');
                images.push(src);
            });
            res.json(images);
        } else {
            res.status(500).json({ error: 'Failed to fetch images' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
