let cityHist = [];
let city = " ";
var apiKey = "d2dc4b5a67f8f43f9ff13956727536e2";
var fiveMain = document.getElementById("FC-P")

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

    let lat = response.coord.lat;
    let lon = response.coord.lon;
    let uvUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=" +
      apiKey +
      "&lat=" +
      lat +
      "&lon=" +
      lon;

    $.ajax({
      url: uvUrl,
      method: "GET",
    }).then(function (uvresponse) {
      console.log(uvresponse);
      let uvValue = uvresponse.value
      var uvButton = $("<button>").addClass("uv-btn")

      if (uvValue <= 2) {
        uvButton.attr("style", "background-color: green");
      } else if (uvValue >= 3 && uvValue < 6) {
        uvButton.attr("style", "background-color: yellow");
      } else if (uvValue >= 6 && uvValue < 8) {
        uvButton.attr("style", "background-color: orange");
      } else if (uvValue >= 8 && uvValue < 11) {
        uvButton.attr("style", "background-color: red");
      } else if (uvValue >= 11) {
        uvButton.attr("style", "background-color: darkviolet");
      }



      uvButton.text(uvresponse.value)
      var uvText = $("<p>")
      uvText.text("UV: ")
      uvText.append(uvButton)
      cardBody.append(uvText)
    })

    var dailyUrl =
      "https://api.openweathermap.org/data/2.5/onecall?" +
      "lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=current,minutely,hourly&units=imperial&appid=" +
      apiKey;


    $.ajax({
      url: dailyUrl,
      method: "GET",
    }).then(function (fiveresponse) {
      console.log(response);
      $("#forecast").empty()

      for (i = 1; i < 6; i++) {
        var fiveDay = new Date(fiveresponse.daily[i].dt * 1000).toLocaleDateString("en-US");
        var dailyPic = fiveresponse.daily[i].weather[0].icon;
        var dailyIcon = "https://openweathermap.org/img/wn/" + dailyPic + "@2x.png";

        var dateCard = $("<div>").addClass("card-body bg-primary daily")
        var iconImg = $("<img>").attr("src", dailyIcon)
        iconImg.attr("alt", "Weather Icon")
        var fiveHigh = fiveresponse.daily[i].temp.max;
        var fiveLow = fiveresponse.daily[i].temp.min;
        var fiveHum = fiveresponse.daily[i].humidity;

        var info1 = $("<p>").text("High: " + fiveHigh)
        var info2 = $("<p>").text("Low: " + fiveLow)
        var info3 = $("<p>").text("Humidity: " + fiveHum)


        dateCard.append(fiveDay, iconImg, info1, info2, info3)
        $("#forecast").append(dateCard)
      }
    })

  });
}

function oldCity(city) {
  if (cityHist.length == 6) {
    cityHist.splice(0, 1)
  }
  city = city.charAt(0).toUpperCase() + city.slice(1)
  $("#cities").empty()
  var citiesArr = {
    city: city,
  }
  cityHist.push(citiesArr)

  for (i = 0; i < cityHist.length; i++) {
    let history = $("<button>").addClass("list-group-item history-btn")
    history.attr("class", "li-btn")
    history.attr("data-li", i)
    history.text(cityHist[i].city)

    $("#cities").prepend(history)
  }
  localStorage.setItem("cityHist", JSON.stringify(cityHist))
}

function getHist() {

  if (localStorage.getItem("cityHist") !== null) {
    let loadHist = JSON.parse(localStorage.getItem("cityHist"));
    for (i = 0; i < loadHist.length; i++) {
      let history = $("<button>").addClass("list-group-item history-btn")
      history.attr("class", "li-btn")
      history.attr("data-li", i)
      history.text(loadHist[i].city)

      $("#cities").prepend(history)
      var citiesArr = {
        city: loadHist[i].city
      }
      cityHist.push(citiesArr)
    }
    var citySave = cityHist[cityHist.length - 1]
    var cityLoad = citySave.city;
    getForecast(cityLoad)
  }
}

getHist();

$("#Search-Btn").on("click", function () {
  fiveMain.style.display = "inline"
  if (city == " ") {
    return;
  } else {
    var city = $("#input-city").val().trim();
  }
  getForecast(city);
  oldCity(city)
});

$(".li-btn").on("click", function () {
  var histBtn = $(this).text()
  getForecast(histBtn)
})
