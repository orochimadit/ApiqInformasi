function myMap(latlongit){
    google.maps.visualRefresh = true;
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var data = new google.maps.LatLng(latlongit);
    var map = new google.maps.Map(document.getElementById('peta'), {
    zoom:7,
    center : data,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    directionsDisplay.setMap(map);

    //directionsDisplay.setPanel(document.getElementById('panel'));

    console.log(latlongit);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);}
    else {
      alert('geolocation not supported');
    }
 
    function success(position) {
      //alert(position.coords.latitude + ', ' + position.coords.longitude);
      var request = {
           origin: position.coords.latitude + ', ' + position.coords.longitude, 
           destination: latlongit,//tempat dituju
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
}