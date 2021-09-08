function signout(){

    firebase.auth().signOut().then(() => {
        localStorage.removeItem("name")
        localStorage.removeItem("email")
        localStorage.removeItem("userId")
        localStorage.removeItem("userType")
        location.href="signin.html";
      }).catch((error) => {
        alert("An error occured!")
      });
}