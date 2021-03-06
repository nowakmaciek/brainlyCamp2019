
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
// showMeParticipants(1);
// showMeParticipants(2);
// showMeParticipants(3);




});


//Login via Google
 var provider = new firebase.auth.GoogleAuthProvider();


function loginWithGoogle() {

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    if (isBrainlyEmployee(user && user.email)) {

     
      createAgenda(1);
      createAgenda(2);
      createAgenda(3);

      console.log('USER HAS PROPER EMAIL', user.email)
    } else {
      console.log('USER HAS INVALID EMAIL', user.email)
      signOut();
    }
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.error('login error', error);
  });

}

function signOut(){
        firebase.auth().signOut().then(function() {
        // Sign-out successful.
        
        }).catch(function(error) {
          // An error happened.
        });
      }



function isBrainlyEmployee(email){
  return email.includes('iga.kowalska@brainly.com') || email.includes('olga.wysopal@brainly.com') || email.includes('maciej.nowak@brainly.com') || email.includes('ola.wisniewska@brainly.com');
}

//real time update for each document in collection





function renderEvent(doc, day, event_number) {

        const fullDay = document.querySelector('#admin-event-list-' + day);
        let eventContainer = document.createElement('div');
        eventContainer.setAttribute('class', "event-container");

        let eventTitle = document.createElement('div');
        eventTitle.setAttribute('class', "event-title");
        let eventTime = document.createElement('div');
        eventTime.setAttribute('class', "event-title");
        let status = document.createElement('div');
        let participantsList = document.createElement('div');
        participantsList.setAttribute('class', "participants-list");

        //admin stuff
        let adminFooter = document.createElement('div');
        adminFooter.setAttribute('class', "admin-footer");
        let emailInput = document.createElement('input');
        emailInput.setAttribute('class', "admin-email-input");
        emailInput.setAttribute('id', day + "-" + event_number);
        emailInput.setAttribute('placeholder', "Type email and click relevant button");
        let addEmailButton = document.createElement('button');
        addEmailButton.innerHTML = "+ Add user";
        addEmailButton.setAttribute('class', "admin-button");
        addEmailButton.setAttribute('onClick', "addToTheList("+day+",\""+doc.id+"\","+event_number+")");

        let deleteEmailButton = document.createElement('button');
        deleteEmailButton.innerHTML = "- Delete user";
        deleteEmailButton.setAttribute('class', "admin-button");
        deleteEmailButton.setAttribute('onClick', "removeFromTheList("+day+",\""+doc.id+"\","+event_number+")");

        adminFooter.appendChild(emailInput);
        adminFooter.appendChild(addEmailButton);
        adminFooter.appendChild(deleteEmailButton);

        

          db.collection("camp-events-day-" + day).doc(doc.id)
            .onSnapshot(function(doc) {

              var max = doc.get("participants-max");
              var current = doc.get("participants").length;
              var left = max-current;
              var participantsNewLine;

              eventTitle.innerHTML = doc.get("title");
              eventTime.innerHTML = doc.get("time");
              status.innerHTML = "Capacity: <strong>" + max + "</strong> / Current: <strong>" + current + "</strong> / Left: <strong>" + left +"</strong>";

              var currentParticipantsList = doc.get("participants");
              participantsNewLine = currentParticipantsList.toString().replace(/,/g, '<br>');

              participantsList.innerHTML = participantsNewLine;

              eventContainer.appendChild(eventTitle);
              eventContainer.appendChild(eventTime);
              eventContainer.appendChild(status);
              eventContainer.appendChild(participantsList);
              eventContainer.appendChild(adminFooter);
          });

        
        fullDay.appendChild(eventContainer);

}



function createAgenda(day) {

  var i = 1;

  db.collection("camp-events-day-" + day).get().then(collection => {
    collection.forEach(function(doc) {
      console.log("Rendering day:" + day + " / event:" + i);

      var max = doc.get("participants-max");

      if (max>0) {
        renderEvent(doc, day, i);
      }

      i++;
    });
  });

}


function removeFromTheList(day, docID, event_number) {
  
  var eventRef = db.collection("camp-events-day-" + day).doc(docID);
  var input = document.getElementById(day + "-" + event_number);
  var email = input.value;

  

  if (email != "") {
    console.log("I want to remove /" + email + "/ typed in input from: " + day + "/" + docID);

    // delete user email from array
    eventRef.get().then(function(doc) {
      db.collection("camp-events-day-" + day).doc(docID).update({
        participants: firebase.firestore.FieldValue.arrayRemove(email)
      });
      console.log("Deleted from the event: " + email);
    });
  }else{
    console.log("you have to type something input")
  }
}

function addToTheList(day, docID, event_number) {
  
  var eventRef = db.collection("camp-events-day-" + day).doc(docID);
  var input = document.getElementById(day + "-" + event_number);
  var email = input.value;

  
  if (email != "") {
    console.log("I want to add /" + email + "/ typed in input from: " + day + "/" + docID);

    //delete user email from array
    eventRef.get().then(function(doc) {
      db.collection("camp-events-day-" + day).doc(docID).update({
        participants: firebase.firestore.FieldValue.arrayUnion(email)
      });
      console.log("Added to the event: " + email);
    });
  }else{
    console.log("you have to type something input")
  }

}

