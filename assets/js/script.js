$(document).ready(function () {
    var cities = JSON.parse(localStorage.getItem("cities")) || []
    $("#submitCity").on("click", function(event) {
        event.preventDefault();

        var newCity = $("#city-input").val().trim();
        cities.push(newCity);
        localStorage.setItem("cities", JSON.stringify(cities));
        renderButtons();
        displayCityInfo(newCity);
    })
    
    function displayCityInfo(city) {
        console.log(city);
        var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=189f9bd2ae9fd98a8c9c5146ac5556b0`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(city);
            $("#currentCity").text(response.name);

            var cityTemp= (((response.main.temp)-273.15)*(9/5)+32).toFixed(1); //showing stats for the first city searched
            $("#cityTemp").text("Temperature: " + cityTemp + " *F");
            console.log(cityTemp);

            var cityHumidity= response.main.humidity.toFixed(1);//showing stats for the first city searched
            $("#cityHumidity").text("Humidity: " + cityHumidity + "%");
            console.log(cityHumidity);

            var cityWindSpeed= response.wind.speed.toFixed(1);//showing stats for the first city searched
            $("#cityWind").text("Wind Speed: " + cityWindSpeed + " MPH");
            console.log(cityWindSpeed);
        });
    }
    function renderButtons() {
        $("#cityHistory").empty();
        for (var i = 0; i < cities.length; i++) {
            var a = $("<li>");
            a.addClass("city");
            var cityButton= $("<button>");
            cityButton.addClass("btn rounded");
            cityButton.text(cities[i]);
            
            var fiveDayURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cities}&appid=189f9bd2ae9fd98a8c9c5146ac5556b0`;
            
            $.ajax({
                url: fiveDayURL,
                method: "GET"
            }).then(function (fiveDay) {
                // console.log(fiveDay);
                // var temp = fiveDay;
                // console.log(temp);
            });

            cityButton.on("click", function(){
                displayCityInfo($(this).text());
                // console.log($(this).text()); //.text is a jQuery. this is a javascript concept so we had to wrap it inside jQuery.
            });
            a.append(cityButton)
            $("#cityHistory").prepend(a);
        };
    };
    renderButtons();
});
