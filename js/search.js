var courseNum = 0;
function FetchAllData() {
    firebase.database().ref('courses').orderByKey().once('value', function(snapshot) {
        snapshot.forEach(
            function(ChildSnapshot) {
                $("#search-bar").keyup(function () {
                    var searchField = $("#search-bar").val();
                    // var myExp = new RegExp(searchField, "i");
                    let course_id = ChildSnapshot.key;
                    let course_name = ChildSnapshot.child("/course_name").val();
                    var ul = document.getElementById('update');
                    var header = document.createElement('h2');
                    var courseID = document.createElement("li");
                    var courseName = document.createElement("li");
                    header.innerHTML = 'Course(s) Found';
                    courseID.innerHTML = "Course ID: " + course_id;
                    courseName.innerHTML = "Name: " + course_name;
                    if (searchField == course_id || searchField == course_name) {
                        ul.appendChild(header);
                        ul.appendChild(courseID);
                        ul.appendChild(courseName);
                    } 
                    if (searchField.length == 0) {
                        ul.innerHTML = "";
                    }
                });   
            }
        );
    });
}
window.onload = FetchAllData();

function addItem(){
    var li = document.createElement("li");  
    var input = document.getElementById("enroll-course");
    li.innerHTML = input.value;
    input.value = "";
    document.getElementById("student-courses").appendChild(li);
}