const supertest = require('supertest');

const app = require('../app');

describe('Probar el sistema de autenticacion', ()=>{
    it("Deberia de obtener un login con un user y password correctos", (done)=>{
        supertest(app).post("/login").send({'email':'sdfdfg50','email':'a329927uach.mx'})
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            }else{done();}
        })
    });

    it("No deberia de obtener un login con user y password incorrectos",()=>{
    supertest(app).post("/login")
    .send({'email':'luramirez@uach.mx','password':'noiasdni'})
    .expect(403)
    .end(function(err, res){
        if(err){
            donde(err);
        }else{
            done();
        }
    })
    })
});