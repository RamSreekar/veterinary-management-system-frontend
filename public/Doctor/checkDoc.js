if(localStorage.getItem("userType")!=0){
    alert("You are not authorized to view this page")
    location.href="signin.html";
}