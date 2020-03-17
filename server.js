const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config()
app.use(express.static('docs'))
app.use(express.static(__dirname))
app.use(/.*/, function (req, res, next) {
    var host = req.header("host");
    if (host.match(/^www\..*/i)) {
        next();
    } else {
        res.redirect(301, "https://www." + host);
    }
});

app.get('*', (req, res) => {
    if (host.match(/^www\..*/i)) {
        res.sendFile(path.resolve(__dirname, 'docs', 'index.html'))
    } else {
        res.redirect(301, "https://www." + host);
    }
})

app.listen(3000, process.env.IP, () => {
    console.log(`App is running on ${process.env.Port}`)
})