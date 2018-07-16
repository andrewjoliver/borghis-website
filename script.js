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
    console.log(value + "  " + x);
    document.getElementById("myBar").style.width = (value) * 28.571429/4 + "%";
    navbarColor(x);
    
    if ($(window).width() < 768){
        $('#hamburgerContainer')[0].style.visibility = "visible";
        $(".bg .container-fluid #navbar")[0].style.visibility = "hidden";
        $(".progress-container")[0].style.visibility = "visible";
    }
}
myFunction();
function showDropDownMenu(){
    $('#hamburgerContainer')[0].style.visibility = "hidden";
    $(".bg .container-fluid #navbar")[0].style.visibility = "visible";
    $(".progress-container")[0].style.visibility = "hidden";
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
            size: "",
            email: "",
            phone: "",
            phonePrint: "",
            seating: "",
            accommodations: [],
            accommodationsPrint: "",
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
      checkForm: function() {
          var checkedItems = [this.firstname, this.lastname, this.size, this.date, this.time, this.email, this.phone, this.seating];
          var checkedItemsDisplay = ["first name", "last name", "party size", "date", "time", "email", "phone number", "seating location"];
          for (var x= 0 ; x<8; x++){
              if (checkedItems[x] === ""){
                  alert("Please enter a " + checkedItemsDisplay[x]) + ".";
              }
          }
          if (! this.validEmail(this.email)){
              alert("Please enter a valid email");
          }
          if (! this.validPhone(this.phone)){
              alert("Please enter a valid phone number");
          }
          if (! this.validSize(this.size)){
              alert("Please enter a valid party size");
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
          this.formatPhone(this.phone);
          this.seating = loc;
          $("#inside")[0].style.backgroundColor = "white";
          $("#outside")[0].style.backgroundColor = "white";
          $("#nopref")[0].style.backgroundColor = "white";
          $("#" + id)[0].style.backgroundColor = "#7bc7dd";
          $("#" + id)[0].style.color = "black";
      },
      selectAcc: function(id, acc){
          if (id === "other"){
              console.log(app.other);
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
      selecTime: function(time){
          this.time = time;
      },
      checkAvailability: function(){
          var inputDate = this.datePrint;
          var inputSize = this.size;
          var weekday = String(this.date).slice(0,3);
          var flag = "";
          
          reservationsLogRef.on('value', getData, errorData);

        function getData(data){
            var reservations = data.val();
            var keys = Object.keys(reservations);

            for (var i = 0; i < keys.length; i++){
                var k = keys[i];
                if (reservations[k].date === inputDate){
                    flag = keys[i];
                }
            } 
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
            $("#time" + time.toString()).replaceWith("<div id=\"time" + time.toString() + "\" class=\"col\" @click=\"selectTime(\"" + time.toString() + "\")\"><p id=\"availableTime\">" + time.slice(0,1) + ":" + time.slice(1,3) + "</p></div>");
            $("#time" + time.toString() +" p")[0].style.border = "5px solid #7bc7dd";
            $("#time" + time.toString() +" p")[0].style.borderRadius = "100px";
        }   
        
          var times = [500, 530, 600, 630, 730, 800, 830, 900, 930, 1000]; 
          
        db.ref("reservations/" + flag + "/info/").on("value", function(snapshot) {
              snapshot.forEach(function(childNodes){
                  var currReservationNum = 0;
                  if (childNodes.val().location.toLowerCase() === app.seating.toLowerCase()){
                      if (weekday === "Mon" || weekday === "Tue" || weekday === "Wed"){
                          
                          var timeNum = parseInt(childNodes.val().time.replace(":", ""))
                          var seatedDuration = eatingTime("monWed", timeNum, childNodes.val().size);
                          
                          for (var x = 0 ; x < times.length; x++){
                              if ( eatingTime("monWed", times[x], inputSize) < timeNum ){
                                  currReservationNum += parseInt(childNodes.val().size);
                                  
                              }
                              if (timeNum < times[x] && times[x] < seatedDuration){
                                  currReservationNum += parseInt(childNodes.val().size);
                              }
                              if (currReservationNum + inputSize < 21){
                                  showValidTime(times[x].toString());
                              }
                          }
                          
                      }
                      else{}
                  }
              });
            },
            function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            });  
        },
  },
    firebase() {
        return {
            reservationsLog:  reservationsLogRef,
        };
    },
});