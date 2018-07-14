$(document).ready(function(){

  
	
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBsHB-fK_SyqzENkRELaIKMeBmV1aHXVQc",
            authDomain: "train-scheduler-f169f.firebaseapp.com",
            databaseURL: "https://train-scheduler-f169f.firebaseio.com",
            projectId: "train-scheduler-f169f",
            storageBucket: "",
            messagingSenderId: "522024126179"
        };


        firebase.initializeApp(config);

        //variable to reference the database
        var database = firebase.database();

        //initial Values
        var trainName = "";
        var destination = "";
        var firstTrainTime = 0;
        var frequency = "";
        var nextArrival = "00:00";
        var minutesAway = 0


        $("#add-user").on("click", function (event) {

            event.preventDefault();

            trainName = $("#trainName-input").val().trim();
            destination = $("#destination-input").val().trim();
            firstTrainTime = $("#firstTrainTime-input").val().trim();
            frequency = $("#frequency-input").val().trim();


            database.ref().set({
                trainName: trainName,
                destination: destination,
                firstTrainTime: firstTrainTime,
                frequency: frequency
            });

        });

        database.ref().on("value", function (snapshot) {

       
            console.log(snapshot.val());
            console.log(snapshot.val().trainName);
            console.log(snapshot.val().destination);
            console.log(snapshot.val().firstTrainTime);
            console.log(snapshot.val().frequency);

            // Changed HTML to reflect
            $("#trainName-display").data(snapshot.val().trainName);
            $("#destination-display").data(snapshot.val().destination);
            $("#firstTrainTime-display").data(snapshot.val().firstTrainTime);
            $("#frequency-display").data(snapshot.val().frequency);

        }