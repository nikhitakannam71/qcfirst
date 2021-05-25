// For Mobile Optimization
const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];
toggleButton.addEventListener("click", () => {
    navbarLinks.classList.toggle("active")
})
// Sign Up Form Validationa
const form = document.getElementById('align');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const emailAddress = document.getElementById('email-address');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm-pass');
const errorMsg = document.getElementById('error');
form.addEventListener('submit', (e) => {
    let somethingIDK = new Array();
    if (firstName.value === '' || firstName.value == null) {
        firstName.style.setProperty('border', '2px solid red');
        somethingIDK.push('Please enter your First Name')
    }    

    if (lastName.value === "" || lastName.value == null) {
        lastName.style.setProperty('border', '2px solid red');
        somethingIDK.push('Please enter your Last Name');
    }

    const emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
    if (!emailValid.test(emailAddress.value)) {
        emailAddress.style.setProperty('border', '2px solid red');
        somethingIDK.push('Please enter a valid Email')
    } 
    
    if (password.value.length <= 6) {
        password.style.setProperty("border", "2px solid red");
        somethingIDK.push('Password must be longer than 6 characters')
    }
    
    if (confirm.value !== password.value) {
        confirm.style.setProperty("border", "2px solid red");
        password.style.setProperty("border", "2px solid red");
        somethingIDK.push("Password and confirmation password don't match");
    }

    if (somethingIDK.length > 0) {
        e.preventDefault();
        errorMsg.innerText = somethingIDK.join(', ');
    }
    
    if (courseId.value.length > 5) {
        courseId.style.setProperty('border', '2px solid red');
        somethingIDK.push("Course ID should be less than 5 numbers")
    }

    if (capacity.value.length < 10) {
        capacity.style.setProperty('border', '2px solid red');
        somethingIDK.push("The class capacity should be at least 10")
    }

    if (instructor.value === '' || instructor.value == null) {
        instructor.style.setProperty('border', '2px solid red');
        somethingIDK.push('Please enter your name')
    } 

    if (department.value === '' || department.value == null) {
        department.style.setProperty('border', '2px solid red');
        somethingIDK.push('Please enter a department')
    } 

    if (description.value === '' || description.value == null) {
        description.style.setProperty('border', '2px solid red');
        somethingIDK.push('Please enter a course description')
    }
})
// Show Password Function
function showPass() {
    let pass = document.getElementById("password");
    let passConfirm = document.getElementById("confirm-pass");
    if (pass.type === "password" || passConfirm === "confirm-pass") {
        pass.type = "text";
        passConfirm.type = "text";
    } else {
        pass.type = "password";
        passConfirm.type = "password";
    }
}
// Check Form Validations
$('.check').change(function() {
    var firstName = $('#first-name').val();
    var lastName = $('#last-name').val();
    var email = $('#email-address').val();
    var password = $('#password').val();
    var confirm = $('#confirm-pass').val();

    if (firstName == '' || lastName == '' || email == '' || password == '' || confirm == "" || password != confirm) {
        $('#signIn').attr('disabled', 'disabled');
    } else {
        $('#signIn').removeAttr('disabled');
    }
});
// Create/Remove Firebase Realtime Databases
const courseId = document.getElementById('id');
const courseName = document.getElementById('course-name');
const semester = document.getElementById('semester');
const department = document.getElementById('department');
const instructor = document.getElementById('instructor');
const description = document.getElementById('desc');
const capacity = document.getElementById('cap');
const schedule = document.getElementById('schedule');
const deadline = document.getElementById('enroll');
const create = document.getElementById('create-course');
const remove = document.getElementById('delete-course');
const database = firebase.database();
const rootRef = database.ref('courses');
create.addEventListener('click', (e) => {
    e.preventDefault();
    rootRef.child(courseId.value).set({
        course_name: courseName.value,
        semester: semester.value,
        department: department.value,
        instructor: instructor.value,
        description: description.value,
        capacity: capacity.value,
        schedule: schedule.value,
        deadline: deadline.value
    });
    window.location.href = "management.html";
});
remove.addEventListener('click', e => {
    e.preventDefault();
    rootRef.child(courseId.value).remove()
    .then(() => {
        window.alert("Course has been deleted from database");
    })
    .catch(error => {
        console.error(error);
    })
})

/*
Code Resource Links:
https://www.codespot.org/javascript-email-validation/
https://www.w3schools.com/howto/howto_css_searchbar.asp
https://firebase.google.com/docs/auth/android/manage-users#get_a_users_profile
https://firebase.google.com/docs/reference/js/firebase.auth.Auth#fetchSignInMethodsForEmail
https://firebase.google.com/docs/auth/web/manage-users
https://www.geeksforgeeks.org/how-to-disable-a-button-in-jquery-dialog-from-a-function/ 
*/
