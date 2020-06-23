
var mechanics = [
	{
		name: "steve",
		days: [1,2]
	},
	{
		name: "john",
		days: [2,3]
	},
	{
		name: "tim",
		days: [3,4]
	},
	{
		name: "bill",
		days: [4,5]
	}
];

$('#navcolDate').click(function() {
	alert("Hello!");
	console.log("o");
	$('body,html').animate({scrollTop: o.top - 80}, 1000);
	return false;
});


// Function to verify that the phone number is correct.
// Here, I validate for (12345), but you have to change that for a phone validation
// Tutorials on Regular expressions
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions 
// https://flaviocopes.com/javascript-regular-expressions/ 
// Regular expressions can get complex, you can think in terms of a series of characters
// or numbers 
function validatePhone() {
    var a = document.getElementById("textPhone").value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits
	// Regular expression inspiré de https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
    var filter = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}

function validateCard() {
	var a = document.getElementById("textCard").value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits
	// Regular expression inspiré de https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
    var filter = /([0-9]{4}[ ]{1}[0-9]{4}[ ]{1}[0-9]{4}[ ]{1}[0-9]{4})/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}

function validate() {
	//validate
	if (!validateCard()) {
		alert("Invalid credit card number");
	}
	else if (!validatePhone()) {
		alert("Invalid phone number");
	}
	else {
		alert("Successfully booked appointment");
	}
}


// Using date restrictions on datepicker
// Document of datepicker is here: https://api.jqueryui.com/datepicker/ 
// The following code shows how to set specific dates to exclude, as well as Sundays (Day 0)
// Make sure in your version that you associate Days to remove with Experts (e.g. John doesn't work Mondays)
var unavailableDates = ["06/29/2020","07/07/2020","07/10/2020"]
const setDateFormat = "mm/dd/yy";

function disableDates(date) {
    // Sunday is Day 0, disable all Sundays
    if (date.getDay() == 0)
        return [false];
    var string = jQuery.datepicker.formatDate(setDateFormat, date);
    return [ unavailableDates.indexOf(string) == -1 ]
}

function restrictDates(date) {
	var mech = document.getElementById("mechanics");
	var i = -1;
	if (mech.options[mech.selectedIndex].value === "any")
		return true;
	i++;

	for (;i < mechanics.length;) {
		if (mech.options[mech.selectedIndex].value === mechanics[i].name) {
			break;
		}
		i++;	
	}
	
	var bool = true;
	for (var j = 0; j < mechanics.length; j++) {
		console.log(mechanics[i].days[j]);
		bool = bool && date != mechanics[i].days[j];
	}
	return bool;
}


// HERE, JQuery "LISTENING" starts
$(document).ready(function(){

    // phone validation, it calls validatePhone
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the phone input
    // The "error" class in style.css defines yellow background and red foreground
    $("#phone").on("change", function(){
        if (!validatePhone("phone")){
            alert("Wrong format for phone");
            $("#phone").val("(xxxx)");
            $("#phone").addClass("error");
        }
        else {
            $("#phone").removeClass("error");
        }
    });

    // To change the style of the calender, look in jqueryui.com, under Themes, in the ThemeRoller Gallery 
    // You can try different themes (the names are under the calendars) / This is Excite Bike 
    // To use a different theme you must include its css in your HTML file. 
    // The one I included in my HTML is the Excite Bike, but you can try others

    // Also, here is a good tutorial for playing with the datepicker in https://webkul.com/blog/jquery-datepicker/ 
    // Datepicker is also documented as one of the widgets here: https://api.jqueryui.com/category/widgets/ 
    $( "#dateInput" ).datepicker(
        {

			
            dateFormat: setDateFormat,
            // no calendar before June 1rst 2020
            minDate: new Date('06/01/2020'),  
            maxDate: '+4M',
            // used to disable some dates
			beforeShowDay: function(day) {
				var date = day.getDay();			
				return[(restrictDates(date) && date != 0 && date != 6)];
			}
        }   
    );


    // Look at the different events on which an action can be performed
    // https://www.w3schools.com/jquery/jquery_events.asp
    // Here, we put 
    $("#debit").on("mouseenter", function(){
        $("#debit").addClass("showInput");
    });

    $("#debit").on("mouseleave", function(){
        $("#debit").removeClass("showInput");
    });
  
    // https://jqueryui.com/tooltip/ 
    // The class "highlight" used here is predefined in JQuery UI
    // the message of the tooltip is encoded in the input (in the HTML file)
    $("#debit").tooltip({
        classes: {
          "ui-tooltip": "highlight"
        }
      });


});