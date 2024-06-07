const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const dbConfig = require('./prefs/database.config.js');
const mongoose = require('mongoose');mongoose.Promise = global.Promise;mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully Established Connection!");    
}).catch(err => {
    console.log('Connection Failed', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "UltraVoucher-Aldo-PT2"});
});app.listen(6969, () => {
    console.log("API Port: 6969");
});

const BukuRoute = require('./app/jalur/buku')
app.use('/buku',BukuRoute)