window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-122758714-1');
$("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = String(this.hash);
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 1000, function(){
           window.location.hash = hash;
      });
    }
});
function showDinner(){
    // $("#full-dinner-menu")[0].style.display = "inline";
    // $("#exit")[0].style.display = "inline";
    // $("#menu-background")[0].style.display = "inline";
}
function showBreakfast(){
    $("#full-breakfast-menu")[0].style.display = "inline";
    $("#exit")[0].style.display = "inline";
    $("#menu-background")[0].style.display = "inline";
}
function showDessert(){
    $("#full-dessert-menu")[0].style.display = "inline";
    $("#exit")[0].style.display = "inline";
    $("#menu-background")[0].style.display = "inline";
}
function exitMenu(){
    $("#full-breakfast-menu")[0].style.display = "none";
    $("#full-dinner-menu")[0].style.display = "none";
    $("#full-dessert-menu")[0].style.display = "none";
    $("#exit")[0].style.display = "none";
    $("#menu-background")[0].style.display = "none";
}
function navbarColor(num){
    for (var x = 0; x < $('#header .col-md').length; x++){
        $('#header .col-md')[x].style.backgroundColor = "gray";
    }
    
    $('#header .col-md:nth-child(' + (parseInt(num)+1).toString() +')')[0].style.backgroundColor = "#7bc7dd";
    
    var menuLocation = ["Home", "Menus", "Reviews", "Reservations", "Our Story", "FAQs", "Contact"];
    
    $("#hamburgerLocation").replaceWith("<p id='hamburgerLocation'>" + menuLocation[num] + "</p>");
}
window.onload = function() {
    initMap();
    myFunction();
    // app.selectSeat('nopref', 'No Preference');
}
window.onscroll = function() {myFunction()};
function myFunction(num) {
    if (document.readyState !== "complete"){return;}
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    
    var mobileHeights = [10.814497272018706, 15.281567849168939, 42.88776305533905, 53.85814497272019, 73.460639127046, 96.35326221781196];
    var regularHeights = [14.2857, 28.5714, 42.8571, 57.1428, 71.4285, 85.7142, 100]
    
    var scrolledHeight = regularHeights;
    var value = 1;
    var x = 0;
    
    if($(window).width() < 800){
        scrolledHeight = mobileHeights
    }
    while (scrolled > scrolledHeight[x]){
        value += 2;
        x++
    }
    document.getElementById("myBar").style.width = (value) * 28.571429/4 + "%";
    navbarColor(x);
    
    if ($(window).width() < 768){
        $('#hamburgerContainer')[0].style.visibility = "visible";
        $(".bg .container-fluid #navbar")[0].style.visibility = "hidden";
        $(".progress-container")[0].style.visibility = "visible";
    }
}
myFunction();

var dropDownButton = 0;
function showDropDownMenu(){
    if ($(window).width() < 601){
        if (dropDownButton % 2 == 0){
            $(".bg .container-fluid #navbar")[0].style.visibility = "visible";
            // $(".progress-container")[0].style.visibility = "hidden";
        }
        else{
            $(".bg .container-fluid #navbar")[0].style.visibility = "hidden";
            // $(".progress-container")[0].style.visibility = "visible";
        }
        dropDownButton++
    }
}
function initMap() {
  if (document.readyState !== "complete"){return;}
  var borghis = {lat: 39.063543, lng: -74.752921};
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 18, center: borghis});    
}
//var config = {
//    apiKey: "AIzaSyCq0c57W45_Pn-nbsZwy9i1AE4U9Uxx5e8",
//    authDomain: "reservations-34b8e.firebaseapp.com",
//    databaseURL: "https://reservations-34b8e.firebaseio.com",
//    projectId: "reservations-34b8e",
//    storageBucket: "reservations-34b8e.appspot.com",
//    messagingSenderId: "346991840022"
//};
//var db = firebase.initializeApp(config).database();

