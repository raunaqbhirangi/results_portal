var eventid,firstprize;
$(document).ready(function()
{
	$.get('http://moodi.org/api/events',function(data){
		//console.log("yo");
		for (var i = 0; i < data.data.length; i++) 	
		{
			$('#eventdrop').append('<option value='+data.data[i].event_id+'>'+data.data[i].event_name+'</option>');
			console.log(data.data[i].event_name);
		}
	});
	$('#submit').click(function(){
		eventid = $("#eventdrop option:selected").val();
		firstprize = $("#first").val();
		secondprize = $("#second").val();
		thirdprize = $("#third").val();
		var send_data = "eventid="+eventid+"&firstprize="+firstprize+"&secondprize="+secondprize+"&thirdprize="+thirdprize;
		$.post("/addprizes",send_data,function(data){
			console.log(data);
		})
	})
});