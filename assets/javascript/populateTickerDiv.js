// Writing the data selected to the DOM
function populateTickerDiv(results, destDiv) {

    // Clear favorites div before populating (to ensure no duplicates are displayed)
    if (destDiv === "favOutput") {
        $("#favOutput").html("");
    }

    // Looping through each result item
    // for (var i = 0; i < results.length; i++) {

    // Creating and storing a div tag
    var outputDiv = $("<div>");

    // Creating a paragraph tag with the result item's rating
    // var tickerP = $("<p>").text("Title: " + results[i].title);
    var outputP = $("<p>").text("Ticker: " + results);
    outputP.append("<br/>" + results);

    // // Creating and storing an image tag
    // var tickerImg = $("<img>");

    // // Give tickerImg the ticker class, so it can be identified when clicked
    // tickerImg.addClass("ticker");
    // tickerImg.attr("src", results[i].images.fixed_height.url);

    // // Adding Save to favorites button  
    // favBtn = $("<button>");
    // favBtn.addClass("favGIF");

    // //Adding a Bootstrap class for formatting only
    // favBtn.addClass("btn btn-success");
    // //Add attributes to the favorite button, to be passed on if clicked
    // favBtn.attr("data-link", results[i].images.fixed_height.url);
    // favBtn.attr("data-title", results[i].title);
    // favBtn.attr("data-rating", results[i].rating);
    // favBtn.attr("data-import_datetime", results[i].import_datetime);
    // favBtn.attr("data-slug", results[i].slug);

    // favBtn.text("Save as favorite");

    // Appending the paragraph and image tag to the tickerDiv
    outputDiv.append(outputP);
    // tickerDiv.append("<br/>");
    // tickerDiv.append(tickerImg);
    // tickerDiv.append("<br/>");

    // //Do not show 'Save to favorites' button in Favs pane
    // if (destDiv === "favOutput") {
    // } else {
    //     tickerDiv.append(favBtn);
    // }

    // Prependng the tickerDiv to the HTML page in the "#tickerOutput" div
    if (destDiv === "favOutput") {
        $("#favOutput").prepend(outputDiv);
    } else {
            $("#tickerOutput").prepend(outputDiv);
    }
}
