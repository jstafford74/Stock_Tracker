var apiKey = "7eb729d91fmshd56769216684858p17fff1jsna4991481e499";
var tickerImg; // Stores ticker for rendering to div
var favGIFs = [{ url: "", title: "", rating: "", importDT: "", slug: "" }];  //Array to hold favorite GIFs
var favsLog = [];
var k = 0;  // To store favGIFs array index

// Initial array
var tickerCategs = [];

// Function for displaying GIFs
function renderButtons() {

    // Deleting the buttons prior to adding new buttons (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of GIF searches
    for (var i = 0; i < tickerCategs.length; i++) {

        // Then dynamicaly generate buttons for each GIF search in the array
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var newBtn = $("<button>");
        // Adding a class for div population
        newBtn.addClass("newTicker");
        //Adding a Bootstrap class for formatting only
        newBtn.addClass("btn btn-warning");
        // Adding a data-attribute with a value of the ticker search at index i
        newBtn.attr("data-name", tickerCategs[i]);
        // Providing the button's text with a value of the ticker search at index i
        newBtn.text(tickerCategs[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(newBtn);
    }
}

// This function handles events where one button is clicked
$("#searchBtn").on("click", function (event) {

    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var searchString = $("#searchTicker").val().trim();

    // The ticker Search criteria from the textbox is then added to our array
    tickerCategs.push(searchString);

    // calling renderButtons which handles the processing of our GIF array
    renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of GIFs
renderButtons();


// // Save favorites
// $(document.body).on("click", ".favGIF", function () {

//     // Display favorites pane only when a favorite has been saved
//     document.getElementById("favsContainer").style.display = "flex";

//     // Read attributes from 'Save to favorites' button
//     var tickerLink = $(this).attr("data-link");
//     var tickerTitle = $(this).attr("data-title");
//     var tickerRating = $(this).attr("data-rating");
//     var tickerImportDT = $(this).attr("data-import_datetime");
//     var tickerSlug = $(this).attr("data-slug");

//     // Only add to favGIFs if not already added
//     if (favsLog.includes(tickerSlug)) { } else {
//         favGIFs[k] = {
//             images: { fixed_height: { url: tickerLink } },
//             title: tickerTitle,
//             rating: tickerRating,
//             importDT: tickerImportDT
//         }

//         // Increment counter
//         k++;

//         favsLog.push(tickerSlug);
//         console.log("favsLog: " + favsLog);
//     }
// });

// // Play favorites
// $(document.body).on("click", "#playFavs", function () {
//     favDestDiv = "favOutput";

//     populateDiv(favGIFs, favDestDiv);

// });