/**
Vue.use(VueFire);
Vue.config.devtools = false;
Vue.config.productionTip = false;
var validTimes = [];
var flagMain = "";
var flagFull = "";
var app = new Vue({
    el: "#reservationSelectionContainer",
    
    data: function(){
        return {
              
            errors:[],
            firstname: "",
            lastname: "",
            date: "",
            datePrint: "",
            time: "",
            timePrint: "",
            size: "",
            email: "",
            phone: "",
            phonePrint: "",
            seating: "",
            accommodations: [],
            accommodationsPrint: "None",
            other: "",
        };
    },
    components: {
        vuejsDatepicker
    },
    methods:{
      closedDateSelection: function(){
          this.formatDate();
          this.checkAvailability();
      },
      confirm: function() {
          var checkedItems = [this.firstname, this.lastname, this.size, this.date, this.timePrint, this.email, this.phone, this.seating];
          var checkedItemsDisplay = ["first name", "last name", "party size", "date", "time", "email", "phone number", "seating location"];
          for (var x= 0 ; x<8; x++){
              if (checkedItems[x] === ""){
                  alert("Please enter a " + checkedItemsDisplay[x]) + ".";
                  return;
              }
          }
          if (! this.validEmail(this.email)){
              alert("Please enter a valid email");
              return;
          }
          else if (! this.validPhone(this.phone)){
              alert("Please enter a valid phone number");
              return;
          }
          else if (! this.validSize(this.size)){
              alert("Please enter a valid party size");
              return;
          }
          else{
              this.formatPhone(this.phone);
              
              $("#reservationScreen2")[0].style.display = "none";
              $("#confirmScreen")[0].style.display = "flex";
              $("#confirmationScreen1")[0].style.display = "block";
              $("#backArrow1")[0].style.display = "none";
              $("#backArrow2")[0].style.display = "block";
          }
    },
      validEmail:function(email) {    
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
      validPhone:function(num) {
        if (num===null){
            return false
        }
        num = num.replace(/[^0-9]/g, "");
        if (num.length !== 10){
            return false;
        }
        return true
        },
      validSize: function(num){
        if (num===null){
            return false
        }
        if ((num === num.replace(/[^0-9]/g, "")) && 0 < parseInt(num) && parseInt(num)< 21){
            return true;
        }
        return false;   
      },
      selectSeat: function(id, loc){
          this.seating = loc;
          $("#inside")[0].style.backgroundColor = "white";
          $("#outside")[0].style.backgroundColor = "white";
          $("#nopref")[0].style.backgroundColor = "white";
          $("#" + id)[0].style.backgroundColor = "#7bc7dd";
          $("#" + id)[0].style.color = "black";
          this.checkAvailability();
      },
      selectAcc: function(id, acc){
          if (id === "other"){
              this.accommodations.push(app.other);
              this.convertAcc(acc);
          }
          if (! this.accommodations.includes(acc)){
              this.accommodations.push(acc);
              this.convertAcc(acc);
          }
          else{
              for (var w = 0; w<this.accommodations.length; w++){
                  if (acc === this.accommodations[w]){
                      this.accommodations.splice(w, 1);
                  }
              }
              this.convertAcc();
          }
          if ($("#" + id)[0].style.backgroundColor === "rgb(123, 199, 221)"){
              $("#" + id)[0].style.backgroundColor = "white";
            }
          else{
            $("#" + id)[0].style.backgroundColor = "#7bc7dd";
          }
          $("#" + id)[0].style.color = "black";
      },
      convertAcc: function(){
          this.accommodationsPrint = "";
          for (var r=0; r<this.accommodations.length; r++){
              this.accommodationsPrint += this.accommodations[r] + " ";
          }
      },
      formatDate: function(){
          this.datePrint = String(this.date).substring(4, 15);
      },
      formatPhone: function(){
          var phoneNum = String(this.phone).replace(/[^0-9]/g, "");
          var str1 = ") ";
          var str2= "-";
          var finalStr = "(";
          finalStr += phoneNum.slice(0, 3);
          finalStr += str1;
          finalStr += phoneNum.slice(3, 6);
          finalStr += str2;
          finalStr += phoneNum.slice(6, 10);
          this.phonePrint = finalStr;
      },
      selectTime: function(time){ 
          if (validTimes.includes(parseInt(time))){
              this.time = time;
              if (time === "1000"){
                  this.timePrint = time.slice(0,2) + ":" + time.toString().slice(2,4);
              }
              else{
                  this.timePrint = time.slice(0,1) + ":" + time.toString().slice(1,3);
              }
          }
          var times = ["500", "530", "600", "630", "730", "800", "830", "900", "930", "1000"]; 
          for (var k = 0; k<times.length; k++){
            if (validTimes.includes(parseInt(times[k]))){
                $("#time" + times[k] +" p")[0].style.backgroundColor = "white";
                $("#time" + times[k] +" p")[0].style.color = "gray";
            }
          }
          $("#time" + time.toString() +" p")[0].style.backgroundColor = "#7bc7dd";
          $("#time" + time.toString() +" p")[0].style.color = "#000";
      },
      checkAvailability: function(){

        if (this.date.length < 1 || this.size.length < 1 || this.seating.length < 1){
            return;
        }  

        validTimes = [];  
        var inputDate = this.datePrint;
        var inputSize = this.size;
        var weekday = String(this.date).slice(0,3);
        var times = [500, 530, 600, 630, 730, 800, 830, 900, 930, 1000]; 
        var databaseLocMonth = this.datePrint.substring(0,3).toLowerCase();
        var databaseLocDay = this.datePrint.substring(0,6).toLowerCase().replace(" ", "-");
        var currReservationBefore = 0;
        var currReservationAfter = 0;
        var currReservationInsideBefore = 0;
        var currReservationInsideAfter = 0;
        var currReservationOutsideBefore = 0;
        var currReservationOutsideAfter = 0;

        for (var r=0; r < times.length; r++){ 
            if (times[r] === 1000){
               $("#time" + times[r].toString()).replaceWith("<div id=\"time" + times[r].toString() + "\" class=\"col\"><p id=\"availableTime\">" + times[r].toString().slice(0,2) + ":" + times[r].toString().slice(2,4) + "</p></div>"); 
            }
            else{

                $("#time" + times[r].toString()).replaceWith("<div id=\"time" + times[r].toString() + "\" class=\"col\"><p id=\"availableTime\">" + times[r].toString().slice(0,1) + ":" + times[r].toString().slice(1,3) + "</p></div>");
            }
            $("#time" + times[r] +" p")[0].style.border = "5px solid gray";
            $("#time" + times[r]  +" p")[0].style.cursor = "not-allowed";   
            $("#time" + times[r]  +" p")[0].style.color = "gray"; 
            $("#time" + times[r]  +" p")[0].style.backgroundColor = "gray"; 
            $("#time" + times[r]  +" p")[0].style.borderRadius = "100px";
        }
        function eatingTime(week, time, size){
            var monWed = [130, 145, 145, 200, 215, 215];
            var thuSun = [145, 200, 200, 215, 230, 230];
            if (week === "monWed"){
                if (size < 4){
                    return formatNumToHour(time+monWed[0]);
                }
                else if (size < 6){
                    return formatNumToHour(time+monWed[1]);
                }
                else if (size < 8){
                    return formatNumToHour(time+monWed[2]);
                }
                else if (size < 11){
                    return formatNumToHour(time+monWed[3]);
                }
                else if (size < 16){
                    return formatNumToHour(time+monWed[4]);
                }
                else if (size < 21){
                    return formatNumToHour(time+monWed[5]);
                }
            }
            else{
                if (size < 4){
                    return formatNumToHour(time+thuSun[0]);
                }
                else if (size < 6){
                    return formatNumToHour(time+thuSun[1]);
                }
                else if (size < 8){
                    return formatNumToHour(time+thuSun[2]);
                }
                else if (size < 11){
                    return formatNumToHour(time+thuSun[3]);
                }
                else if (size < 16){
                    return formatNumToHour(time+thuSun[4]);
                }
                else if (size < 21){
                    return formatNumToHour(time+thuSun[5]);
                }
            }
        }   
        function formatNumToHour(num){
            var hour = Math.floor(num / 100) * 100;
            if (num % 100 > 59){
                hour += 100;
            }
            var min = num % 100 % 60;
            return hour+min;
        }
        function showValidTime(time){

            if (time === 1000){

               $("#time" + time.toString()).replaceWith("<div id=\"time" + time.toString() + "\" class=\"col\"><p onclick=\"app.selectTime(\'" + time.toString() + "\')\" id=\"availableTime\">" + time.toString().slice(0,2) + ":" + time.toString().slice(2,4) + "</p></div>"); 

            }

            else{

                $("#time" + time.toString()).replaceWith("<div id=\"time" + time.toString() + "\" class=\"col\"><p onclick=\"app.selectTime(\'" + time.toString() + "\')\" id=\"availableTime\">" + time.toString().slice(0,1) + ":" + time.toString().slice(1,3) + "</p></div>");

            }

            this.validTimes.push(time);

            

            $("#time" + time.toString() +" p")[0].style.border = "5px solid #7bc7dd";

            $("#time" + time.toString() +" p")[0].style.backgroundColor = "white";

            $("#time" + time.toString() +" p")[0].style.borderRadius = "100px";

        }   

        function countReservations(weekTime, childNodes, times, inputSize){ 

            var timeOfDBReservation = parseInt(childNodes.val().time.replace(":", "").replace(" PM", "").replace(" ", "").trim());

            

            var duration = eatingTime(weekTime, timeOfDBReservation, parseInt(childNodes.val().size));

                        

            var seatedDuration = eatingTime(weekTime, times[y], inputSize);

            if (duration >= times[y] && times[y] >= timeOfDBReservation){

                currReservationBefore += parseInt(childNodes.val().size);

            }

            if ( times[y] <= timeOfDBReservation &&  timeOfDBReservation <= seatedDuration ){

                currReservationAfter += parseInt(childNodes.val().size);

            }

        }

        function countReservationsNoPref(weekTime, childNodes, times, inputSize, locationOfReservation){

            

            var timeOfDBReservation = parseInt(childNodes.val().time.replace(":", "").replace(" PM", "").replace(" ", "").trim());

            

            var duration = eatingTime(weekTime, timeOfDBReservation, parseInt(childNodes.val().size));

                        

            var seatedDuration = eatingTime(weekTime, times[y], inputSize);

            if (locationOfReservation === "inside" && duration >= times[y] && times[y] >= timeOfDBReservation){

                currReservationInsideBefore += parseInt(childNodes.val().size);

            }

            if (locationOfReservation === "inside" && times[y] <= timeOfDBReservation &&  timeOfDBReservation <= seatedDuration ){

                currReservationInsideAfter += parseInt(childNodes.val().size);

            }

            

            

            if (locationOfReservation === "outside" && duration >= times[y] && times[y] >= timeOfDBReservation){

                currReservationOutsideBefore += parseInt(childNodes.val().size);

            }

            if (locationOfReservation === "outside" && times[y] <= timeOfDBReservation &&  timeOfDBReservation <= seatedDuration ){

                currReservationOutsideAfter += parseInt(childNodes.val().size);

            }

            

        } 

        for (var y=0; y<times.length; y++){

            currReservationBefore = 0;

            currReservationAfter = 0;

            

            currReservationInsideBefore = 0;

            currReservationInsideAfter = 0;

            currReservationOutsideBefore = 0;

            currReservationOutsideAfter = 0;

            

            var requestedSeatingLocation = app.seating.toLowerCase();
            var dbLocation = databaseLocMonth + "/" + databaseLocDay + "/reservationsShort/";                        

            db.ref(dbLocation).on("value", function(snapshot) {

              snapshot.forEach(function(childNodes){

                  

                  var locationOfReservation = childNodes.val().location.toLowerCase();

                  if (locationOfReservation === "w1" | locationOfReservation === "w2" | locationOfReservation === "w3" | locationOfReservation === "inside 4" | locationOfReservation === "inside 5"){

                          locationOfReservation = "inside";

                  }

                  else if (locationOfReservation === "sunset"){

                      locationOfReservation = "outside";

                  }



                  if (locationOfReservation === requestedSeatingLocation){

                      if (weekday === "Mon" || weekday === "Tue" || weekday === "Wed"){

                          countReservations("monWed", childNodes, times, inputSize)

                      }

                      else{

                          countReservations("thursSun", childNodes, times, inputSize)

                      }

                  }

                  else if (requestedSeatingLocation === "no preference"){

                      if (weekday === "Mon" || weekday === "Tue" || weekday === "Wed"){

                          countReservationsNoPref("monWed", childNodes, times, inputSize, locationOfReservation)

                      }

                      else{

                          countReservationsNoPref("thursSun", childNodes, times, inputSize, locationOfReservation)

                      }

                  }

              });

          },

        function (errorObject) {
                $("#reservationScreen1")[0].style.display = "none";
                $("#errorScreen .col-8")[0].style.display = "inline";

        }); 

            

        if (requestedSeatingLocation !== "no preference" && currReservationBefore + parseInt(inputSize) < 21 && + currReservationAfter + parseInt(inputSize) < 21){

            showValidTime(times[y]);

        }

        else if (requestedSeatingLocation === "no preference"){

            var roomOutside = (currReservationOutsideAfter + parseInt(inputSize) < 21 && currReservationOutsideBefore + parseInt(inputSize) < 21);

            var roomInside = (currReservationInsideAfter + parseInt(inputSize) < 21 && currReservationInsideBefore + parseInt(inputSize) < 21);



            if (roomOutside  || roomInside ){

                showValidTime(times[y]);

            }

        }

      }

    },
      sendEmail: function(){
          $("#confirmationScreen1")[0].style.display = "none";
          $("#confirmationScreen2")[0].style.display = "block";
          
          var databaseLocMonth = this.datePrint.substring(0,3).toLowerCase();
          var databaseLocDay = this.datePrint.substring(0,6).toLowerCase().replace(" ", "-");
          var dbLocationShort = databaseLocMonth + "/" + databaseLocDay + "/reservationsShort/";
          var dbLocationFull = databaseLocMonth + "/" + databaseLocDay + "/reservationsFull/";
          
          
          Email.send("andrewjoliver3@gmail.com",
            "borghisbythebay@gmail.com",
            "Reservation",
            "Party Name: " + this.firstname + " " + this.lastname 
            + '<br/>' + "Date: " + this.datePrint 
            + '<br/>' + "Number of guests: " + this.size 
            + '<br/>' + "Time: " + this.timePrint 
            + '<br/>' + "Seating Preference: " + this.seating 
            + '<br/>' + "Party Accommodations: " + this.accommodationsPrint 
            + '<br/>' + "Phone Number: " + this.phonePrint 
            + '<br/>' + "Email: " + this.email 
            + '<br/>' + "------------------",
            {
                "token" : "6d67c589-b0dc-4127-9008-9d1e917e2cc5",
                "callback": function done(message){
                    //console.log(message)
                }
            }
          );
          
            
//          TODO: IMPLEMENT AUTOMATIC CONFIRMATION
//          Email.send("andrewjoliver3@gmail.com",
//            this.email,
//            "Reservation Confirmation",
//            "Hello " + this.name + "," 
//            + '\n\n' + "This is an automated reminder and confirmation for your reservation at Borghi's By the Bay, with the following party information." 
//            + '\n\n' + "Party Name: " + this.name 
//            + '\n' + "Date: " + this.shownDate 
//            + '\n' + "Number of guests: " + this.size 
//            + '\n' + "Time: " + this.time 
//            + '\n' + "Seating Preference: " + this.location 
//            + '\n' + "Party Accommodations: " + this.accommodations 
//            + '\n' + "Phone Number: " + this.phone 
//            + '\n\n' + "Please call our restaurant at 609-961-3899 if any of the above information is incorrect or changes. Please note that we hold reservations for a maximum of 15 minutes. Thank you for your reservation! We look forward to seeing you soon." 
//            + '\n\n' + "Thank you,"
//            + '\n' + "Borghi's By the Bay",
//            {
//                "token" : "6d67c589-b0dc-4127-9008-9d1e917e2cc5",
//                "callback": function done(message){
//                    //console.log(message)
//                }
//            }
//          );
          
          
          db.ref(dbLocationFull).push({
                size: parseInt(this.size),
                time : this.timePrint,
                location: this.seating,
                name: this.firstname + " " + this.lastname,
                phone: this.phonePrint,
                email: this.email,
                accommodations: this.accommodationsPrint
          });
          db.ref(dbLocationShort).push({
                size: parseInt(this.size),
                time : this.timePrint,
                location: this.seating,
          });          
      },
      partyInfo: function(){
        $("#reservationScreen1")[0].style.display = "none";
        $("#placeholderCol")[0].style.display = "none";
        $("#reservationScreen2")[0].style.display = "block";
        $("#backArrow1")[0].style.display = "block";            
    },
      partyInfoBack: function(){
        $("#confirmScreen")[0].style.display = "none";
        $("#placeholderCol")[0].style.display = "none";
        $("#backArrow2")[0].style.display = "none";
        $("#reservationScreen2")[0].style.display = "inline";
        $("#backArrow1")[0].style.display = "block";
        try {
          $("#confirmationScreen2").style.display="none";
        }
        catch(error) {
            //DO NOTHING
        }

    },
      timingInfo: function(){
            $("#reservationScreen1")[0].style.display = "block";
            $("#placeholderCol")[0].style.display = "block";
            $("#reservationScreen2")[0].style.display = "none";
            $("#backArrow1")[0].style.display = "none";
        },
  }
});
**/
