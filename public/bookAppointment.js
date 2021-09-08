document.getElementById("name").value=localStorage.getItem("name");
document.getElementById("name").disabled=true;
document.getElementById("email").value=localStorage.getItem("email");
document.getElementById("email").disabled=true;
let userType = localStorage.getItem("userType");
let dateSelect = document.getElementById("dates");
let timeSelect = document.getElementById("timeslots");

var today = new Date();

var date1 = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

// console.log(date1)
var nextDay = new Date(today);
nextDay.setDate(today.getDate() + 1);
if((nextDay.getMonth()+1) < 10){
    var m = "0"+(nextDay.getMonth()+1);
}
else{
    var m = ""+(nextDay.getMonth()+1);
}
if((nextDay.getDate()) < 10){
    var d = "0"+nextDay.getDate();
}
else{
    var d = ""+nextDay.getDate();
}
var date2 = nextDay.getFullYear()+'-'+m+'-'+ d;

// console.log(date2);

var nextDay1 = new Date(nextDay);
nextDay1.setDate(nextDay.getDate() + 1);
if((nextDay1.getMonth()+1) < 10){
    var m1 = "0"+(nextDay1.getMonth()+1);
}
else{
    var m1 = ""+(nextDay1.getMonth()+1);
}
if((nextDay1.getDate()) < 10){
    var d1 = "0"+nextDay1.getDate();
}
else{
    var d1 = ""+nextDay1.getDate();
}
var date3 = nextDay1.getFullYear()+'-'+m1+'-'+ d1;

// var nextDay2 = new Date(nextDay1);
// nextDay2.setDate(nextDay.getDate() + 1);
// if((nextDay2.getMonth()+1) < 10){
//     var m2 = "0"+(nextDay2.getMonth()+1);
// }
// else{
//     var m2 = ""+(nextDay2.getMonth()+1);
// }
// var date3 = nextDay2.getFullYear()+'-'+m2+'-'+ nextDay2.getDate();
// console.log(date1, date2, date3)


dateSelect.innerHTML="<option value='Not selected' selected disabled hidden>--Select--</option>"+"<option value='"+date2+"'>"+date2+"</option>"+
"<option value='"+date3+"'>"+date3+"</option>"


function getTimeSlots(){
    
    document.getElementById("spinner").style.display="flex"
    let selectedDate= dateSelect.value;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"date":selectedDate});

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(api+"available_slots", requestOptions)
    .then(response => response.json())
    .then(result => {
        
        document.getElementById("spinner").style.display="none"
        if(result.status == 200){
            timeSelect.disabled=false;
            timeSelect.innerHTML="<option value='Not Selcted' disabled hidden>--Select--</option>";

            Object.keys(result.available).forEach(function(key) {
                if(!result.available[key]){
                    timeSelect.innerHTML+="<option value='"+key+"'>"+key+"</option>"
                }
            });
        }
        else{
            alert("Error fetching time slots! Please try agian later")
        }
    })
    .catch(error => console.log('error', error));
}

function book(event){
    event.preventDefault()
    document.getElementById("spinner").style.display="flex"
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let petName = document.getElementById("petName").value;
    let phno = document.getElementById("phno").value;
    let symptoms = document.getElementById("symptoms").value;
    let userId = localStorage.getItem("userId");
    let animal = document.getElementById("animal").value;
    console.log(animal)
    let dt = dateSelect.value;
    let ts = timeSelect.value;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"fullname":name, "email":email, "userId":userId, "phno":phno, "animal":animal, "petname":petName, "date":dt, "timeslot":ts, "symptoms":symptoms});

    // fullname, email, userId, phno, petname, date, timeslot, symptoms
    console.log(raw)

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(api+"book_appointment", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        document.getElementById("spinner").style.display="none"
        if(result.status==200){
            alert("Appointment successfully booked!")
            location.href="viewAppointments.html"
        }
        else{
            alert("An error occurred!Please try again later")
        }
    })
    .catch(error => console.log('error', error));
}
