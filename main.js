// Foursquare API Info
const clientId = '4QWWNWX50EL5OOJ2LP5PCD4EKJSOQOLR2NDUTOMQ22L3II12';
const clientSecret = 'IJ3B0QB2BV00NNQCX2DSRXSQXKE3WWGJ1PBS2V5YRJ1M0A1K';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// APIXU Info
const apiKey = '0c7126c9bd674eea913215444183105';
const forecastUrl = 'http://api.apixu.com/v1/forecast.json?key=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
async function getVenues() {
  const city = $input.val();
  const urlToFetch = (`${url} ${city} &limit=10&client_id= ${clientId} &client_secret= ${clientSecret} &v=20180530`);


try {
  let response = await fetch(urlToFetch);
  if(response.ok) {
    let jsonResponse = await response.json();
   	let venues = jsonResponse.response.groups[0].items.map(location => location.venue);
    console.log(venues);
    return venues;
  }

} catch (error) {
  console.log(error);
}

};
async function getForecast() {
	const urlToFetch = (`${forecastUrl} ${apiKey} &q= ${$input.val()} &days=4&hour=11`);
  try {
    let response = await fetch(urlToFetch);
    if(response.ok) {
      let jsonResponse = await response.json();
      let days = jsonResponse.forecast.forecastday;
      console.log(days);
      return days;
    }

  } catch (error) {
    console.log(error);
  }
}


// Render functions
function renderVenues(venues) {
  $venueDivs.forEach(($venue, index) => {
    let venueContent =
    '<h2>'+ venues[index].name + '</h2>' + '<img class="venueimage" src="' + imgPrefix + venues[index].photos.groups[0].items[0].suffix + '"/>' + '<h3>Address:</h3>' + '<p>' + venues[index].location.address + '</p>' + '<p>' + venues[index].location.city + ', ' + venues[index].location.state + '</p>' + '<h3>Rating: ' + veunes[index].rating + '</h3>' + '<p><a href="' + venues[index].url + '">Website</a></p>';
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

function renderForecast(days) {
  $weatherDivs.forEach(($day, index) => {
    let weatherContent =
      '<h2> High: ' + days[index].day.maxtemp_f + '</h2>' +
      '<h2> Low: ' + days[index].day.mintemp_f + '</h2>' +
      '<p> sunrise: ' + days[index].astro.sunrise + '</p>' +
      '<p> sunset: ' + days[index].astro.sunset + '</p>' +
      '<img src="http://' + days[index].hour[0].condition.icon +
      //'" class="weathericon" />' +
      '<p>' + days[index].day.condition.text + '</p>' +
      '<h2>' + weekDays[(new Date(days[index].date)).getDay()] + '</h2>';
    $day.append(weatherContent);
  });
}

funtion executeSearch() {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues.then(venues => renderVenues(venues));
  getForecast.then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)
