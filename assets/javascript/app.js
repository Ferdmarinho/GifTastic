//GIPHY API Call

var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=aB3TCW9OK3xEhKLamCYmY0vnwDuLnHke&limit=5");
xhr.done(function(data) { console.log("success got data", data); });

// Call function to display gifs when clicking on top buttons
$(document).on('click', '.button_gif', displayGifs);


$(document).on('click', '.gif_container', showGifHideImage);


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
    a.addClass("keyname");
    // Adding a data-attribute
    a.attr("data_name", food[i]);
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
  var keyword = $("#keyword-input").val().trim();
  // Adds from the textbox to our array
  food.push(keyword);
  // Call lisButtons to show the keywords added as buttons!
  listButtons();
  event.preventDefault();
});


//To Display GIFS when clicling in each button ----------------------------------------------

function displayGifs(){

  // Deletes old gifs
  $('#gif_display').empty();

  // Collect animal name data attribute from the button, replacing any spaces
  var wordSearch = $(this).attr('data-name');

  // Create the API URL
  var giphyKey = "aB3TCW9OK3xEhKLamCYmY0vnwDuLnHke";
  var limit = "10";
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + wordSearch + "&api_key=" + giphyKey + "&limit=" + limit;
  //console.log(queryURL);

  
  // Creates AJAX call for the specific animal button being clicked
  $.ajax({url: queryURL, method: 'GET'}).done(function(response){

    // Loop through the JSON output to collect each Animal Object
    for(var i = 0; i < response.data.length; i++){

      // Collect the animal gif URLs
      var currentStillURL = response.data[i].images.fixed_height_still.url; // still image 
      var currentMovingURL = response.data[i].images.fixed_height.url; // moving image

      // Collect the animal gif Ratings
      var currentRating = response.data[i].rating;

        // Correct for empty rating
        if(currentRating == ""){
          currentRating = "none";
        }


      //makes a div to add the GIFs and their ratings
      var currentGifDiv = $('<div>');
      currentGifDiv.addClass('gif_container'); // Added a class
      currentGifDiv.attr('data-name', "unclicked"); // Added a Data Attributed for clicked
      
      // adding the rating to the given GIF
      var currentGifRating = $('<h1>');
      currentGifRating.text("Rating: " + currentRating);
      currentGifDiv.append(currentGifRating);

      // Add the still image
      var currentGifImage = $('<img>');
      currentGifImage.addClass('still_gif'); // Added a class for still gif
      currentGifImage.attr("src", currentStillURL);
      currentGifDiv.append(currentGifImage);

      // Append Moving Gif Image
      var currentGif = $('<img>')
      currentGif.addClass('moving_gif'); // Added a class for animated gif
      currentGif.attr("src", currentMovingURL);
      currentGif.hide(); // Hide the moving gif
      currentGifDiv.append(currentGif);

      // Append current Div to the DOM
        $('#gif_display').append(currentGifDiv);

    }

  });	
}

displayGifs();

// Calling the listButtons function to display the intial buttons
listButtons();

function showGifHideImage(){

  // Determine in the gif was already clicked
  var clickTest = $(this).attr('data-name');
  
  // Gif is not clicked yet - Hide the still image & display the moving image
  if(clickTest == "unclicked"){

    var gifChildren = $(this).children();

    // Hide the Still Image
    $(gifChildren[1]).hide();

    // Display the Moving Image
    $(gifChildren[2]).show();

    // Change Data Name to clicked
    $(this).attr('data-name', "clicked");

  }
  // Gif was already clicked - Hide the moving image & show the still image
  else{

    var gifChildren = $(this).children();

    // Hide the Moving Image
    $(gifChildren[2]).hide();

    // Display the Still Image
    $(gifChildren[1]).show();


    // Change Data Name to unclicked
    $(this).attr('data-name', "unclicked");

  }

}

// ===================================================================




//This is the search URL according to GIPHY
//https://api.giphy.com/v1/gifs/search?api_key=aB3TCW9OK3xEhKLamCYmY0vnwDuLnHke&q=design&limit=25&offset=0&rating=R&lang=en
