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

// When the Search button is clicked...
$(document.body).on("click", ".newTicker", function () {
    // Grabbing and storing the data-name property value from the button
    var tickerData = $(this).attr("data-name");
    console.log("tickerData: " + tickerData)


    //Market summary data API
    var marketSummary = {
        "async": true,
        "crossDomain": true,
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=US&lang=en",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": apiKey
        }
    }

    console.log("url: " + marketSummary.url);

    $.ajax(marketSummary).done(function (mktSummResponse) {
        console.log(mktSummResponse);
    })
        // After data comes back from the request
        .then(function (mktSummResponse) {

            // storing the data from the AJAX request in the results variable
            // var results = response.data;
            mktSummResults = mktSummResponse.chart.result[0].meta.symbol;
            console.log(mktSummResults);

            // Identifying output area for GIFs (used to distinguish between the main area and the favorites area)
            tickerDestDiv = "tickerOutput";

            // Upload GIF and select details to the DOM
            populateDiv(mktSummResults, tickerDestDiv);
        });

    // End of market summary data API

    //Chart data API
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=5m&region=US&symbol=" + tickerData + "&lang=en&range=1d",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": apiKey
        }
    }

    $.ajax(settings).done(function (chartResponse) {
        console.log(chartResponse);
    })
        //End of chart data API

        // After data comes back from the request
        .then(function (chartResponse) {

            // storing the data from the AJAX request in the results variable
            chartResults = chartResponse.chart.result[0].meta.symbol;
            console.log("chartResults: " + chartResults);


            // Identifying output area for GIFs (used to distinguish between the main area and the favorites area)
            tickerDestDiv = "tickerOutput";

            // Upload GIF and select details to the DOM
            populateDiv(chartResults, tickerDestDiv);
        });
});


// Writing the data selected to the DOM
function populateDiv(results, destDiv) {

    // Clear favorites div before populating (to ensure no duplicates are displayed)
    if (destDiv === "favOutput") {
        $("#favOutput").html("");
    }

    // Looping through each result item
    for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var tickerDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var tickerP = $("<p>").text("Title: " + results[i].title);
        tickerP.append("<br/>" + "Rating: " + results[i].rating);
        tickerP.append("<br/>" + "Import date: " + results[i].import_datetime);

        // Creating and storing an image tag
        var tickerImg = $("<img>");

        // Give tickerImg the ticker class, so it can be identified when clicked
        tickerImg.addClass("ticker");
        tickerImg.attr("src", results[i].images.fixed_height.url);

        // Adding Save to favorites button  
        favBtn = $("<button>");
        favBtn.addClass("favGIF");

        //Adding a Bootstrap class for formatting only
        favBtn.addClass("btn btn-success");
        //Add attributes to the favorite button, to be passed on if clicked
        favBtn.attr("data-link", results[i].images.fixed_height.url);
        favBtn.attr("data-title", results[i].title);
        favBtn.attr("data-rating", results[i].rating);
        favBtn.attr("data-import_datetime", results[i].import_datetime);
        favBtn.attr("data-slug", results[i].slug);

        favBtn.text("Save as favorite");

        // Appending the paragraph and image tag to the tickerDiv
        tickerDiv.append(tickerP);
        // tickerDiv.append("<br/>");
        tickerDiv.append(tickerImg);
        tickerDiv.append("<br/>");

        //Do not show 'Save to favorites' button in Favs pane
        if (destDiv === "favOutput") {
        } else {
            tickerDiv.append(favBtn);
        }



        // Prependng the tickerDiv to the HTML page in the "#tickerOutput" div
        if (destDiv === "favOutput") {
            $("#favOutput").prepend(tickerDiv);
        } else {
            $("#tickerOutput").prepend(tickerDiv);
        };
    }
}

//Pause / play GIF
$(document.body).on("click", ".ticker", function () {
    var src = $(this).attr("src");
    if ($(this).hasClass('playing')) {
        //stop
        $(this).attr('src', src.replace(/\.ticker/i, "_s.ticker"))
        $(this).removeClass('playing');
    } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.ticker/i, ".ticker"))
    }
});


// Save favorites
$(document.body).on("click", ".favGIF", function () {

    // Display favorites pane only when a favorite has been saved
    document.getElementById("favsContainer").style.display = "flex";

    // Read attributes from 'Save to favorites' button
    var tickerLink = $(this).attr("data-link");
    var tickerTitle = $(this).attr("data-title");
    var tickerRating = $(this).attr("data-rating");
    var tickerImportDT = $(this).attr("data-import_datetime");
    var tickerSlug = $(this).attr("data-slug");

    // Only add to favGIFs if not already added
    if (favsLog.includes(tickerSlug)) { } else {
        favGIFs[k] = {
            images: { fixed_height: { url: tickerLink } },
            title: tickerTitle,
            rating: tickerRating,
            importDT: tickerImportDT
        }

        // Increment counter
        k++;

        favsLog.push(tickerSlug);
        console.log("favsLog: " + favsLog);
    }
});

// Play favorites
$(document.body).on("click", "#playFavs", function () {
    favDestDiv = "favOutput";

    populateDiv(favGIFs, favDestDiv);

});
