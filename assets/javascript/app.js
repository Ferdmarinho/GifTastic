//GIPHY API Call

var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=aB3TCW9OK3xEhKLamCYmY0vnwDuLnHke&limit=5");
xhr.done(function(data) { console.log("success got data", data); });

// Initial array of foods -----------------------------------------------------------------------------------
var food = ["wine", "chocolat", "cheese", "sauce"];

// Generic function for capturing the food name from the data-attribute
function keywordGif() {
  var foodName = $(this).attr("data-name");

}

// Function for displaying buttons list
function listButtons() {

  // Deleting foods prior to add new foods
  // (this is necessary otherwise we will have repeat buttons)
  $("#list_buttons").empty();

  // Loop for the array of foods
  for (var i = 0; i < food.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of key to our button
    a.addClass("key");
    // Adding a data-attribute
    a.attr("data-name", food[i]);
    // Providing the initial button text
    a.text(food[i]);
    // Adding the button to the HTML
    $("#list_buttons").append(a);
  }
}

//What happens when to click the button to add a keyword
$("#add-keyword").on("click", function(event) {
  // according to examples, don't need this to submit a form (that's the defaut)
  event.preventDefault();
  // grabbing the keyworkd from the textbox
  var keyword = $("#movie-input").val().trim();

  // Adds from the textbox to our array
  food.push(keyword);

  //GIPHY! This will trigger the button to get the GIPHy search
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=aB3TCW9OK3xEhKLamCYmY0vnwDuLnHke&q=" + food + "&limit=25&offset=0&rating=R&lang=en";
  $.ajax({
  url: queryURL,
  method: "GET"
  }).then(function (response) {
  console.log(response);
  $("#key").text(JSON.stringify(response));
  });
  // Call lisButtons to show the keywords added as buttons!
  listButtons();

});

// Function for displaying the movie info
// We're adding a click event listener to all elements with the class "key"
// We're adding the event listener to the document because it will work for dynamically generated elements
// $(".movies").on("click") will only add listeners to elements that are on the page at that time
$(document).on("click", ".key", keywordGif);

// Calling the listButtons function to display the intial buttons
listButtons();


//This is the search URL according to GIPHY
//https://api.giphy.com/v1/gifs/search?api_key=aB3TCW9OK3xEhKLamCYmY0vnwDuLnHke&q=design&limit=25&offset=0&rating=R&lang=en
