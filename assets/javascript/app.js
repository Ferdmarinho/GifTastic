//GIPHY API Call

var food = ['wine','chocolat','cheese','pizza'];

var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=qQ0LQq49j0vnEylR5TyfMMEiuCje5z0c&limit=5");
xhr.done(function (data) {
    console.log("success got data", data)
});

var title = "The%20Lord+Of+The+Rings";
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + title + "&api_key=qQ0LQq49j0vnEylR5TyfMMEiuCje5z0c&limit=5";


$(document).ready(function () {

    // Append Intial animal buttons
    rendergifbuttons();


    function rendergifbuttons() {
        $("#gif-display").empty(); // empties out the html

        // render our todos to the page
        for (var i = 0; i < food.length; i++) {
            // Then set the to-do "value" as text to this <button> element.

            var gifitem = $('<button>');
            gifitem.attr("data-gif", food[i]);
            gifitem.addClass("load-gif");
            gifitem.text(food[i]);

            // Create a button with unique identifiers based on what number it is in the list. Again use jQuery to do this.
            // Give your button a data attribute called data-to-do and a class called "checkbox".
            // Lastly add a checkmark inside.
            // Add the button to the div
            $("#gif-display").append(gifitem);
        }
    }

    $("#add-gif").on("click", function () {

      

        // Get the to-do "value" from the textbox and store it as a variable
        var newdecade = $("#gif").val().trim();

        var isUnique = true;
        for (var i = 0; i < food.length; i++) {
            if (food[i] == newdecade) {
                isUnique = false;
            }
        }

        // Append new button if the input is unique
        if (newdecade == "") {
            alert("Sorry. No empty buttons are allowed!")
        }

        else if (isUnique) {

            // Add the new decade button to the list
            food.push(newdecade);

            // Add new buttons to the DOM
            rendergifbuttons();

            // // Adding our new todo to our local list variable and adding it to l
        }
        else {
            alert("You already have a " + newdecade + " button!")
        }

        // Remove the default features of the Submit Button
        return false;

    })


    var title = "The%20Lord+Of+The+Rings";

    $(document).on("click", ".load-gif", function () {
        var gifnumber = $(this).attr("data-gif"); 
        console.log(gifnumber);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifnumber + "&api_key=qQ0LQq49j0vnEylR5TyfMMEiuCje5z0c&limit=5";
        // IF CALLING THE FUNCTION ONLY ONCE, PUT IT INSIDE THE FUNCTION //
        // IF CALLING THE FUNCTION MORE THAN ONCE, LEAVE IT OUTSIDE THE FUNCTION

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);
            for (var i = 0; i < response.data.length; i++) {

                // Collect the animal gif URLs
                var imageurl = response.data[i].images.fixed_height.url; // moving image
                var $img = $('<img>');
            

                $("#gif-display").append($img);
                $img.attr("src", imageurl);
              



            }

        });
    });

});

