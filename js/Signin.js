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
$('#Login').submit(function (e) {
  e.preventDefault();
  // get the user name and password from form
  // You need to change this.
  var email = 'yilianz4@gmail.com';
  var password = 'ddsgagafda';

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((success) => {
      // Signed in
      // ...
      console.log('login in');
      let user = firebase.auth().currentUser;

      //user.updateProfile({ displayName: "Not sure" });
      if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        console.log(name, email, emailVerified);
      }
    })
    .catch((error) => {

      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
});

// add  a google login choice here 
$('#google').click(function(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // IdP data available in result.additionalUserInfo.profile.
    console.log("log in through google", user);
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
});