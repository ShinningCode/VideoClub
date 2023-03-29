const express = require('express');
const Director = require('../models/directors');
/* GET users listing. */

function list(req,res,next){
  Director.find().then(objs=>res.status(200).json({
    message: "Director´s list",
    obj: objs
  })).cathc(ex => res.status(500).json({
    message: "No se pudo realizar la consulta",
    obj: ex
  }));
};

function index(req,res,next){
  const id = req.params.id;
  Director.findOne({"_id":id}).then(obj => res.status(200).json({
      message: `Director con id ${id}`,
      obj:obj
  })).catch(ex=>res.status(500).json({
      message: `No se pudo realizar la consulta`,
      obj:ex

  })); 
}

function create(req, res, next){
  let name = req.body.name;
  let lastName = req.body.lastName;
  
  let director = new Director({
      name:name,
      lastName:lastName
  });

  director.save().then(obj => res.status(200).json({
      message:"Director creado correctamente",
      obj:obj
  })).catch(ex => res.status(500).json({
      message:"No se pudo almacenar el director",
      obj:ex
  }));
};

function replace(req, res, next){
  const id = req.params.id;
  let name = req.body.name ? req.body.name : "";
  let lastName = req.body.lastName ? req.body.lastName : "";

  let director = new Object({
      _name : name,
      _lastName : lastName
  });

  Director.findOneAndUpdate({"_id":id},director,{new : true})
          .then(obj => {res.status(200).json({
              message: "Director actualizado correctamente",
              obj:obj
          })}).catch(ex => res.status(500).json({
              message:"No se pudo remplazar el director",
              obj:ex
          }));
};

function update(req, res, next){
  const id = req.params.id;
  let name = req.body.name;
  let lastName = req.body.lastName;

  let director = new Object();

  if(name){
      director._name = name;
  }
  if(lastName){
      director._lastName = lastName;
  }

  Director.findOneAndUpdate({"_id":id},director)
          .then(obj => res.status(200).json({
              message:"Director actuaizado correctamente",
              obj:obj
          })).catch(ex => res.status(500).json({
              message:"No se pudo remplazar el director",
              obj:ex
          }));
};

function destroy(req, res, next){
  const id = req.params.id;
  Director.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
      message: "Director eliminado correctamente",
      obj:obj
  })).catch(ex => res.status(500).json({
      message:"No se pudo eliminar el director",
      obj:ex
  }));
};

module.exports = {list,index,create,update,destroy,replace};
