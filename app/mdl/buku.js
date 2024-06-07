var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    kode: {
        type: String,
        required: true,
        unique: true
    },
    nama: {
        type: String,
        default: ''
    },
    penulis: {
        type: String,
        default: ''
    },
    penerbit: {
        type: String,
        default: ''
    },
    stok: {
        type: String,
        default: '0'
    },
    harga: {
        type: String,
        default: '0.00'
    }
});

var buku = new mongoose.model('Buku', schema);
module.exports = buku;