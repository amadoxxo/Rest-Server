const express = require('express');

let { verificarToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');


// ===========================
// Recibir todas las categorias
// ===========================
app.get('/categoria', verificarToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categoriaDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categoria: categoriaDB
            });
        });
});

// ============================
// Recibir una categoria por ID
// ============================
app.get('/categoria/:id', (req, res) => {

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});


// ============================
// Crear una nueva categoria
// ============================
app.post('/categoria', verificarToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se encontro ninguna categoria'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});

app.put('/categoria/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/categoria/:id', [verificarToken, verificaAdmin_Role], (req, res) => {
    // Solo un administrador puede borrar categorias
    // Categoria.findByIdAndRemove

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBorrado) => {

        if (err) {
            return status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'La categoria no existe'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaBorrado
        });



    });
});

module.exports = app;