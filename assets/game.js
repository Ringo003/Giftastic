// ----- Game Variables ----- //

// Initial array of car
var animalsArr = ["Plymouth GTX ", "Dodge Challenger", "Ford Mustang", "Ford Cobra Mustang",
                  "Plymouth Cuda'", "Chevy Corvette", "Plymouth Roadrunner"];

// ----- Helper Functions ----- //

// renderButtons will display the car buttons for all car within the
// animalsArr array.
function renderButtons() {
  // Empty the buttons panel before redrawing it
  $("#buttonPanel").empty();

  // Loop through the array of car
  for (var i = 0; i < animalsArr.length; i++) {
    // Dynamicaly generate a button for each car in the array
    var button = $("<button>");
    button.addClass("carButton");
    button.attr("data-car", animalsArr[i]);
    button.text(carArr[i]);

    // Add the button to the HTML
    $("#buttonPanel").append(button);
  }
}

// ----- Event Handlers ----- //

// An event handler for the user form to add additional car to the array
$("#add-car").on("click", function(event) {
  event.preventDefault();

  // Get the input from the textbox
  var car = $("#car-input").val().trim();

  // The car from the textbox is then added to our carArr array
  carArr.push(car);
  $("#car-input").val("");

  // Redraw the car buttons
  renderButtons();
});

// fetchcarGifs will fetch car Gifs with the Giphy API
function fetchcarGifs() {
  // Get the animal name from the button clicked
  var carName = $(this).attr("data-animal");
  var carStr = carName.split(" ").join("+");

  // Construct the Giphy URL
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + carStr + 
                 "&rating=pg-13&limit=20&api_key=dc6zaTOxFJmzC";

  // Make the AJAX call to the Giphy API
  $.ajax({
    method: "GET",
    url: queryURL,
  })
  .done(function( result ) {
    // Get the results array
    var dataArray = result.data;

    // Create and display div elements for each of the returned Gifs
    $("#gifPanel").empty();
    for (var i = 0; i < dataArray.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("carGif");

      var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
      newDiv.append(newRating);

      var newImg = $("<img>");
      newImg.attr("src", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newDiv.append(newImg);

      // Append the new Gifs to the gifPanel
      $("#gifPanel").append(newDiv);
    }
  });
}

// animateCarGif will animate a still Gif and stop a moving Gif
function animateCarGif() {
  // The image state will be either "still" or "animated"
  var state = $(this).find("img").attr("data-state");

  // Make the Gif either animated or still depending on the "data-state" value
  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}

// Render the initial animal buttons when the HTML has finished loading
$(document).ready(function() {
  renderButtons();
});

// An event handler for the animal buttons to fetch appropriate Gifs
$(document).on("click", ".carButton", fetchCarGifs);

// Add an event handler for the animal Gifs to make the image animate and stop
$(document).on("click", ".carGif", animateCarGif);