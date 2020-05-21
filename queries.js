const Pool = require('pg').Pool
const pool = new Pool({
  user: 'meto',
  host: 'localhost',
  database: 'apito',
  password: 'password',
  port: 5432,
})

const getStudents = (req, res) => {
    pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
}

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM students WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getStudentGradesById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT grade FROM students WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const postGradeById = (req, res) => {
    const { grades } = req.body
    const id = parseInt(req.params.id)
    
    pool.query('UPDATE students SET grade = array_cat(grade, {$1}) WHERE id = $2', [grade, id], (error, results) => {
       if (error) {
           throw error
       }
       res.status(201).send(`Grade added for user with ID: ${results.id}`) 
    })
}

const registerStudent = (req, res) => {
    const { name, grade} = req.body

    pool.query('INSERT INTO students (name, grade) VALUES ($1, $2)', [name, grade], (error, results) => {
      if (error) {
          throw error
      }
      res.status(201).send(`Student added with Name: ${name}`)  
    })
}


module.exports = {
    getStudents,
    getStudentById,
    getStudentGradesById,
    postGradeById,
    registerStudent
}