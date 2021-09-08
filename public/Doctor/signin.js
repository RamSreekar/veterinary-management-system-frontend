document.getElementById("alert").style.display="none"

function signin(event){
    
    event.preventDefault();
    document.getElementById("alert").innerHTML=""
    document.getElementById("alert").style.display="none"
    let email = document.getElementById("email").value;
    let password = document.getElementById("psw").value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"email":email,"pwd":password});

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(api+"signin", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        if(result.status == 200){
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                localStorage.setItem("email",result.email);
                localStorage.setItem("userType", result.userType);
                localStorage.setItem("name", result.name);
                localStorage.setItem("userId",result.userId);
                location.href="docAppointments.html";
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                
                document.getElementById("alert").innerHTML=errorMessage        
                document.getElementById("alert").style.display="block"
            });
        }
        else if(result.status==202){            
            document.getElementById("alert").innerHTML=result.Error
            document.getElementById("alert").style.display="block"
        }
        else{
            document.getElementById("alert").innerHTML="An error has occured. Please try again later!"
            document.getElementById("alert").style.display="block"
        }
    })
    .catch(error => console.log('error', error));
    
    
}