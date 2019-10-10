function getTickerHistData(tickerData, period) {

    var startDate = (moment().format("MM")) + "/"
        + (moment().format("DD")) + "/"
        + (moment().format("YYYY") - period);
    console.log("period: " + period);

    // Convert to seconds
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
            // tickerDestDiv = "tickerOutput";
            chartsCounter ++
            if (chartsCounter > 6) {
                chartCounter = 1;
            } 
            var chartsDivRef = chartsLog[chartsCounter - 1];
            console.log("chartsDivRef: " + chartsDivRef);

            $("#tickerChartHeader"+ chartsDivRef).html(tickerData);
            addPeriodButtons(chartsDivRef);

            var ctx = document.getElementById('myChart' + chartsDivRef).getContext('2d');
            console.log("ctx: " + ctx);

            for (var i = (chartResponse.prices.length - 1); i > 0; i--) {
                priceResults.push(chartResponse.prices[i].close);
                // priceResults.push(chartResponse.prices[i].close.toPrecision(4));
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
                        backgroundColor: 'darkblue',
                        data: volResults
                    }, {
                        label: 'Stock Price (US$)',
                        //Adding in 2nd axis
                        yAxisID: 'A',
                        backgroundColor: 'green',
                        data: priceResults,
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
                          labelString: 'Stock Price (US$)',
                        }, {
                          id: 'B',
                        //   type: 'linear',
                          position: 'right',
                          labelString: 'Volume',
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
