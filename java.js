$(document).ready(function(){
	$.get('http://moodi.org/api/events',function(data){
		console.log("yo");
		console.log(data);
		for (var i = 0; i < data.length; i++) 
		{
			$('.eventdrop').append('<option value='+data[i].event_id+'>'+data[i].event_name+'</option>');
		}
	});
});