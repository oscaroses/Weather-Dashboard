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

  function history(city) {
    if (cityHist.length == 6) {
      cityHist.splice(0, 1)
    }
    city = city.charAt(0).toUpperCase() + city.slice(1)
    $("#cities").empty()
    var citiesArr = {
      city: city,
    }
    cityHist.push(citiesArr)

    for (i = 0; i < cityHist.length; i++)
      var history = $("<button>")
    history.attr("class", "li-btn")
    history.attr("data-li", i)
    history.text(cityHist[i].city)

    $("#cities").prepend(history)
  }
  localStorage.setItem("cityHist", JSON.stringify(cityHist))


}

function getHist() {

  if (localStorage.getItem(cityHist) !== null) {
    let loadHist = JSON.parse(localStorage.getItem(cityHist));
    for (i = 0; i < cityHist.length; i++)
      var history = $("<button>")
    history.attr("class", "li-btn")
    history.attr("data-li", i)
    history.text(loadHist[i].city)

    $("#cities").prepend(history)
    var citiesArr = {
      city = loadHist[i].city
    }
    cityHist.push(citiesArr)
  }

  var citySave = cityHist[cityHist.length - 1]
  var cityLoad = citySave.city;
  getForecast(cityLoad)
}

getHist()

$("#Search-Btn").on("click", function () {
  fiveMain.style.display = " "

  if (city == " ") {
    return;
  } else {
    var city = $("#input-city").val().trim();
  }
  getForecast(city);
  history(city)
});

$(".li-btn").on("click", function () {
  var histBtn = $(this).text()
  getForecast(histBtn)
})
