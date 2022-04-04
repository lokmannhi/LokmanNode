require('dotenv').config()
const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: "sql6483260",
    host: "sql6.freemysqlhosting.net",
    password: "SCtzNSn9jy",
    database: "sql6483260",
    port: "3306"
})

db.connect(function(error) {
    if (error) {
        console.log(error)
    } else {
        console.log('connected')
    }
})

app.get('/get/users', (req, res) => {
    const sqlSelect = "SELECT * FROM users";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})

app.post('/insert/users', (req, res) => {

    const name = req.body.name
    const dateofbirth = req.body.dateofbirth
    const address = req.body.address
    const poscode = req.body.poscode
    const state = req.body.state
    
    const sqlInsert = "INSERT INTO users (name, dateofbirth, address, poscode, state) VALUES (?,?,?,?,?)"
    db.query(sqlInsert, [name, dateofbirth, address, poscode, state], (err, result) => {
        console.log("Successfull")
    })
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running on port : ${port}`)
})