const express = require('express')
var mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname })
});

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'task assignments'
});

connection.connect(function(err){
  if (err) throw err;
  console.log('Connected')
})

app.get('/tasks', function (req, res) {
  connection.query("select * from tasks order by assignedto", function (err, rows, fields) {
  if (err) throw err
    res.render('users', {title: "Tasks Displayed",
    items: rows })
  })
});

app.post('/submit', function (req,res){

    var sql = "insert into tasks values(null, '"+ req.body.task +"' , '"+ req.body.assignto +"')";
    connection.query(sql, function (err) {
    if (err) throw err
      res.render('index', {title: 'Task Assigned',
      message: "Task Assigned Successfully!" })
  })




  connection.end()


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
