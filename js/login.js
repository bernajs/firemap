function loginFb() {
    var provider = new firebase
        .auth
        .FacebookAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook
            // API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            alert('Hola ' + user);
            localStorage.setItem('uid', user.uid);
            location.href = "mapa.html";
        })
        .catch(function (error) {
            // Handle Errors here.
            console.log(error);
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            alert(errorMessage);
            // ...
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
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret. You can use
            // these server side with your app's credentials to access the Twitter API.
            var token = result.credential.accessToken;
            var secret = result.credential.secret;
            // The signed-in user info.
            var user = result.user;
            alert('Hola ' + user.displayName);
            localStorage.setItem('uid', user.uid);
            location.href = "mapa.html";
            // ...
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            alert(errorMessage);
            // ...
        });
}