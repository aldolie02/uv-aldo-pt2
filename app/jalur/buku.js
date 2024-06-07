const express = require('express')
const BukuController = require('../ctrl/buku')
const router = express.Router();
router.get('/', BukuController.lihatSemua);
router.get('/:id', BukuController.lihat);
router.post('/', BukuController.tambah);
router.put('/:id', BukuController.perbarui);
router.delete('/:id', BukuController.hapus);
module.exports = router