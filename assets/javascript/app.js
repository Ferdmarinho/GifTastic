2//GIPHY API Call

var food = ['wine','chocolat','cheese','pizza'];

var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=qQ0LQq49j0vnEylR5TyfMMEiuCje5z0c&limit=5");
xhr.done(function (data) {
    console.log("success got data", data)
});

var title = "searchterm";
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + title + "&api_key=qQ0LQq49j0vnEylR5TyfMMEiuCje5z0c&limit=5";


$(document).ready(function () {

    //Append buttons
    showgifbuttons();

    function showgifbuttons() {
        //So the gifs area doesn't keep adding up a bunch of gifs, it needs to be cleared first
        $("#gif-display").empty(); 

        // render our todos to the page
        for (var i = 0; i < food.length; i++) {
            // Then set the to-do "value" as text to this <button> HTML tag.

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
        var keyword = $("#gif").val().trim();

        var isUnique = true;
        for (var i = 0; i < food.length; i++) {
            if (food[i] == keyword) {
                isUnique = false;
            }
        }

        //Empty keywords are not allowed
        if (keyword == "") {
            alert("No empty buttons")
        }
        //Append new button if the input is unique
        else if (isUnique) {
         // ADDS the keyword typed as a button to the list 
            food.push(keyword);
        // Add new buttons to the DOM
            showgifbuttons();
            // // Adding our new todo to our local list variable
        }
        else {
            alert("There is  " + keyword + " button for that yo!")
        }
        //Submit would usually send info, but we don't need that so
        return false;
    })

    var title = "searchterm";

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

             //To get the GIFs URls 
            var imageurl = response.data[i].images.fixed_height.url; // moving image
            var $img = $('<img>');

            $("#gif-display").append($img);
            $img.attr("src", imageurl);
              
            }

        });
    });

    //TO MAKE THE GIFS STOP AND PLAY







});

