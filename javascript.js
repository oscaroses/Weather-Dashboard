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
  });
}

function getCurrentCity(response) {
  $("#main-card").empty()

  var card = $("<div>").addClass("card");
  var cardBody = $("<div>").addClass("card-body")
  var cityName = $("<h1>").addClass("card-title").text(response.name);

  $("#main-card").append(card)
  card.append(cardBody)
  cardBody.append(cityName)
}