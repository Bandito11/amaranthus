function subscribe() {
    var newsletter = document.getElementById('newsletter');
    var validated = validateEmail(newsletter.value);
    validated ? insertEmail(newsletter.value) : alert('Not a valid email! A correct email would be something akin to: myemail@host.com');
}
function insertEmail(email) {
    firebase.database().ref('/email').push().set({
        email: email
    });
    alert('Thank you for signing! We will keep you updates on news about the app release! Have a good day!');
}
;
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}
function initialize() {
    var config = {
        apiKey: "AIzaSyAshjQFsMd3xTn_lmysPh3-8BWzBwPYVsQ",
        authDomain: "central-list-190609.firebaseapp.com",
        databaseURL: "https://central-list-190609.firebaseio.com",
        projectId: "central-list-190609",
        storageBucket: "central-list-190609.appspot.com",
        messagingSenderId: "45019366492"
    };
    firebase.initializeApp(config);
}
initialize();
