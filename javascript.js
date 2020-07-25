let city = " ";
var apiKey = "d2dc4b5a67f8f43f9ff13956727536e2";

$("#Search-Btn").on("click", function () {
  if (city == " ") {
    return;
  } else {
    var city = $("#input-city").val().trim();
  }
  getForecast(city);
});

function getForecast(city) {
  let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey

  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);


    $("#main-card").empty()



    let date = response.dt
    let cityDate = new Date(date * 1000).toLocaleDateString("en-US")

    var wIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
    var card = $("<div>").addClass("card");
    var cardBody = $("<div>").addClass("card-body")
    var cityName = $("<h2>").addClass("card-title").text(response.name + " " + "(" + cityDate + ")");
    var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + response.main.temp + "°F");
    var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    var windSpeed = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    $("#main-card").append(card)
    card.append(cardBody)
    cardBody.append(cityName, temperature, humidity, windSpeed)
    $(".card-title").append(wIcon)
  });

}