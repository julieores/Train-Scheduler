
  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyBsHB-fK_SyqzENkRELaIKMeBmV1aHXVQc",
      authDomain: "train-scheduler-f169f.firebaseapp.com",
      databaseURL: "https://train-scheduler-f169f.firebaseio.com",
      projectId: "train-scheduler-f169f",
      storageBucket: "train-scheduler-f169f.appspot.com",
      messagingSenderId: "522024126179"
  };

  firebase.initializeApp(config);

  //variable to reference the database
  var database = firebase.database();

  //initial values
  var trainName = "";
  var destination = "";
  var firstTrainTime = 0;
  var frequency = "";

  //button click is used
  $("#add-train").on("click", function (event) {

      event.preventDefault();

      //store recent train informaiton
      var trainName = $("#trainName-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var firstTrainTime = $("#firstTrainTime-input").val().trim();
      var frequency = $("#frequency-input").val().trim();

      // Code for the push
      dataRef.ref().push({

          userTrainName: trainName,
          userDestination: destination,
          userTrainTime: firstTrainTime,
          userFrequency: frequency,
          dataAdded: firebase.database.ServerValue.TIMESTAMP

      });
  });

  dataRef.ref().on("child_added", function (childSnapshot) {


      // full list of items
      $("#full-train-list").append("<div class='well'><span class='train-name'> " + childSnapshot.val().trainName +
          " </span><span class='train-trainName'> " + childSnapshot.val().destination +
          " </span><span class='train-destination'> " + childSnapshot.val().firstTrainTime +
          " </span><span class='train-comment'> " + childSnapshot.val().frequency + " </span></div>");

      // Handle the errors
  }, function (errorObject) {
 
  });

  dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
      // Change the HTML to reflect
      $("#trainName-display").text(snapshot.val().trainName);
      $("#destination-display").text(snapshot.val().destination);
      $("#firstTrainTime-display").text(snapshot.val().firstTrainTime);
      $("#frequency-display").text(snapshot.val().frequency);
  });

  //run time
  var currentTime = moment();
 

  // Difference between the times
  var diffTime = moment().diff(moment(firstTrainTime), "minutes");
  

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;


  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;


  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");


