var firebaseConfig = {
    apiKey: "AIzaSyCHbEzy-cokPxKkYySVOIZMzeB3xlfmrvc",
    authDomain: "qcfirst-admin.firebaseapp.com",
    projectId: "qcfirst-admin",
    storageBucket: "qcfirst-admin.appspot.com",
    messagingSenderId: "785464221983",
    appId: "1:785464221983:web:88f87a8ad96cddd22a502a"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
function signIn() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value)
    .then((response) => {
        alert("Success");
        window.location.href = "admin-home.html";
    })
    .catch((error) => {
        if (error.code === 'auth/wrong-password') {
            alert("Incorrect password");
        }
        if (error.code === 'auth/user-not-found') {
            alert("You are not an admin");
        }
    })
}
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        var emailAddress = document.getElementById("admin-email");
        emailAddress.innerHTML = firebaseUser.email;
        console.log(firebaseUser.email);
    } else {
        // window.location.href = 'instr-signIn.html'
    }
})