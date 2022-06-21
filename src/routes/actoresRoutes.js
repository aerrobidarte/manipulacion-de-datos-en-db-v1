const express = require('express');
const router = express.Router();
const actoresController = require('../controllers/actoresController');

router.get('/actores', actoresController.list);
router.get('/actores/new', actoresController.new);
router.get('/actores/recommended', actoresController.recomended);
router.get('/actores/detail/:id', actoresController.detail);
//Rutas exigidas para la creación del CRUD
router.get('/actores/add', actoresController.add);
router.post('/actores/create', actoresController.create);
router.get('/actores/edit/:id', actoresController.edit);
router.put('/actores/update/:id', actoresController.update);
router.get('/actores/delete/:id', actoresController.delete);
router.delete('/actores/delete/:id', actoresController.destroy);

module.exports = router;