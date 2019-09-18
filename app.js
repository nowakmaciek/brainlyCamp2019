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
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./serviceWorker.js')
      .then(reg => console.log('ServiceWorker registered, scope:', reg.scope))
      .catch(err => console.log('Failed to register ServiceWorker:', err));
  }

  firebase.auth().onAuthStateChanged(function(user) {
    if (user && isBrainlyEmployee(user.email)) {
      console.info("User name: " + user.displayName);
      document.getElementById('user-info').innerHTML = 'Hello, ' + user.displayName + ' (' + user.email +')';

      closePopup(0,0); //closing login popup
      createAgenda(1);
      createAgenda(2);
      createAgenda(3);
    } else {
      goToProfilePage();
      showPopup(0,0);
      console.log("User not logged in. Loging Popup opened");
      document.getElementById('user-info').innerHTML = 'no user signed in :(';
    }
  });
});


//Firestore
// var docRef = firestore.collection("camp-events").doc("dinner");
// var data1 = docRef.get();

// docRef.get().then(function(doc) {
//     if (doc.exists) {
//         console.log("Document data:", doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch(function(error) {
//     console.log("Error getting document:", error);
// });


function showMeData() {
  console.log('Info from database: ' + data1);
}

function writeData() {

  docRef.update({
    guests: 49
  });
}


function isBrainlyEmployee(email) {
  return email.includes('@brainly.com') || email.includes('mefju');
}


//Login via Google
var provider = new firebase.auth.GoogleAuthProvider();

// provider.setCustomParameters({
//     hd: "example1234.com"
// });

