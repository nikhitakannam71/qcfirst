var firebaseConfig = {
    apiKey: "AIzaSyBqDv2ClaYawwiiy4DBid_KU-L4uR1r99I",
    authDomain: "qcfirst-instructor.firebaseapp.com",
    databaseURL: "https://qcfirst-instructor-default-rtdb.firebaseio.com",
    projectId: "qcfirst-instructor",
    storageBucket: "qcfirst-instructor.appspot.com",
    messagingSenderId: "1017506719240",
    appId: "1:1017506719240:web:d1dae44709c9bb037d53bd"
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
            alert('Email is already registered. Redirecting you to Instructor Sign In page...');
            window.location.href = "instr-signIn.html";
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
        window.location.href = "instr-home.html";
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
        var cunyID = document.getElementById("instr-id");
        var emailAddress = document.getElementById("instr-email");
       
        cunyID.innerHTML = firebaseUser.uid;
        emailAddress.innerHTML = firebaseUser.email;

        console.log(firebaseUser.uid);
        console.log(firebaseUser.email);
    } else {
        // window.location.href = 'instr-signIn.html'
    }
})
var courseNum = 0;
function FetchAllData() {
    firebase.database().ref('courses').orderByKey().once('value', function(snapshot) {
        snapshot.forEach(
            function(ChildSnapshot) {
                let course_id = ChildSnapshot.key;
                let course_name = ChildSnapshot.child("/course_name").val();
                let capacity = ChildSnapshot.child("/capacity").val();
                let schedule = ChildSnapshot.child("/schedule").val(); 

                var ul = document.getElementById('course-list');
                var header = document.createElement('h2');

                var courseID = document.createElement("li");
                var courseName = document.createElement("li");
                var capacityData = document.createElement("li");
                var scheduleData = document.createElement("li");
                
                header.innerHTML = 'Courses - ' + (++courseNum);
                
                courseID.innerHTML = "Course ID: " + course_id;
                courseName.innerHTML = "Name: " + course_name;
                capacityData.innerHTML = "Capacity: " + capacity;
                scheduleData.innerHTML = "Schedule: " + schedule;

                ul.appendChild(header);
                ul.appendChild(courseID);
                ul.appendChild(courseName);
                ul.appendChild(capacityData);
                ul.appendChild(scheduleData);
            }
        );
    });
}
window.onload = FetchAllData();
function signOut() {
    firebase.auth().signOut();
    alert("Signed Out");
}

