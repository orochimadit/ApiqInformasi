<script type="text/javascript"> 
   var directionsService = new google.maps.DirectionsService();
     var directionsDisplay = new google.maps.DirectionsRenderer();

     var map = new google.maps.Map(document.getElementById('map'), {
       zoom:7,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     });

     directionsDisplay.setMap(map);
	 
     directionsDisplay.setPanel(document.getElementById('panel'));
	 
	 
   if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  alert('geolocation not supported');
}

function success(position) {
  //alert(position.coords.latitude + ', ' + position.coords.longitude);
  var request = {
       origin: position.coords.latitude + ', ' + position.coords.longitude, 
       destination: 'bandung',//abcd,//'Bandung',
       travelMode: google.maps.DirectionsTravelMode.DRIVING
     };
     directionsService.route(request, function(response, status) {
       if (status == google.maps.DirectionsStatus.OK) {
         directionsDisplay.setDirections(response);
		 //alert(posisiseksarang);
       }else{
		alert("Lintas Lautan bro");
	   }
     });
}

function error(msg) {
  alert('error: ' + msg);
}
   