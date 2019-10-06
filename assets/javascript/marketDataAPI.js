function getMarketData() {

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
            mktSummResults = mktSummResponse.marketSummaryResponse.result[1].regularMarketChange.fmt;
            console.log("DJI change today: " + mktSummResults);

            // Identifying output area for GIFs (used to distinguish between the main area and the favorites area)
            marketDestDiv = "marketOutput";
            populateMarketDiv(mktSummResults, marketDestDiv);
        });

    // End of market summary data API
}