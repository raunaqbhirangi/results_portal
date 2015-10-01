var express = require('express');
var app = express();
var http = require('http');
var mysql = require('mysql');
var bodyParser = require('body-parser');

http.Server(app).listen(8000);
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'Pr5!sh@mb',
	database:'mi_2015',
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',function(req,res){
	res.sendFile(__dirname+'/result_upload.html');
	//res.sendFile(__dirname+'/java.js');
});

app.post('/addprizes',function(req,res){
	var eventid = req.body.eventid;
	var firstprize = req.body.firstprize;
	var secondprize = req.body.secondprize;
	var thirdprize = req.body.thirdprize;
	if(!!eventid&&!!firstprize&&!!secondprize&&!!thirdprize)
	{
		connection.query("UPDATE results SET firstprize=?,secondprize=?,thirdprize=? WHERE eventid=?",[firstprize,secondprize,thirdprize,eventid],function(err,rows,fields){
			console.log(err);
		});
	}
});