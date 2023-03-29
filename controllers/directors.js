const express = require('express');
const Director = require('../models/directors');
/* GET users listing. */

function list(req,res,next){
  Director.find().then(objs=>res.status(200).json({
    message: "Lista de directores",
    obj: objs
  })).cathc(ex => res.status(500).json({
    message: "No se pudo realizar la consulta",
    obj: ex
  }))
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

    let director =  new Director({
        name:name, lastName:lastName
    });

    director.save().then(onj => res.status(200).json({
        message: "Director creado correctamente.",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo almacenar el director", 
        obj:ex
    }))
  res.send(`respond with a create name= ${name} and lastname ${lastName}`);
};

function replace(req,res,next){
  const id = req.params.id;
  const name = req.body.name ? req.body.name : "";
  const lastName = req.body.lastName ? req.body.lastName : "";

  let director = new Object({"_id" :id },director,{new : true})
  .then(obj => res.status(200).json({
    message: "Director Actualizado exitosamente",
    obj:obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo remplazar el director", 
    obj:ex
}))
};

function update(req,res,next){
  res.send(`respond with update = ${req.params.id}`);
};

function findOneAndUpdate(req, res, next){
  const id = req.params.id;
  Director.findOneAndDelete({"_id": id}).then(obj=>res.status(200).json({
    message: "Director actualizado correctamente",
    obj: obj
  })).catch(ex=> res.status(500).json({
    message: "No se pudo actualizado el director", 
    obj:ex
  }))
}

function destroy(req,res,next){
  const id = req.params.id;
  Director.findOneAndDelete({"_id": id}).then(obj=>res.status(200).json({
    message: "Director eliminado correctamente",
    obj: obj
  })).catch(ex=> res.status(500).json({
    message: "No se pudo eliminar el director", 
    obj:ex
  }))
};

module.exports = {list, index, create, replace, update, destroy};
