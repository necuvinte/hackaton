document.getElementById("currentLocation").addEventListener('click', getGeolocation);
document.getElementById("findLocation").addEventListener('click', findAddress);

function getGeolocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });

            var xhr = new XMLHttpRequest();
            xhr.open("POST", 'http://localhost:5000/location', true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.send(latitudine = position.coords.latitude);

        }, function() {
           console.log('Error!');
        });
    } else {
        // Browser doesn't support Geolocation
        console.log("Not supported");
    }
}

function findAddress(){
    var address = document.getElementById("address").value.split(' ').join('+');
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBMN28F6Ef-4HFF_E4yzZDHXfBUDDGehCQ";

     httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }

    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', url);
    httpRequest.send();
}

function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            console.log(JSON.parse(httpRequest.responseText).results[0].geometry.location);
        } else {
            alert('Va rugam sa alegeti o adresa valida');
        }
    }

}