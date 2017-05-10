function loginFb() {
    var provider = new firebase
        .auth
        .FacebookAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            alert('Hola ' + user);
            localStorage.setItem('uid', user.uid);
            setUser(user);
            location.href = "mapa.html";
        })
        .catch(function (error) {
            alert(error.message);
        });
}

function loginTw() {
    var provider = new firebase
        .auth
        .TwitterAuthProvider();

    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
            var token = result.credential.accessToken;
            var secret = result.credential.secret;
            var user = result.user;
            alert('Hola ' + user.displayName);
            localStorage.setItem('uid', user.uid);
            setUser(user);
            location.href = "home.html";
        })
        .catch(function (error) {
            alert(error.message);
        });
}
function initMap() {}
function setUser(user) {
    var usuario = new Object();
    usuario.name = user.displayName;
    usuario.email = user.email;
    usuario.picture = 'google.com';

    localStorage.setItem('usuario', JSON.stringify(usuario));
}