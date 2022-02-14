const express = require('express');
const router = express.Router();
const fs = require('fs');
const {MongoClient} = require("mongodb");
require('dotenv').config({path: './api/.env'});
const json2mongo = require("json2mongo");

const url1 = "mongodb+srv://naptoon123:er_789456123@cluster0.u8m3k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url1, { useNewUrlParser: true, useUnifiedTopology: true });

exports.getAll =  async (req, res, next) => {

    try {
        client.connect(err => {
            const collection = client.db("seven").collection("employees");
                 collection.find({is_deleted: {$ne: true}},{projection: {is_deleted:0}}).toArray(function(err, employees) {
                if (err) throw err;

                (employees.length === 0)?
                    res.status(200).json(
                    {
                        employees:'0 records found'
                    })
                    :res.status(200).json(
                     {
                        employees:employees
                     });
            });
        });


    } catch (err) {
        res.send({
            error: err
        });
        throw err;
    }
};
exports.getOne =  async (req, res, next) => {

    try {

        client.connect(err => {
            const collection = client.db("seven").collection("employees");
            collection.find({
                $and: [
                    {_id:parseInt(req.params.id)},
                    {is_deleted: {$ne: true}}
                ]},{projection: {is_deleted:0}}).toArray(function(err, employees) {
                if (err) throw err;

                (employees.length === 0)?
                    res.status(200).json(
                        {
                            employees:'0 records found'
                        })
                    :res.status(200).json(
                        {
                            employees:employees
                        });
            });
        });
    } catch (err) {
        res.send({
            error: err
        });
        throw err;
    }
};
exports.create =  async (req, res, next) => {

    try {
       let employee = {
           name:req.body.name,
           email:req.body.email,
           cpf:parseInt(req.body.cpf),
           phone:parseInt(req.body.phone),
           birth_date:new Date(req.body.birth_date),
           salary:req.body.salary,
           created_at:new Date(),
           is_deleted:false
        };

        client.connect(err => {
            const collection = client.db("seven").collection("employees");
            collection.insertOne(employee,  function (err, result) {
                if (err) throw err;

                res.status(200).json({
                    employee:employee
                });
            });

        });
    } catch (err) {
        res.send({
            error: err
        });
        throw err;
    }
};
exports.update =  async (req, res, next) => {

    try {

    } catch (err) {
        res.send({
            error: err
        });
        throw err;
    }
};
exports.delete =  async (req, res, next) => {

    try {
        client.connect(async err => {
            const collection = client.db("seven").collection("employees");
            let is_deleted = await collection.updateOne({_id:parseInt(req.params.id)},{ $set: { is_deleted: true } });
            if (err) throw err;

            (is_deleted.modifiedCount === 1)?
                res.send({
                    employee: 'Employee id '+req.params.id+' has been deleted'
                }):res.send({
                    employee: 'Employee id '+req.params.id+' is already deleted'});

        });
    } catch (err) {
        res.send({
            error: err
        });
        throw err;
    }
};
