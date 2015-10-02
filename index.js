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
console.log("Server listening on port 8000");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',function(req,res){
	res.sendFile(__dirname+'/result_upload.html');
	//res.sendFile(__dirname+'/java.js');
});

app.get('/java.js',function(req,res){
	res.sendFile(__dirname+'/java.js');
})

app.post('/addprizes',function(req,res){
	var eventid = req.body.eventid;
	var firstprize = req.body.firstprize;
	var secondprize = req.body.secondprize;
	var thirdprize = req.body.thirdprize;
	var data = {
		"errorcode":"0",
		"error":""
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
			console.log("a1");
			query = query+"firstprize="+connection.escape(firstprize);
			n=1;
		}
		if(!!secondprize.length)
		{
			console.log("a2");
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
			console.log("a3");
			console.log("a2");
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
		console.log(query);
		connection.query(query,function(err,rows,fields){
			if(!!err)
			{
				console.log(err);
				data["errorcode"] = 3;
				data["error"] = err.code;
				console.log(data);
				res.json(data);
			}
		});
	}
	else
	{
		data["errorcode"] = 2;
		data["error"] = "No data to be added";
		res.json(data);
	}
	/*if(!!eventid)//&&!!firstprize&&!!secondprize&&!!thirdprize)
	{
		var query2 = connection.query("UPDATE results SET firstprize=?,secondprize=?,thirdprize=? WHERE eventid=?",[firstprize,secondprize,thirdprize,eventid],function(err,rows,fields){
			console.log(err);
		});
	}*/
});