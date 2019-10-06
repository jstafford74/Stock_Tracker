function getTickerHistData(tickerData) {

    var startDate = (moment().format("MM")) + "/"
        + (moment().format("DD")) + "/"
        + (moment().format("YYYY") - 1);
    // Conert to milliseconds
    startDate = parseInt((moment(startDate) / 1000));
    console.log("startDate: " + startDate);

    dateNowSeconds = parseInt((moment() / 1000));
    console.log("dateNowSeconds: " + dateNowSeconds);

    var priceResults = [];
    var volResults = [];
    var dayDate = [];

    //Chart data API
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-historical-data?frequency=1d&filter=history&period1=" + startDate + "&period2=" + dateNowSeconds + "&symbol=" + tickerData,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": apiKey
        }
    }

    console.log("queryURL: " + settings.url);


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

            for (var i = (chartResponse.prices.length - 1); i > 0; i--) {
                priceResults.push(chartResponse.prices[i].close);
                volResults.push(chartResponse.prices[i].volume / 1000000);
                dayDate.push(moment((chartResponse.prices[i].date) * 1000).format("MMM Do YY"));
            }

            console.log("priceResults: " + priceResults);
            console.log("volResults: " + volResults);
            console.log("dayDate: " + dayDate);

            var mixedChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    datasets: [{
                        label: 'Volume (mil.)',
                        //Adding in 2nd axis
                        yAxisID: 'B',
                        data: volResults
                    }, {
                        label: 'Stock Price (US$)',
                        //Adding in 2nd axis
                        yAxisID: 'A',

                        data: priceResults,

                        // Changes this dataset to become a line
                        type: 'line'
                    }],
                    labels: dayDate
                },
                options: {
                    scales: {
                        yAxes: [{
                          id: 'A',
                          type: 'linear',
                          position: 'left',
                        }, {
                          id: 'B',
                          type: 'linear',
                          position: 'right',
                          ticks: {
                            // max: 1,
                            // min: 0
                          }
                        }]
                      }
                  
                }
            });
        });
}
