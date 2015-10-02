var eventid,firstprize,secondprize,thirdprize,username,password;
$(document).ready(function()
{
	$('#upload_page').hide();
	$('.login_errors').hide();
	$.get('http://moodi.org/api/events',function(data){
		//console.log("yo");
		for (var i = 0; i < data.data.length; i++) 	
		{
			$('#eventdrop').append('<option value='+data.data[i].event_id+'>'+data.data[i].event_name+'</option>');
			//console.log(data.data[i].event_name);
		}
	});
	$('#submit').click(function(){
		eventid = $("#eventdrop option:selected").val();
		firstprize = $("#first").val();
		secondprize = $("#second").val();
		thirdprize = $("#third").val();
		var send_data = "eventid="+eventid+"&firstprize="+firstprize+"&secondprize="+secondprize+"&thirdprize="+thirdprize;
		$.post("/addprizes",send_data,function(data){
			//console.log(data);
			$('.upload_errors').text(data.error);
		});
	});
	$('#login').click(function(){
		username = $("#username").val();
		password = $("#password").val();
		var send_data = "username="+username+"&password="+password;
		$.post("/login",send_data,function(data){
			//console.log(data);
			if(data.success == true)
			{
				$('#login_page').hide();
				$('#upload_page').show();
			}
			else{
				$('.login_errors').show();
			}
		});
	});
});