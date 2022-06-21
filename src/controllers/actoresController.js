const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
// const Movies = db.Movie;
// const Genres = db.Genre;
// const Actors = db.Actor;

const actoresController = {
    list:function(req,res){
        console.log('Llego');
        db.Actor.findAll()
            .then(actores => {
                res.render('actoresList.ejs', {actores:actores})
            })
    },
    new:function(req,res){
        db.Actor.findAll({
            order : [
                ['last_name', 'DESC']
            ],
            limit: 10
        })
            .then(actores => {
                res.render('newestActores', {actores:actores});
            });
    },
    recomended: (req, res) => {
        db.Actor.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(actores => {
                res.render('recommendedActores.ejs', {actores:actores});
            });
    },
    detail: (req, res) => {
        db.Actor.findByPk(req.params.id)
            .then(actor => {
                res.render('actorDetail.ejs', {actor:actor});
            });
    },
    add: function (req, res) {
        db.Movie.findAll()
            .then(allMovies => {
                res.render('actoresAdd', {allMovies:allMovies})
            })
    },
    create: function (req,res) {
        db.Actor.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            rating:req.body.rating,
            favorite_movie_id:req.body.favorite_movie_id,
        })
            .then(
                res.redirect("/actores")
            )
    },
    edit: function(req,res) {
        let pedidosActor=db.Actor.findByPk(req.params.id);
        let pedidosMovies=db.Movie.findAll();
        Promise.all([pedidosActor,pedidosMovies])
            .then(function([Actor,allMovies]){
                res.render('actoresEdit', {Actor:Actor,allMovies:allMovies})
            })

    },
    update: function (req,res) {
        db.Actor.update({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            rating:req.body.rating,
            favorite_movie_id:req.body.favorite_movie_id,
        },{
            where: {
                id:req.params.id
            }
        })
            .then( 
                res.redirect("/actores")
            );
    },
    delete: function (req,res) {
        db.Actor.findByPk(req.params.id)
            .then(function(Actor){
                res.render("actoresDelete",{Actor:Actor})
            })
    },
    destroy: function (req,res) {
        db.Actor.destroy({
            where:{
                id:req.params.id
            }
        })
            .then(
                res.redirect("/actores")
            )
    }
}
module.exports=actoresController;