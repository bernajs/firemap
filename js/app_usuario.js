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