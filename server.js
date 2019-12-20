const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config()
app.use(express.static('docs'))
app.use(express.static(__dirname))


app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'docs', 'index.html'))
})

app.listen(process.env.PORT,process.env.IP, ()=>{
    console.log(`App is running on ${process.env.Port}`)
})