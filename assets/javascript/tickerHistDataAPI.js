function getTickerHistData(tickerData) {

    var dateToday = new Date();
    console.log(dateToday);
    var startDate = (moment(dateToday).format ("MM")) + "/"
    + (moment(dateToday).format ("DD")) + "/"
    + (moment(dateToday).format ("YYYY")-1);
    console.log("startDate: " + startDate);

    //Date and time right now in milliseconds (for queryURL)
    var msDateNow = Date.now();
    console.log(msDateNow);

    var priceResults = [];
    var volResults = [];
    var dayDate = [];

    //Chart data API
    var settings = {
        "async": true,
        "crossDomain": true,
        // "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=5m&region=US&symbol=" + tickerData + "&lang=en&range=1d",
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-historical-data?frequency=1d&filter=history&period1=1546448400&period2=1562086800&symbol=" + tickerData,
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


            // Identifying output area for GIFs (used to distinguish between the main area and the favorites area)
            tickerDestDiv = "tickerOutput";
            // Upload GIF and select details to the DOM
            // populateTickerDiv(chartResults, tickerDestDiv);
            // tickerHistChart();

            var ctx = document.getElementById('myChart').getContext('2d');

            for (var i = 0; i < chartResponse.prices.length; i++) {
                priceResults.push(chartResponse.prices[i].close);
                volResults.push(chartResponse.prices[i].volume/1000000);
                dayDate.push(moment(chartResponse.prices[i].date).format("MMM Do YY"));
            }
 
            console.log("priceResults: " + priceResults);
            console.log("volResults: " + volResults);
            console.log("dayDate: " + dayDate);

            var mixedChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    datasets: [{
                        label: 'Volume (mil.)',
                        data: volResults
                    }, {
                        label: 'Stock Price (US$)',
                        data: priceResults,

                        // Changes this dataset to become a line
                        type: 'line'
                    }],
                    labels: dayDate
                },
                options: {}
            });
        });
}
