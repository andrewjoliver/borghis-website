//SCROLL ANIMATION
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


//MENU SHOWING FUNCTIONS
function showDinner(){
    $("#full-dinner-menu")[0].style.display = "inline";
    $("#exit")[0].style.display = "inline";
    $("#menu-background")[0].style.display = "inline";
}
function showBreakfast(){
    $("#full-breakfast-menu")[0].style.display = "inline";
    $("#exit")[0].style.display = "inline";
    $("#menu-background")[0].style.display = "inline";
}
function exitMenu(){
    $("#full-breakfast-menu")[0].style.display = "none";
    $("#full-dinner-menu")[0].style.display = "none";
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
window.onscroll = function() {myFunction()};
function myFunction(num) {
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
    if ($(window).width < 601){
        if (dropDownButton % 2 == 0){
            $(".bg .container-fluid #navbar")[0].style.visibility = "visible";
            $(".progress-container")[0].style.visibility = "hidden";
        }
        else{
            $(".bg .container-fluid #navbar")[0].style.visibility = "hidden";
            $(".progress-container")[0].style.visibility = "visible";
        }
        dropDownButton++
    }
}

//MAP
function initMap() {
  var borghis = {lat: 39.063543, lng: -74.752921};
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 18, center: borghis});    
}

//RESERVATIONS
var config = {
    apiKey: "AIzaSyCttCzkx_3cmM082eGBsLBwj9kZ9iQLdIM",
    authDomain: "reservations-log.firebaseapp.com",
    databaseURL: "https://reservations-log.firebaseio.com",
    projectId: "reservations-log",
    storageBucket: "reservations-log.appspot.com",
    messagingSenderId: "105126362934"
};
var db = firebase.initializeApp(config).database();
var reservationsLogRef = db.ref('reservations');
Vue.use(VueFire);

