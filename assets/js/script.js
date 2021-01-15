$(document).ready(function () {
    var cities = JSON.parse(localStorage.getItem("cities")) || []
    
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=189f9bd2ae9fd98a8c9c5146ac5556b0`;
    var fiveDayURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cities}&appid=189f9bd2ae9fd98a8c9c5146ac5556b0`;

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

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
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
            
            
            $.ajax({
                url: fiveDayURL,
                method: "GET"
            }).then(function (fiveDay) {
                console.log(fiveDay);
                var temp = fiveDay;
                console.log(temp);
            });


            cityButton.on("click", function(){
                displayCityInfo($(this).text());
                // console.log($(this).text()); //.text is a jQuery. this is a javascript concept so we had to wrap it inside jQuery.
            })
            a.append(cityButton)
            $("#cityHistory").prepend(a);
        }
    }
    renderButtons();





})
