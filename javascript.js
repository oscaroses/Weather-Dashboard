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



    var date = response.dt
    var cityDate = new Date(date * 1000).toLocaleDateString("en-US")
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


    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;
    let uvUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=" +
      key +
      "&lat=" +
      lat +
      "&lon=" +
      lon;
  });

  $.ajax({

    url: uvUrl,
    method: "GET",
  }).then(function (uvresponse) {
    console.log(uvresponse);
  })


  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (fiveresponse) {
    console.log(response);

    for (i = 0; i < 6; i++) {
      var fiveDay = new Date(fiveresponse.daily[i].dt * 1000).toLocaleDateString("en-US");
      var dailyPic = fiveresponse.daily[i].weather[0].icon;
      var dailyIcon = "https://openweathermap.org/img/wn/" + dailyPic + "@2x.png";

      var dateCard = $("<div>").addClass("card daily")
      var iconImg = $("<img>").attr("src", dailyIcon)
      iconImg.attr("alt", "Weather Icon")
      var fiveHigh = fiveresponse.daily[i].temp.max;
      var fiveLow = fiveresponse.daily[i].temp.min;
      var fiveHum = fiveresponse.daily[i].humidity;

      var info1 = $("<p>").text(fiveHigh)
      var info2 = $("<p>").text(fiveLow)
      var info3 = $("<p>").text(fiveHum)

      $("#forecast").append(dateCard + i + fiveDay)
      dateCard.append(info1, info2, info3)
    }
  })




}