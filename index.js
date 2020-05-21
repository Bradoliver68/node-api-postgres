const fs = require("fs")
const bodyParser = require("body-parser")
const express = require('express')
const app = express()
const port = 3001
const db = require('./queries')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Get '/'
app.get('/', (req, res) => {
    res.json({info: 'Node.js, Express, and Postgres API'})
})

// GET students
app.get('/students', db.getStudents)

// Get students by ID
app.get('/students/:id', db.getStudentById)

// GET grades by ID
app.get('/grades/:id', db.getStudentGradesById)

// POST grade by student ID
app.post('/grades/:id', db.postGradeById)

// POST a new student
app.post('/register', db.registerStudent)

app.listen(port, () => console.log(`Express app listening on at http://localhost:${port}`))
  