function loginWithGoogle() {

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    if (isBrainlyEmployee(user && user.email)) {
      //window.location.href = "./success_page.html";
      goToDay1();
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

function signOut() {
  firebase.auth().signOut();
}


//Additional stuff

function goToPage(pageId) {
  document.getElementById(pageId).click();
}

function goToDay1() {
  goToPage("day-1-tab");
}

function goToDay2() {
  goToPage("day-2-tab");
}

function goToDay3() {
  goToPage("day-3-tab");
}

function goToProfilePage() {
  goToPage("profile-page-tab");
  console.log("Go to profile clicked!");
}




// <div class="popup" id="popup-1-1">
//     <h1 class="heading"><strong>EducationInspiration Innovation</strong></h1>
//     <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
//     </div>
//     <a href="#" class="close w-button" onclick="closePopup()">close</a>
// </div>



function renderEvent(doc, day, event_number) {

  const dayContainer = document.querySelector('#day' + day + '-containter');

  let eventContainer = document.createElement('div');
  let eventTitle = document.createElement('h1');
  let eventTime = document.createElement('span');
  let eventPlace = document.createElement('span');
  let participants = document.createElement('span');
  let participantsPopup = document.createElement('span');
  let trainerPopup = document.createElement('span');
  let participantsMax = document.createElement('span');
  let eventDescription = document.createElement('span');
  let addMeToEvent = document.createElement('button');
  let removeMeFromEvent = document.createElement('button');
  let addToCalendar = document.createElement('button');
  let learnMore = document.createElement('a');
  let eventBoxFooter = document.createElement('div');

  //popup stuff

  let popupContainer = document.createElement('div');
  let popupHeader = document.createElement('h1');
  let eventTimePopup = document.createElement('span');
  let eventPlacePopup = document.createElement('span');
  let eventDescriptionPopup = document.createElement('div');
  let popupClose = document.createElement('a');

  //eventContainer.setAttribute('class', doc.id);


  eventTitle.textContent = doc.data().title;
  eventTitle.setAttribute('class', "heading");


  //add optional class if event is optional
  if (doc.data().optional) {

      //make tickets values realtime updated
    db.collection("camp-events-day-" + day).doc(doc.id)
    .onSnapshot(function(doc) {

        var max = doc.get("participants-max");
        var current = doc.get("participants").length;
        var freeTickets = max-current;
    
      if (freeTickets == 0) {
        console.log("No tickets!");
        participants.textContent = "Sold out!";
        participantsPopup.textContent = "Sold out!";

        addMeToEvent.classList.add("disable");
      }else{
        // participants.textContent = doc.get("participants").length;
        // participantsMax.textContent = " / " + doc.get("participants-max");
        addMeToEvent.classList.remove("disable");
        participants.textContent = freeTickets + " places left";
        participantsPopup.textContent = freeTickets + " places left";
      }

    });

    eventContainer.setAttribute('class', "event-box optional");
    eventBoxFooter.setAttribute('class', "event-box-footer");
    participants.setAttribute('class', "text-block tickets");
    participantsPopup.setAttribute('class', "text-block tickets");
    participantsMax.setAttribute('class', "text-block tickets");

  } else {
    if (doc.data().img == 1) {
      eventContainer.setAttribute('class', "event-box bckg-1");
    } else if(doc.data().img == 2){
      eventContainer.setAttribute('class', "event-box bckg-2");
    } else if(doc.data().img == 3){
      eventContainer.setAttribute('class', "event-box bckg-3");
    } else if(doc.data().img == 4){
      eventContainer.setAttribute('class', "event-box bckg-4");
    } else {
      eventContainer.setAttribute('class', "event-box");
    }
 }
  

  eventTime.textContent = doc.data().time;
  eventTime.setAttribute('class', "text-block");

  eventTimePopup.textContent = "Date: " + doc.data().time;
  eventTimePopup.setAttribute('class', "text-block");

  eventPlace.textContent = doc.data().place;
  eventPlace.setAttribute('class', "text-block");

  if(doc.data().trainer){
  trainerPopup.textContent = "Trainer: " + doc.data().trainer;
  trainerPopup.setAttribute('class', "text-block");
  }

  eventPlacePopup.textContent = "Location: " + doc.data().place;
  eventPlacePopup.setAttribute('class', "text-block");

  eventDescription.innerHTML = doc.data().description;
  eventDescription.setAttribute('class', "text-block");

  learnMore.textContent = "Learn more";
  learnMore.setAttribute('class', "link");
  learnMore.setAttribute('onclick', "showPopup("+day+","+event_number+")");

  addMeToEvent.textContent = "I'm in!";
  addMeToEvent.setAttribute('class', "button-primary");
  addMeToEvent.setAttribute('onClick', "addMeToTheList(" + day + ",\""+doc.id+"\")");

  removeMeFromEvent.setAttribute('class', "button-primary");
  removeMeFromEvent.textContent = "I'm out!";
  removeMeFromEvent.setAttribute('onClick', "removeMeFromTheList(" + day + ",\""+doc.id+"\")");

  addToCalendar.textContent = "Add to calendar";
  let googleCalendarLink = "http://www.google.com/calendar/event?action=TEMPLATE&dates=20190911T010000Z%2F20190912T010000Z&text=Title&location=Location&details=Description";
  addToCalendar.setAttribute('href', googleCalendarLink);


  //popup stuff

  popupContainer.setAttribute('class', "popup");
  popupContainer.setAttribute('id', "popup-"+day+"-"+event_number);
  popupHeader.textContent = doc.data().title;
  popupHeader.setAttribute('class', "heading-bit");
  eventDescriptionPopup.innerHTML = doc.data().description;
  eventDescriptionPopup.setAttribute('class', "text-block description");
  //popupClose.textContent = "X";
  popupClose.setAttribute('class', "close");
  // eventContainer.setAttribute('onClick', "showPopup("+day+","+event_number+")");
  popupClose.setAttribute('onClick', "closePopup("+day+","+event_number+")");

  popupContainer.appendChild(popupHeader);
  popupContainer.appendChild(eventTimePopup);
  popupContainer.appendChild(eventPlacePopup);
  popupContainer.appendChild(trainerPopup);
  popupContainer.appendChild(participantsPopup);
  popupContainer.appendChild(eventDescriptionPopup);
  popupContainer.appendChild(popupClose);
  popupContainer.appendChild(addMeToEvent);
  popupContainer.appendChild(removeMeFromEvent);
  popupContainer.appendChild(addToCalendar);

  //box event stuff

  eventBoxFooter.appendChild(learnMore);
  eventBoxFooter.appendChild(participants);

  eventContainer.appendChild(eventTitle);
  eventContainer.appendChild(eventTime);
  eventContainer.appendChild(eventPlace);
  eventContainer.appendChild(eventBoxFooter);
  //eventContainer.appendChild(participantsMax);

  eventContainer.appendChild(popupContainer);

  dayContainer.appendChild(eventContainer);

}





function createAgenda(day) {

  var i = 1;

  db.collection("camp-events-day-" + day).get().then(collection => {
    collection.forEach(function(doc) {
      console.log("Rendering day:" + day + " / event:" + i);
      renderEvent(doc, day, i);
      i++;
    });
  });

}


function addMeToTheList(day, docID) {

  var userEmail;
  var maxParticipantsCount;
  var currentParticipantsCount = 0;

  var eventRef = db.collection("camp-events-day-" + day).doc(docID);
  console.log("DocID : " + docID);

  //checking if user logged in
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      userEmail = user.email;
    } else {

    }
  });

  //downloading participant list size. If size < max, then adding user email to list
  eventRef.get().then(function(doc) {

    currentParticipantsCount = doc.get("participants").length;
    maxParticipantsCount = doc.get("participants-max");


    console.log("Max participants count: " + maxParticipantsCount);
    console.log("Current participants count: " + currentParticipantsCount);

    if (currentParticipantsCount < maxParticipantsCount) {
      db.collection("camp-events-day-" + day).doc(docID).update({
        participants: firebase.firestore.FieldValue.arrayUnion(userEmail)
      });
      console.log("Email added to list: " + userEmail);
    } else {
      console.log("Sorry, not enough tickets for this event");
    }

    });


}


