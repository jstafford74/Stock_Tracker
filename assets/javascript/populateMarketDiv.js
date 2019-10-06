// Writing the data selected to the DOM
function populateMarketDiv(results, destDiv) {
    // Creating and storing a div tag
    var outputDiv = $("<div>");

    // Creating a paragraph tag with the result item's rating
    var outputP = $("<p>");
    outputP.append("<br/>" + "DJI change today: " + results);
    // Appending the paragraph and image tag to the tickerDiv
    outputDiv.append(outputP);

    // Prependng the tickerDiv to the HTML page in the "#tickerOutput" div
    $("#marketOutput").append(outputDiv);
}
