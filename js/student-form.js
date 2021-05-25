 var firebaseConfig = {
    apiKey: "AIzaSyAxG5BNasmBDW4DQhgvk4E5Kar4mtSWmsc",
    authDomain: "qcfirst-register.firebaseapp.com",
    databaseURL: "https://qcfirst-register-default-rtdb.firebaseio.com",
    projectId: "qcfirst-register",
    storageBucket: "qcfirst-register.appspot.com",
    messagingSenderId: "993705978903",
    appId: "1:993705978903:web:8d1a5bbff5b8d192324052"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
function signUp() {
    var email = document.getElementById("email-address");
    var firstname = document.getElementById("first-name");
    var lastname = document.getElementById("last-name");
    var password = document.getElementById("password");
    var confirm = document.getElementById("confirm-pass");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value)
    .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
            alert('Email is already registered. Redirecting you to Student Sign In page...');
            window.location.href = "student-signIn.html";
            return;
        }
    })
}
function signIn() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value)
    .then((response) => {
        alert("Success");
        window.location.href = "student-home.html";
    })
    .catch((error) => {
        if (error.code === 'auth/wrong-password') {
            alert("Incorrect password");
        }
        if (error.code === 'auth/user-not-found') {
            alert("User not found");
        }
    })
}
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        var studentName = document.getElementById("student-name");
        var cunyID = document.getElementById("student-id");
        var emailAddress = document.getElementById("student-email");
        var firstname = document.getElementById("first-name");
        var lastname = document.getElementById("last-name");
       
        studentName.innerHTML = firebaseUser.displayName;
        cunyID.innerHTML = firebaseUser.uid;
        emailAddress.innerHTML = firebaseUser.email;

        console.log(firebaseUser.uid);
        console.log(firebaseUser.displayName);
        console.log(firebaseUser.email);
    } else {
        // window.location.href = 'instr-signIn.html'
    }
})
function signOut() {
    auth.signOut();
    alert("Signed Out");
}
