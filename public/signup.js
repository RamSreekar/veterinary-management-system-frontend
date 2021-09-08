document.getElementById("alert").style.display="none"

function signup(event){
    
    event.preventDefault();
    document.getElementById("signupbtn").disabled=true
    document.getElementById("alert").innerHTML=""
    document.getElementById("alert").style.display="none"
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("psw").value;
    let cpw = document.getElementById("cpw").value;
    console.log(name, email, password)
    if(password !== cpw){
        document.getElementById("alert").innerHTML="Passwords do not match!"
        document.getElementById("alert").style.display="block"
        return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"name":name,"email":email,"pwd":password,"userType":1});

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(api+"signup", requestOptions)
    .then(response => response.json())
    .then(result =>{
        console.log(result)
        if(result.status == 200){
            document.getElementById("signupbtn").disabled=false;
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                firebase.auth().signOut()
                alert("Account created successfully!")
                location.href="signin.html"
                // var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                
                document.getElementById("alert").innerHTML=errorMessage        
                document.getElementById("alert").style.display="block"
                // ..
            });
        }
        else if(result.status == 202){
            document.getElementById("alert").innerHTML="Account already exists!";
        }
        else{
            document.getElementById("alert").innerHTML="An error has occured. Please try again later!";
        }
    })
    .catch(error => console.log('error', error));
    
    
}