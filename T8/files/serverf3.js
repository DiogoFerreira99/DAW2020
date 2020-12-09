const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const jsonfile = require('jsonfile')
const templates = require('./html-templates.js')
const logger = require('morgan')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

const app = express()

app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static(__dirname + "/public"))

app.get('/', (req, res) => {
    let d = new Date().toISOString().substr(0, 16)
    let files = jsonfile.readFileSync('./dbFiles.json')

    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
    res.write(templates.fileList(files, d))
    res.end()
})

app.get('/files/upload', (req, res) => {
    let d = new Date().toISOString().substr(0, 16)
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
    res.write(templates.fileForm(d))
    res.end()
})

app.get('/files/download/:fname' , (req,res) => {
    res.download(__dirname + '/public/fileStore/'+ req.params.fname)
}) 

app.post('/files', upload.array('myFile'), (req, res) => {
    console.log(req.body)

    var i = 0
    
    let d = new Date().toISOString().substr(0, 16)
    let files = jsonfile.readFileSync('./dbFiles.json')

    req.files.forEach( f => {
        let oldPath = __dirname + '/' + f.path
        let newPath = __dirname + '/public/fileStore/' + f.originalname

        fs.rename(oldPath, newPath, err => {
            if(err) throw err
        })

        files.push({
            date: d,
            name: f.originalname,
            size: f.size,
            mimetype: f.mimetype,
            description: req.body.desc[i++]
        })

    })

    jsonfile.writeFileSync('./dbFiles.json', files)
    res.redirect('/')
    
})

app.get('/files/download/:fname', (req, res) => {
    console.log("Downloading file " + __dirname + "/public/fileStore/" + req.params.fname)
    res.download(__dirname + '/public/fileStore/' + req.params.fname)
})

app.listen(7701, () => console.log('Servidor à escuta na porta 7701...'))
