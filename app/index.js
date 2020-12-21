'use strict'

const app = require('express')();
var bodyParser = require('body-parser')

app.use(bodyParser.json({limit: '2100000kb'}));  

// Loading Process Env 
require('dotenv').config();

const dataService = require('./service/data-service');

//设置跨域访问
app.all('*', function(req, res, next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200);  //让options尝试请求快速结束
    else
        next();
});

app.get('/', (req, res) => {
    res.send('Hello World!!!!');
});

app.get('/bill/types', async (req, res) => {
    const result = await dataService.findAllBillTypes();
    res.send(result);
});

app.get('/report/date=:date', async (req, res) => {
    console.log(req.params.date);
    const result = await dataService.findReportByDate(req.params.date);
    res.send(result);
});

app.post('/bill/create', async (req, res) => {
    const data = req.body.data;
    console.log(data);

    try {
        const result = await dataService.createBill(data);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    };
});

app.post('/report/create', async (req, res) => {
    const data = req.body;

    try {
        const result = await dataService.findAndUpdateReport(data.report, data.date);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    };
});

app.listen(process.env.APP_HOST_PORT || 8000, (err) => {
    if(err) {
        return console.log("Failed to start the server!");
    }
    console.log("Successfully started the server!");
});
