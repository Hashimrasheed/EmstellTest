const express = require('express')
const app = express.Router()
const homeController = require('../app/http/controllers/homeController')
const studentController = require('../app/http/controllers/studentController')

//get requests
app.get('/', homeController().home)
app.get('/login', homeController().login)
app.get('/logout', homeController().logout)
app.get('/addStudent', studentController().addStudent)
app.get('/edit/:id', studentController().editStudent)
app.get('/delete/:id', studentController().deleteStudent)

//post requests
app.post('/login', homeController().postLogin)
app.post('/addstudent', studentController().postAddStudent)
app.post('/editstudent/:id', studentController().postEditStudent)

module.exports = app