const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const PORT = 3000
const app = express()

app.use( bodyParser.urlencoded({ extended: false }) )
app.use( bodyParser.json() )

const urlDB = 'mongodb://localhost:27017/test'

MongoClient.connect(urlDB)
  .then( db => {

    app.get('/tasks', (req,res) => {

      db.collection('tasks')
        .find()
        .toArray()
        .then( tasks => res.json(tasks) )
        .catch( err => { throw err } )

    })

    app.get('/task/:id', (req,res) => {

      const { id } = req.params

      db.collection('tasks')
        .find({ _id: ObjectId(id) })
        .toArray()
        .then( task => res.status(200).json(task) )
        .catch( err => res.status(500).json(err) )

    })

    app.delete('/task/:id', (req,res) => {

      const { id } = req.params

      db.collection('tasks')
        .remove({ _id: ObjectId(id) })
        .then( task => {
          console.log(`tasks has been removed succesfully`)
          res.status(200).json(task)
        })
        .catch( err => res.status(500).json(err) )

    })


    app.put('/task/:id', (req,res) => {

      const { id } = req.params

      let { title, done } = req.body
      const updatedAt = Date.now()
      done = done === "true" ? true : false

      db.collection('tasks')
        .update( { _id: ObjectId(id) },  { title, done, updatedAt } )
        .then( task => {
          console.log('task has been updated succesfully')
          res.status(200).json(task)
        })
        .catch( err => res.status(500).json(err) )

    })

    app.post('/tasks', (req,res) => {

      const { title } = req.body
      const createdAt = Date.now()
      const done = false

      db.collection('tasks')
        .insert( { title, done, createdAt } )
        .then( task => {
          console.log('task has been created succesfully')
          res.status(200).json(task)
        })
        .catch( err => res.status(500).json(err) )

    })

  })

app.listen(PORT, () => console.log(`💼 Tasks Server running at PORT ${PORT}...`))