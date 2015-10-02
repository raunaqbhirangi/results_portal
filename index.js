var express = require('express');
var app = express();
var http = require('http');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var fs = require('fs');

http.Server(app).listen(8000);
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'Pr5!sh@mb',
	database:'mi_2015',
});
console.log("Server listening on port 8000");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',function(req,res){
	res.sendFile(__dirname+'/result_upload.html');
	//res.sendFile(__dirname+'/java.js');
});

app.get('/java.js',function(req,res){
	res.sendFile(__dirname+'/java.js');
});

app.get('/login.js',function(req,res){
	res.sendFile(__dirname+'/login.js');
});

app.post('/addprizes',function(req,res){
	var eventid = req.body.eventid;
	var firstprize = req.body.firstprize;
	var secondprize = req.body.secondprize;
	var thirdprize = req.body.thirdprize;
	var data = {
		"errorcode":"0",
		"error":"Data added Successfully"
	};
	var n = 0;
	var query = "UPDATE results SET "
	if(eventid == 0)
	{
		data["errorcode"] = 1;
		data["error"] = "Please choose an event ID";
		res.json(data);
	}
	else if(!!firstprize.length||!!secondprize.length||thirdprize.length)
	{
		if(!!firstprize.length)
		{
			query = query+"firstprize="+connection.escape(firstprize);
			n=1;
		}
		if(!!secondprize.length)
		{
			if(n==0)
			{
				query = query + "secondprize="+connection.escape(secondprize);
				n++;
			}
			else
			{
				query = query + ",secondprize="+connection.escape(secondprize);
				n++;
			}
		}
		if(!!thirdprize.length)
		{
			if(n==0)
			{
				query = query + "thirdprize="+connection.escape(thirdprize);
				n++;
			}
			else
			{
				query = query + ",thirdprize="+connection.escape(thirdprize);
				n++;
			}
		}
		query = query + " WHERE eventid="+eventid;
		connection.query(query,function(err,rows,fields){
			if(!!err)
			{
				console.log(err);
				data["errorcode"] = 3;
				data["error"] = err.code;
			}
			res.json(data);
		});
	}
	else
	{
		data["errorcode"] = 2;
		data["error"] = "No data to be added";
		res.json(data);
	}
});

app.post('/login',function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	var data = {
		"success":false
	};
	if(username == "testing"&&password == "testing")
	{
		data.success = true;
	}
	res.json(data);
});