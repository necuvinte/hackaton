document.onload = function() {
    document.getElementById("currentLocation").addEventListener('click', getGeolocation);
    document.getElementById("findLocation").addEventListener('click', findAddress);
    var loading = document.getElementById('loading');

    function load(){
        if(loading.style.display === 'none'){
            loading.style.display = 'block';
        } else {
            loading.style.display = 'none'
        }

    }

    //functie pentru detectarea pozitiei prin gps
    function getGeolocation() {
        if (navigator.geolocation) {
            load();
            navigator.geolocation.getCurrentPosition(function (position) {


                //dupa ce coordonatele sunt gasite, se trimit la server
                var form = document.createElement('form');
                form.setAttribute('method', 'post');
                var url = 'http://localhost:5000/location?latitudine=' + position.coords.latitude + '&longitudine=' + position.coords.longitude;
                form.setAttribute('action', url);
                form.style.display = 'hidden';
                document.body.appendChild(form);
                form.submit();
                load();


            }, function () {
                alert('Ceva nu a mers cum trebuie, va rugam reincercati');
            });
        } else {
            // Browser doesn't support Geolocation
            console.log("Not supported");
        }
    }

    //functie pentru detectarea geolocatiei prin search
    function findAddress() {
        var address = document.getElementById("address").value.split(' ').join('+');
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyA6A3o1rZHBJU8ZcJHc-rDc2oOLb3Mu7gY";

        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        if (address) {
            httpRequest.onreadystatechange = alertContents;
            httpRequest.open('GET', url);
            httpRequest.send();
        }
    }

    function alertContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {

                //aduna informatia
                var latitude = JSON.parse(httpRequest.responseText).results[0].geometry.location.lat;
                var longitude = JSON.parse(httpRequest.responseText).results[0].geometry.location.lng;

                //trimite informatia la server prin POST
                var form = document.createElement('form');
                form.setAttribute('method', 'post');
                var url = 'http://localhost:5000/location?latitudine=' + latitude + '&longitudine=' + longitude;
                form.setAttribute('action', url);
                form.style.display = 'hidden';
                document.body.appendChild(form);
                console.log(url);
                form.submit();
            } else {
                alert('Va rugam sa alegeti o adresa valida');
            }
        }

    }
}();