var validTimes = [];
var flagMain = "";

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
              //console.log(app.other);
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
          //console.log((this.date));
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
        var flag = "";
        var times = [500, 530, 600, 630, 730, 800, 830, 900, 930, 1000]; 
        var noData = false;
        var currReservationBefore = 0;
        var currReservationAfter = 0;
        var currReservationInsideBefore = 0;
        var currReservationInsideAfter = 0;
        var currReservationOutsideBefore = 0;
        var currReservationOutsideAfter = 0;
        
        //SHOW ALL OPTIONS AS UNAVAILABLE  
        for (var r=0; r < times.length; r++){ 
            //MAKE SURE ALL TIMES ARE INVALID
            if (times[r] === 1000){
               $("#time" + times[r].toString()).replaceWith("<div id=\"time" + times[r].toString() + "\" class=\"col\"><p id=\"availableTime\">" + times[r].toString().slice(0,2) + ":" + times[r].toString().slice(2,4) + "</p></div>"); 
            }
            else{
                $("#time" + times[r].toString()).replaceWith("<div id=\"time" + times[r].toString() + "\" class=\"col\"><p id=\"availableTime\">" + times[r].toString().slice(0,1) + ":" + times[r].toString().slice(1,3) + "</p></div>");
            }
            
            //RESTYLE
            $("#time" + times[r] +" p")[0].style.border = "5px solid gray";
            $("#time" + times[r]  +" p")[0].style.cursor = "not-allowed";   
            $("#time" + times[r]  +" p")[0].style.color = "gray"; 
            $("#time" + times[r]  +" p")[0].style.backgroundColor = "gray"; 
            $("#time" + times[r]  +" p")[0].style.borderRadius = "100px";
        }
          
        reservationsLogRef.on('value', getData, errorData);

        function getData(data){
            var reservations = data.val();
            var keys = Object.keys(reservations);

            for (var i = 0; i < keys.length; i++){
                var k = keys[i];
                if (reservations[k].date === inputDate){
                    this.flagMain = flag;
                    flag = keys[i];
                    flagMain = flag;
                    return;
                }
            }
            for (var w = 0; w < times.length; w++){
                showValidTime(times[w])
                noData = true;
            }
        }
        if (noData){
            return;
        }
        function errorData(err){
            console.log(err);
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
            
            //BEFORE
            if (duration >= times[y] && times[y] >= timeOfDBReservation){
                currReservationBefore += parseInt(childNodes.val().size);
            }
            //AFTER
            if ( times[y] <= timeOfDBReservation &&  timeOfDBReservation <= seatedDuration ){
                currReservationAfter += parseInt(childNodes.val().size);
            }
        }
        function countReservationsNoPref(weekTime, childNodes, times, inputSize, locationOfReservation){
            
            var timeOfDBReservation = parseInt(childNodes.val().time.replace(":", "").replace(" PM", "").replace(" ", "").trim());
            
            var duration = eatingTime(weekTime, timeOfDBReservation, parseInt(childNodes.val().size));
                        
            var seatedDuration = eatingTime(weekTime, times[y], inputSize);
            
            
            //BEFORE
            if (locationOfReservation === "inside" && duration >= times[y] && times[y] >= timeOfDBReservation){
                currReservationInsideBefore += parseInt(childNodes.val().size);
            }
            //AFTER
            if (locationOfReservation === "inside" && times[y] <= timeOfDBReservation &&  timeOfDBReservation <= seatedDuration ){
                currReservationInsideAfter += parseInt(childNodes.val().size);
            }
            
            
            if (locationOfReservation === "outside" && duration >= times[y] && times[y] >= timeOfDBReservation){
                currReservationOutsideBefore += parseInt(childNodes.val().size);
            }
            //AFTER
            if (locationOfReservation === "outside" && times[y] <= timeOfDBReservation &&  timeOfDBReservation <= seatedDuration ){
                currReservationOutsideAfter += parseInt(childNodes.val().size);
            }
            
        } 
        
        //LOOP OVER DATABASE FOR EACH TIME
        for (var y=0; y<times.length; y++){
            currReservationBefore = 0;
            currReservationAfter = 0;
            
            currReservationInsideBefore = 0;
            currReservationInsideAfter = 0;
            currReservationOutsideBefore = 0;
            currReservationOutsideAfter = 0;
            
            var requestedSeatingLocation = app.seating.toLowerCase();            
            //CONVERT ALL INSIDE TABLES TO INSIDE
            
            db.ref("reservations/" + flag + "/info/").on("value", function(snapshot) {
              snapshot.forEach(function(childNodes){
                  
                  var locationOfReservation = childNodes.val().location.toLowerCase();
                  if (locationOfReservation === "w1" | locationOfReservation === "w2" | locationOfReservation === "w3" | locationOfReservation === "inside 4" | locationOfReservation === "inside 5"){
                          locationOfReservation = "inside";
                  }
                  //CONVERT ALL OUTSIDE TABLES TO OUTSIDE 
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
                  console.log("The read failed: " + errorObject.code);
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
        //console.log("+++++++++++++")
      }
    },
      sendEmail: function(){
          $("#confirmationScreen1")[0].style.display = "none";
          $("#confirmationScreen2")[0].style.display = "block";
          Email.send("andrewjoliver3@gmail.com",
            "ajo14@duke.edu",
            "DELETE ME - Reservation",
            "Party Name: " + this.firstname + " " + this.lastname 
            + '<br/>' + "Date: " + this.datePrint 
            + '<br/>' + "Number of guests: " + this.size 
            + '<br/>' + "Time: " + this.timePrint 
            + '<br/>' + "Seating Preference: " + this.seating 
            + '<br/>' + "Party Accommodations: " + this.accommodationsPrint 
            + '<br/>' + "Phone Number: " + this.phonePrint 
            + '<br/>' + "Email: " + this.email 
            + '<br/>' + "------------------",
            "smtp.elasticemail.com",
            "andrewjoliver3@gmail.com",
            "20fde7aa-c0a4-4289-84e1-859febb782fc",
            function done(message) { return; } 
          );
          db.ref('reservations/' + flagMain + '/info/').push({
                size: this.size,
                time : this.timePrint,
                location: this.seating,
                name: this.firstname + " " + this.lastname,
                phone: this.phonePrint,
                email: this.email,
                accommodations: this.accommodationsPrint
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
        },
        timingInfo: function(){
            $("#reservationScreen1")[0].style.display = "block";
            $("#placeholderCol")[0].style.display = "block";
            $("#reservationScreen2")[0].style.display = "none";
            $("#backArrow1")[0].style.display = "none";
        },
  },
    firebase() {
        return {
            reservationsLog:  reservationsLogRef,
        };
    },
});


//SET DEFAULT SEATING PREFERENCE TO NO PREF
app.selectSeat('nopref', 'No Preference')