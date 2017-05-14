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

    //should map the data received to DOM elements
    function mapResponse(parent, array){
        if(results.hasChildNodes()){
            results.removeChild(results.childNodes[0]);
        }
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


                axios.post('/location', {
                    latitudine: position.coords.latitude,
                    longitudine:position.coords.longitude
                }).then(function(response){

                    console.log(response);
                    mapResponse(results, response.data);

                });
                load();

            }, function () {
                  alert("Ceva nu a mers cum trebuie, va rugam reincercati")
            });
        } else {
            // Browser doesn't support Geolocation
            alert('Browserul tau nu suporta Geolocatie');
        }
    }

    //functie pentru detectarea geolocatiei prin search
    function findAddress() {
        var address = document.getElementById("address").value.split(' ').join('+');
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyA6A3o1rZHBJU8ZcJHc-rDc2oOLb3Mu7gY";
        load()

        axios.get(url).then(function(response){
            latitudine = response.data.results[0].geometry.location.lat;
            longitudine = response.data.results[0].geometry.location.lng;
            axios.post('/location', {
                latitudine: latitudine,
                longitudine: longitudine
            }).then(function(response){

                mapResponse(results, response.data);
                load()
            });
        })

    }


}();
