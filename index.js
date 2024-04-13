const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const cacheDir = path.join(__dirname, 'cache');

if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir);
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/caera/sim', async (req, res) => {
    try {
        const link = req.query.text;

        if (!link) {
           return res.json({
            rpl: "اكتب شي"
        })
            
        }


const resp = await axios.post('https://simsimi.vn/web/simtalk', {
  text: link,
  lc: 'ar'
}, {
  headers: {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'X-Requested-With': 'XMLHttpRequest',
    'Referer': 'https://simsimi.vn/',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  }
})

    
    const rd = resp.data.success;
      
        res.json({
            rpl: rd
        })
        
    } catch (error) {
        
        res.json({
            rpl: "✖️ | حصل خطأ"
        })
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
