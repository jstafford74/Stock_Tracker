function addPeriodButtons(chartsDivRef) {

    // $("#periodButtons").html("");

    addPeriodButton('1y', 1);
    addPeriodButton('2y', 2);
    addPeriodButton('3y', 3);
    addPeriodButton('5y', 5);
    addPeriodButton('10y', 10);

    function addPeriodButton(period_text, period) {

        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var newBtn = $("<button>");
        // Adding a class for click recognition
        newBtn.addClass("periodBtn");
        // Adding a class for div population
        newBtn.addClass(period_text);
        //Adding a Bootstrap class for formatting only
        newBtn.addClass("btn btn-warning");
        // Adding a data-attribute with a value of the gif search at index i
        newBtn.attr("data-name", period);
        // Adding a data-attribute to identify it as a period button (so will not generate new graph div)
        newBtn.attr("data-type", "periodSwitch");
        // Add data attribute to log which chartsDiv you are working in
        newBtn.attr("data-chartsdivref", chartsDivRef);
        // Providing the button's text with a value of the gif search at index i
        newBtn.text(period_text);
        // Adding the button to the HTML
        $("#periodButtons" + chartsDivRef).append(newBtn);
    }
}

