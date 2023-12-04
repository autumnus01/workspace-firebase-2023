const firebaseConfig = {
  apiKey: "AIzaSyDdfGuq6zXIFeYAszrE-0KIZpT4ZFlzlxM",
  authDomain: "database2023-d2872.firebaseapp.com",
  projectId: "database2023-d2872",
  storageBucket: "database2023-d2872.appspot.com",
  messagingSenderId: "423220712630",
  appId: "1:423220712630:web:a80c8856fed15f5e66c217",
  measurementId: "G-10QVJZCYVV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// save the data
$("#signup-form").submit(function(e) {
  e.preventDefault();
  // get the username(email) and password from the form
  // change the following code
  var username = $('input[name="fullname"]').val();
  var email = $('input[name="username"]').val();
  var password = $('input[name="password"]').val();
  var confirmedpassword = $('input[name="cpassword"]').val();
  //check if password and confirmed password are the same
  var match = password==confirmedpassword;
  console.log(match);
  // create a user with email address and password
  if(match==true){
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      let user = result.user;
      user.updateProfile({
        displayName: username
      })
      .then(()=>{
        console.log("update profile successfuly");
        console.log(user.displayName, "You are signed up");
        var date = Date.now();
        var userinformation = {
          "username":user.displayName,
          "email": email,
          "signupDate": date
        };
        var db = firebase.firestore();
        db.collection("usertable").doc(user.displayName).set(userinformation).then(()=>{
          console.log("information saved to firestore");
          window.location.href="Login.html";
        });

      });
      
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.code);
      console.log(errorMessage);
    });
  }
  else{
    document.getElementById("signup-form").reset();
  }
});
