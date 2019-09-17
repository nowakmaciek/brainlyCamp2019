
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAU2lVY3EQF1HNOAzMSk9E2pv6Q0ZmoC08",
    authDomain: "campapp-e204e.firebaseapp.com",
    databaseURL: "https://campapp-e204e.firebaseio.com",
    projectId: "campapp-e204e",
    storageBucket: "",
    messagingSenderId: "496325356840",
    appId: "1:496325356840:web:edb0806a57236784ba741d"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //Firestore
  var firestore = firebase.firestore();
  var db = firebase.firestore();
 

//Service worker

window.addEventListener('load', async e => {

loginWithGoogle();
showMeParticipants(1);
showMeParticipants(2);
showMeParticipants(3);


});


//Login via Google
 var provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
    hd: "example1234.com"
});

function loginWithGoogle(){

        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          //

          //window.location.href = "./success_page.html";
          console.log("I am logged in!");

        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        }); 

      }


function signOut(){
        firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.href = "./index.html";
        }).catch(function(error) {
          // An error happened.
        });
      }


//real time update for each document in collection


function showMeParticipants(day){

  db.collection("camp-events-day-"+day).onSnapshot(collection => {
      collection.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        

        const fullDay = document.querySelector('admin-event-list');

        let eventContainer = document.createElement('div');
        let eventDescription = document.createElement('span');
        let eventTitle = document.createElement('h1');
        let participants = document.createElement('span');
        let participantsMax = document.createElement('span');

        eventContainer.setAttribute('class', "admin-day");

        eventDescription.textContent = doc.data().title;
        console.log(eventDescription);

        eventContainer.appendChild(eventDescription);
        fullDay.appendChild(eventContainer);



    });
 });
}




