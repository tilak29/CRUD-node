const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'keshroot-unitdb.crcodkqyjkbx.ap-south-1.rds.amazonaws.com',
    user: 'keshroot',
    password: 'KeshRoot#2023',
    database: 'new_schema',
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Read
app.get('/api/select', (req, res) => {
    const sqlSelect = "SELECT * FROM mov";
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        console.log(result);
        res.send(result);
    });
});

//create
app.post('/api/insert', (req,res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview; 

    const sqlInsert = "INSERT INTO mov (mov_name, movrev) VALUES(?,?)"
    db.query(sqlInsert, [movieName, movieReview], (err,result) => {
        console.log(err);
        // console.log(result);
    })
}
)

//delete
app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;

    const sqlDelete = "DELETE FROM mov WHERE id = ?"
    db.query(sqlDelete, id, (err,result) => {
        console.error(err);
    })
})

//Update
app.put('/api/update', (req, res) => {
    const movieName = req.body.id;
    const movieReview = req.body.movieReview;

    const sqlUpdate = "UPDATE mov SET movrev = ? WHERE id = ?"
    db.query(sqlUpdate, [movieReview,movieName], (err,result) => {
        console.error(err);
    })
})

// app.get('/', (req, res) => {
//     const sqlInsert = "INSERT INTO mov (mov_name, movrev) VALUES('inception', 'good');";
//     db.query(sqlInsert, (err, result) => {
//         res.send('Welcom to insert');
//     });
// }
// )

app.listen(8001, () => {
 console.log("runing on 8001");   
})
