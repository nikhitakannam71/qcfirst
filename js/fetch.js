var studentNum = 0;
function FetchAllData() {
    firebase.database().ref('students').orderByKey().once('value', function(snapshot) {
        snapshot.forEach(
            function(ChildSnapshot) {
                let last_name = ChildSnapshot.key;
                let first_name = ChildSnapshot.child("/first_name").val();
                let email_address = ChildSnapshot.child("/email_address").val();

                var ul = document.getElementById('students-list');
                var header = document.createElement('h2');

                var lastName = document.createElement("li");
                var firstName = document.createElement("li");
                var email = document.createElement("li");
                
                header.innerHTML = 'Students - ' + (++studentNum);
                
                lastName.innerHTML = "Last Name: " + last_name;
                firstName.innerHTML = "First Name: " + first_name;
                email.innerHTML = "Email: " + email_address;
                
                ul.appendChild(header);
                ul.appendChild(lastName);
                ul.appendChild(firstName);
                ul.appendChild(email);
            }
        );
    });
}
window.onload = FetchAllData();
var instrNum = 0;
function FetchAllInstr() {
    firebase.database().ref('instructors').orderByKey().once('value', function(snapshot) {
        snapshot.forEach(
            function(ChildSnapshot) {
                let last_name = ChildSnapshot.key;
                let first_name = ChildSnapshot.child("/first_name").val();
                let email_address = ChildSnapshot.child("/email_address").val();

                var ul = document.getElementById('instr-list');
                var header = document.createElement('h2');

                var lastName = document.createElement("li");
                var firstName = document.createElement("li");
                var email = document.createElement("li");
                
                header.innerHTML = 'Instructor - ' + (++instrNum);
                
                lastName.innerHTML = "Last Name: " + last_name;
                firstName.innerHTML = "First Name: " + first_name;
                email.innerHTML = "Email: " + email_address;
                
                ul.appendChild(header);
                ul.appendChild(lastName);
                ul.appendChild(firstName);
                ul.appendChild(email);
            }
        );
    });
}
window.onload = FetchAllInstr();