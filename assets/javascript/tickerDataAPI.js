function getTickerData(tickerData) {

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
            populateTickerDiv(chartResults, tickerDestDiv);
        });
}
