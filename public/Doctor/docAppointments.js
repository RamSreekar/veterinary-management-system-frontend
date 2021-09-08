var today = new Date();
if((today.getMonth()+1) < 10){
    var mth = "0"+(today.getMonth()+1);
}
else{
    var mth = ""+(today.getMonth()+1);
}
if((today.getDate()) < 10){
    var dt = "0"+today.getDate();
}
else{
    var dt = ""+today.getDate();
}


var date1 = today.getFullYear()+'-'+mth+'-'+ dt;

document.getElementById("datepicker").value=date1;
getAppts()
function getAppts(){
    let date = document.getElementById("datepicker").value

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"date":date});

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(api+"datewise_appointments", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        document.getElementById("allCards").innerHTML=""
        document.getElementById("spinner").style.display="none"
        if(result.status == 200){
            console.log(result.appointments)
            Object.keys(result.appointments).forEach(function(key) {
                // console.log(result.appointments[key].appointment_status)
                // if
                document.getElementById("allCards").innerHTML+=`<div class="card" style="background-color: rgba(75,181,67, 0.2);">
                <div class="card-body">
                    <div class="d-flex my-2">
                        <label for="name" class="col-sm-12 col-md-1 col-form-label">Name:</label>
                        <div class="col-sm-12 col-md-5">
                            <input type="text" readonly class="form-control" id="name${result.appointments[key].appId}" value="${result.appointments[key].fullname}">
                        </div>
                        <label for="email" class="col-sm-12 col-md-1 col-form-label">Email:</label>
                        <div class="col-sm-12 col-md-5">
                            <input type="text" readonly class="form-control" id="email${result.appointments[key].appId}" value="${result.appointments[key].email}">
                        </div>
                    </div>
                    <div class="d-flex my-2">
                        <label for="date" class="col-sm-12 col-md-1 col-form-label">Date:</label>
                        <div class="col-sm-12 col-md-5">
                            <input type="text" readonly class="form-control" id="date${result.appointments[key].appId}" value="${result.appointments[key].date}">
                        </div>
                        <label for="time" class="col-sm-12 col-md-1 col-form-label">Time:</label>
                        <div class="col-sm-12 col-md-5">
                            <input type="text" readonly class="form-control" id="time${result.appointments[key].appId}" value="${result.appointments[key].timeslot}">
                        </div>
                    </div>
                    <div class="d-flex my-3">
                        <label for="petName" class="col-sm-12 col-md-2 col-form-label">Pet Name:</label>
                        <div class="col-sm-12 col-md-4">
                            <input type="text" readonly class="form-control" id="petName${result.appointments[key].appId}" value="${result.appointments[key].petname}">
                        </div>
                    </div>
                    <div class="d-flex my-3">
                        <label for="symptoms" class="col-sm-12 col-md-2 col-form-label">Symptoms:</label>
                        <div class="col-sm-12 col-md-10">                        
                            <textarea class="form-control" id="symptoms${result.appointments[key].appId}" disabled rows="3">${result.appointments[key].symptoms}</textarea>
                        </div>
                    </div>
                    <div class="d-flex my-3">
                        <label for="symptoms" class="col-sm-12 col-md-2 col-form-label">Status:</label>
                        <div class="col-sm-12 col-md-4">
                            <input type="text" readonly class="form-control-plaintext" id="status${result.appointments[key].appId}" value="${(result.appointments[key].appointment_status)?"Completed":"Pending"}">
                        </div>
                    </div>
                    <div class="justify-content-center" style="display: none;" id="spinner1${result.appointments[key].appId}">
                        <div class="spinner-border text-success"></div>
                    </div>
                    <div class="row d-flex my-3">
                        <button class="m-auto col-md-6 mx-3 col-sm-11 btn btn-success" id="complete${result.appointments[key].appId}" data-appId="${result.appointments[key].appId}" onclick="markAsComplete(this.id)">Mark as complete</button>                    
                        <button class="m-auto col-md-5 mx-3 col-sm-11 btn btn-success" id="cancel${result.appointments[key].appId}" data-appId="${result.appointments[key].appId}" onclick="cancelAppt(this.id)">Cancel appointment</button>
                    </div>
    
              </div>`

              if( result.appointments[key].appointment_status==1){
                //   console.log("xx")
                  document.getElementById("complete"+result.appointments[key].appId).disabled=true
              }
            });
        }
        else if(result.status==202){
            document.getElementById("allCards").innerHTML=result.msg
        }
    })
    .catch(error => console.log('error', error));
}

function markAsComplete(id){
    let appId = document.getElementById(id).getAttribute("data-appId");
    document.getElementById("spinner1"+appId).style.display="flex"
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"appId":appId});

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(api+"update_app_status", requestOptions)
    .then(response => response.json())
    .then(result => {
        
        document.getElementById("spinner1"+appId).style.display="none"
        console.log(result)
        if(result.status==200){
            alert("Appointment successfully marked as complete!")
            location.reload()
            // document.getElementById(id).disabled = true
        }
        else{
            alert("Could not change status!")
        }
    })
    .catch(error => console.log('error', error));
}


function cancelAppt(id){
    let appId = document.getElementById(id).getAttribute("data-appId");
    document.getElementById("spinner1"+appId).style.display="flex"
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"appId":appId});

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(api+"cancel_appointment", requestOptions)
    .then(response => response.json())
    .then(result => {
        
        document.getElementById("spinner1"+appId).style.display="none"
        console.log(result)
        if(result.status==200){
            alert("Appointment successfully cancelled!")
            location.reload()
            // document.getElementById(id).disabled = true
        }
        else{
            alert("Could not change status!")
        }
    })
    .catch(error => console.log('error', error));
}