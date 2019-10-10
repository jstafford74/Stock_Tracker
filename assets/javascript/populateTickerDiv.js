// Writing the data selected to the DOM
function populateTickerDiv(results, destDiv) {

    // Creating and storing a div tag
    var outputDiv = $("<div>");

    // Creating a paragraph tag with the result item's rating
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
}
