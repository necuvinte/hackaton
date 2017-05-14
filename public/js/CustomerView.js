document.onload = function() {
    document.getElementById("currentLocation").addEventListener('click', getGeolocation);
    document.getElementById("findLocation").addEventListener('click', findAddress);
    var loading = document.getElementById('loading');
    var results = document.getElementById('results');

    function load(){
        if(loading.style.display === 'none'){
            loading.style.display = 'block';
        } else {
            loading.style.display = 'none'
        }

    }

    //should transform the data received into DOM elements
    function mapResponse(parent, array){
        array.map( function(contact){
            var div = document.createElement('div');
            div.classList.add('content');
            var list = document.createElement('ol');
            if(contact.hasOwnProperty('JUDET') && contact['JUDET']){
                var item = document.createElement('li');
                item.appendChild(document.createTextNode('Nume: ' + contact['JUDET']));
                item.classList.add('red-small');
                list.appendChild(item);
                var hr = document.createElement('hr');
                hr.classList.add('col-xs-offset-2');
                list.appendChild(hr);
            }
            if(contact.hasOwnProperty('TELEFON') && contact['TELEFON']){
                var item = document.createElement('li');
                item.appendChild(document.createTextNode('Telefon: ' + contact['TELEFON']));
                item.classList.add('red-small');
                list.appendChild(item);
                var hr = document.createElement('hr');
                hr.style.align = 'left';
                list.appendChild(hr);
            }
            if(contact.hasOwnProperty('E-MAIL') && contact['E-MAIL']){
                var item = document.createElement('li');
                item.appendChild(document.createTextNode('E-mail: ' + contact['E-MAIL']));
                item.classList.add('red-small');
                list.appendChild(item);
                var hr = document.createElement('hr');
                hr.style.align = 'left';
                list.appendChild(hr);
            }
            if(contact.hasOwnProperty('ADRESA') && contact['ADRESA']){
                var item = document.createElement('li');
                item.appendChild(document.createTextNode('Adresa: ' + contact['ADRESA']));
                item.classList.add('red-small');
                list.appendChild(item);
                var hr = document.createElement('hr');
                hr.style.align = 'left';
                list.appendChild(hr);
            }
            if(contact.hasOwnProperty('SERVICII') && contact['SERVICII']){
                var item = document.createElement('li');
                item.appendChild(document.createTextNode('Servicii: ' + contact['SERVICII']));
                item.classList.add('red-small');
                list.appendChild(item);
                var hr = document.createElement('hr');
                hr.style.align = 'left';
                list.appendChild(hr);
            }

            div.appendChild(list);
            parent.appendChild(div);
        });


    }



    //functie pentru detectarea pozitiei prin gps
    function getGeolocation() {
        if (navigator.geolocation) {
            load();
            navigator.geolocation.getCurrentPosition(function (position) {


                //dupa ce coordonatele sunt gasite, se trimit la server
                // var form = document.createElement('form');
                // form.setAttribute('method', 'post');
                // var url = 'http://localhost:5000/location?latitudine=' + position.coords.latitude + '&longitudine=' + position.coords.longitude;
                // form.setAttribute('action', url);
                // form.style.display = 'hidden';
                // document.body.appendChild(form);
                // form.submit();
                axios.post('/location', {
                    latitudine: position.coords.latitude,
                    longitudine:position.coords.longitude
                }).then(function(response){

                    console.log(response);
                    mapResponse(results, response.data);
                    // response.data.map(contact => {
                    //     var paragraph = document.createElement('p');
                    //
                    //     results.appendChild(paragraph);
                    // })
                });
                load();


            }, function () {
                alert('Ceva nu a mers cum trebuie, va rugam reincercati');
            });
        } else {
            // Browser doesn't support Geolocation
            load();
            axios.get('https://ipinfo.io/geo').then(function (response) {
                var loc = response.loc.split(',');
                axios.post('location', {
                    latitudine: loc[0],
                    longitude: loc[1]
                }).then(function(response){
                    mapResponse(results, response.data);
                });
            })

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
