const BukuModel = require('../mdl/buku')
// CREATE
exports.tambah = async (req, res) => {
    if (!req.body.kode && !req.body.nama && !req.body.penulis && !req.body.penerbit && !req.body.stok && !req.body.harga) {
        res.status(400).send({ message: "Mohon isi seluruh field!" });
    }
    
    const buku = new BukuModel({
        kode: req.body.kode,
        nama: req.body.nama,
        penulis: req.body.penulis,
        penerbit: req.body.penerbit,
        stok: req.body.stok,
        harga: req.body.harga
    });
    
    await buku.save().then(data => {
        res.send({
            message:"Buku berhasil disimpan ke Database.",
            buku:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Terjadi error ketika menyimpan buku"
        });
    });
};

// READ/GET LIST
exports.lihatSemua = async (req, res) => {
    try {
        const buku = await BukuModel.find();
        res.status(200).json(buku);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// GET BY ID
exports.lihat = async (req, res) => {
    try {
        const buku = await BukuModel.findById(req.params.id);
        res.status(200).json(buku);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// UPDATE BY ID
exports.perbarui = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Mohon isi seluruh field untuk memperbarui"
        });
    }
    
    const id = req.params.id;
    
    await BukuModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Buku yang ingin diupdate tidak ada.`
            });
        }else{
            res.send({ 
                message: "Buku berhasil diperbarui." ,
                buku:data
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// DELETE BY ID
exports.hapus = async (req, res) => {
    await BukuModel.findByIdAndDelete(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Buku tidak ada / tidak ditemukan coy.`
          });
        } else {
          res.send({
            message: "Buku berhasil dimusnahkan!",
            dihapus:data
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};