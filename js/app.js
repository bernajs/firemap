const userOnline = database.ref('users/' + localStorage.getItem('uid'));
const status = userOnline.child('status');
const servicio = userOnline.child('servicio');
var usuario = JSON.parse(localStorage.getItem('usuario'));
navigator
    .geolocation
    .getCurrentPosition(function (position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        usuario.pos = pos;
        userOnline.set(usuario);
        status.set('connected');
        status
            .onDisconnect()
            .remove();

        servicio.set('free');
        servicio
            .onDisconnect()
            .remove();
    });

function getConnected() {
    var leadsRef = database
        .ref('users')
        .orderByChild('status')
        .equalTo('connected')
        .on('value', function (snapshot) {
            $('.usuarios').html('');
            deleteMarkers();
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                if (childData.servicio == 'free') {
                    $('.usuarios').append('<li class="list-group-item">' + childData.name + '</li>');
                    addMarker(childData.pos);
                }
            });
        });
}

database
    .ref('users/' + localStorage.getItem('uid'))
    .orderByChild('servicio')
    .on('value', function (snapshot) {
        var childData = snapshot.val();
        if (childData.servicio == 'pending') {
            if (confirm('Hay un nuevo servicio ')) {
                $('.row').append('<button onclick="terminarServicio()" class="btn btn-danger">Terminar servicio</b' +
                        'utton>');
                aceptarServicio(snapshot.key, 'busy');
            } else {
                aceptarServicio(snapshot.key, 'free');
            }
        }
    });


function terminarServicio() {
    database.ref('users/' + localStorage.getItem('uid') + '/servicio').set('free');
    $('button').hide();
}

function aceptarServicio(key, status) {
    database
        .ref('users/' + key + '/servicio')
        .set(status);
}
