var config = {
    apiKey: "AIzaSyCVnF1OOb0sxSYn0VyVHqSSeu0E8zXtW4U",
    authDomain: "test-e339a.firebaseapp.com",
    databaseURL: "https://test-e339a.firebaseio.com",
    projectId: "test-e339a",
    storageBucket: "test-e339a.appspot.com",
    messagingSenderId: "408235569660"
};

var usuario = new Object();
var posxy;

firebase.initializeApp(config);

var database = firebase.database();

function getCategories() {
    // var leadsRef = database.ref('categories'); leadsRef.on('value', function
    // (snapshot) {     $('.usuarios').html('');     deleteMarkers();
    // snapshot.forEach(function (childSnapshot) {         var childData =
    // childSnapshot.val();         $('#categoria').append(` <div class="col-xs-6
    // col-md-3"><a href="categoria.html?id=` + childSnapshot.key + `"
    // class="thumbnail">         <img
    // src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLT
    // g
    // iIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3Zn
    // I
    // iB3aWR0aD0iMjc4IiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDI3OCAxODAiIHByZXNlcnZlQX
    // N
    // wZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MTgwCkNyZWF0
    // Z
    // WQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQ
    // o
    // oYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48
    // c
    // 3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTViZDU0ODAyMzMgdGV4dCB7IG
    // Z
    // pbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2Es
    // I
    // E9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxNHB0IH0gXV0+PC9zdH
    // l
    // sZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNWJkNTQ4MDIzMyI+PHJlY3Qgd2lkdGg9IjI3OCIgaGVp
    // Z
    // 2h0PSIxODAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxMDEuMzA0Njg3NSIgeT0iOTYuMy
    // I +Mjc4eDE4MDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==" alt="...">         <strong">` +
    // childData.name + `</strong>         </a>         </div>`);
    // $('.usuarios').append('<li class="list-group-item">' + childData.name +
    // '</li>');         addMarker(childData.coords);     }); });
}
const userOnline = database.ref('users/' + localStorage.getItem('uid'));
const objOnline = userOnline.child('status');
objOnline.set('connected');
objOnline
    .onDisconnect()
    .remove();

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
                console.log(childData);
                if (childData.servicio == 'free') {
                    $('.usuarios').append('<li class="list-group-item">' + childData.name + '</li>');
                    addMarker(childData.pos);
                } else {
                    // if (childData.servicio == 'pending') {     if (confirm('Hay un nuevo servicio
                    // ')) {         aceptarServicio(childSnapshot.key, 'busy');     } else {
                    // aceptarServicio(childSnapshot.key, 'free');     } }
                }
            });
        });
}

console.log(localStorage.getItem('uid'));
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

// // function auth(status) { firebase     .auth() .onAuthStateChanged(function
// (user) {         if (user) { usuario.name = user.displayName; usuario.email =
// user.email;        usuario.picture = 'google.com';  usuario.status =
// 'connected';             usuario.servicio = 'free'; getLocation();  if
// (navigator.geolocation) { navigator         .geolocation
// .getCurrentPosition(function (position) {          var pos = { lat:
// position.coords.latitude,          lng: position.coords.longitude      };
// usuario.pos = pos; localStorage.setItem('uid', user.uid); database
// .ref('users/' + user.uid) .set(usuario);      }); }         } else { //No
// user is signed in.         }     }); // }

function solicitarServicio() {
    var leadsRef = database
        .ref('users')
        .orderByChild('servicio')
        .equalTo('free')
        .once('value', function (snapshot) {
            snapshot
                .forEach(function (element) {
                    database
                        .ref('users/' + element.key + '/servicio')
                        .set('pending');
                });
        });
}

function aceptarServicio(key, status) {
    console.log(key);
    database
        .ref('users/' + key + '/servicio')
        .set(status);
}

// database     .ref('.info/connected')     .on('value', function
// (connectedSnap) {         if (connectedSnap.val() === true) {             /*
// we're connected! */             auth(true); console.log('connected'); } else
// {             auth(false);   console.log('disconnected');/* we're
// disconnected! */         }     });