function removeMeFromTheList(day, docID) {
  console.log("I want to be removed from: " + day + "/" + docID);

  var userEmail;
  var eventRef = db.collection("camp-events-day-" + day).doc(docID);

  //checking if user logged in
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      userEmail = user.email;
    } else {

    }
  });

  //delete user email from array
  eventRef.get().then(function(doc) {
    db.collection("camp-events-day-" + day).doc(docID).update({
      participants: firebase.firestore.FieldValue.arrayRemove(userEmail)
    });
    console.log("Deleted from the event: " + userEmail);
  });

}

function addEventToCalendar() {

  //to be implemented

}

function showPopup(day, event_number) {
  var popup = document.getElementById("popup-"+day+"-"+event_number);

  popup.style.display = "block";

  popup.classList.remove("popup-hidden");
  popup.classList.add("popup-visible");

  function onAnimationEnd() {
    popup.style.display = "block";
    console.log("Popup opened");
    popup.removeEventListener("animationend", onAnimationEnd);
  }

  popup.addEventListener("animationend", onAnimationEnd);
  popup.addEventListener("webkitAnimationEnd", onAnimationEnd);
  
}


function closePopup(day, event_number) {
  var popup = document.getElementById("popup-"+day+"-"+event_number);

  popup.classList.remove("popup-visible");
  popup.classList.add("popup-hidden");

  function onAnimationEnd() {
    popup.style.display = "none";
    console.log("Popup closed");
    popup.removeEventListener("animationend", onAnimationEnd);
  }

  popup.addEventListener("animationend", onAnimationEnd);
  popup.addEventListener("webkitAnimationEnd", onAnimationEnd);


  // popup.className = "popup popup-hidden";


}



// db.collection("camp-events-day-1").doc("event-1")
//     .onSnapshot(function(doc) {          
//     });



//real time update for each document in collection

//  db.collection("camp-events-day-1").onSnapshot(collection => {
//      collection.forEach(function(doc) {
//        // doc.data() is never undefined for query doc snapshots
//        // console.log(doc.id, " => ", doc.data());
//        console.log("Iteration : " + i);
//        i++;
//        renderEvent(doc,1,1);
//    });
// });



// Number of documents in collection


//   db.collection('camp-events-day-1').get().then(snap => {
//      eventsCount = snap.size // will return the collection size
//      console.log("EventsCount: " + eventsCount);
//   });



// function deleteFromDatabase() {

//   const FieldValue = require('firebase-admin').firestore.FieldValue;
//   const day1DocRef = firestore.collection("camp-events-day-1").doc("event-1");
//   const input1 = document.querySelector("#input-test");

//   var textToDelete = input1.value;
//   console.log("I want to delete from database: " + textToDelete);

//   day1DocRef.update({
//     participants: firestore.FieldValue.arrayRemove("John Doe")
//   });
// }




//     db.collection("camp-events-day-" + x).doc("event-"+y)
//         .onSnapshot(function(doc) {
//            renderEvent(doc, 1, 1); 
//         });

