var userLat = "";
var userLong = "";
var userZip = "";
var userRadius = "";
var todayDate = new Date();
var endDate = new Date();
endDate.setDate(todayDate.getDate()+4);
endDate.setHours(24);
var eventObj = [{}];
var container1 = document.getElementById('place1');
var container2 = document.getElementById('place2');
var container3 = document.getElementById('place3');
var container4 = document.getElementById('place4');
var container5 = document.getElementById('place5');
var modal = document.getElementById("myModal");
var submit = document.getElementById("submit");

$(document).ready(function() {
    modal.style.display = "block";
    document.getElementById("zipp").value = localStorage.getItem("userZip");
    document.getElementById("radiuss").value = localStorage.getItem("userRadius");
});

submit.onclick = function() {
    // modal submit functionality
    userZip = document.getElementById("zipp").value;
    userRadius = document.getElementById("radiuss").value;
    if (!document.getElementById("zipp").value || !document.getElementById("radiuss").value || !isValidUSZip(userZip) || !isValidRad(userRadius)) {
        
    }
    else {
        takeInput();
        displayTime();
        firstAPI();
        modal.style.display = "none";
    }
}

function isValidUSZip(userZip) {
    // verify inputted zip code as a valid zip code
    return /^\d{5}(-\d{4})?$/.test(userZip);
}

function isValidRad(userRadius) {
    // verify inputted radius as a valid radius value
    return userRadius.length === 2 && !isNaN(Number(userRadius))
}

var takeInput = function() {
    // put userZip and userRadius in localStorage
    localStorage.setItem("userZip", userZip);
    localStorage.setItem("userRadius", userRadius);
}


var displayTime = function() {
    // loop through the 5 upcoming days and append to page
    var mainTitle = document.getElementById("main-title");
    mainTitle.textContent = "Daily Entertainment Outlook";
    for (let i = 0; i < 5; i++) {
        var startDay = moment().isoWeekday();
        var time = moment().day(startDay + i).format('dddd </br> MM/DD');
        $("#day" + (i + 1)).html(time);
    }
    
};

function firstAPI() {
    // convert zip to lat/long for the remaining API calls to use
    fetch('https://api.openweathermap.org/data/2.5/weather?zip=' + userZip + '&appid=cdf22472458b933575b8154ed94c685e&units=imperial&exclude=current,minutely,hourly')
    
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        userLat = data.coord.lat;
        userLong = data.coord.lon;
        secondAPI();
        getEvents();
        }
    );
}

function secondAPI() {
    // weather call
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + userLat + '&lon=' + userLong + '&exclude=current,minutely,hourly&units=imperial&appid=cdf22472458b933575b8154ed94c685e')
    
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // loop through weather data for the 5 upcoming days and append to page
        for (let i = 0; i < 5; i++) {
            var containr = document.getElementById('place' + (i + 1));
            containr.setAttribute("style", "border: 2px solid black;")
            var tempD = document.createElement('p');
            tempD.textContent = 'Day: ' + data.daily[i].temp.day + '°F';
            containr.appendChild(tempD);
            var tempN = document.createElement('p');
            tempN.textContent = 'Night: ' + data.daily[i].temp.eve + '°F';
            containr.appendChild(tempN);
            var foreC = document.createElement('p');
            foreC.textContent = 'Forecast: ' + data.daily[i].weather[0].main;
            containr.appendChild(foreC);
            var iconn = document.createElement('img');
            iconn.src = 'http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png';
            containr.appendChild(iconn);
        }
    })
};

var getEvents = function() {
    // Create and convert date to provide to TM for most recent 5-day search
        // Set up Date Ranges and convert to ISO format
        endDate.setSeconds(0,0);
        var endDateISO = endDate.toISOString();
        endDateISO = endDateISO.replace(".000Z","Z");
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=UpMNgv350gA3fGQjOpjHrZqALQWbo98H&size=50&sort=date,asc&latlong=" + userLat + "," + userLong + "&radius=" + userRadius + "&endDateTime=" + endDateISO;
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            buildDataStructure(data);
            displayEvents();
        })
       .catch((error) => {
        console.log(error);
       alert("Error connecting to Ticketmaster.");
        });
    };
    
    var displayEvents = function() {
        // Name the ul targets to help matching events to the proper display date
        var todayDayNumber = todayDate.getDate();
        for (let daysOut = 1; daysOut < 6; daysOut++) {
           var defineTargets = document.querySelector("#event-list-" + daysOut);
           defineTargets.dataset.target = todayDayNumber;
           todayDayNumber++;
        };
        console.log(eventObj);
        for (let index = 0; index < eventObj.length; index++) {
            // Extract the date from the event date string from TM
            eventDate = new Date (eventObj[index].eventDate);
            targetSelector = eventDate.getDate();
            // Find (and select) list corresponding to the date of the event
            var eventContainerEl = document.querySelector("[data-target='" + targetSelector + "']");
            // Create the elements for the event list items
            eventItemEl = document.createElement("li");
            // Anchor tag to link to the TM site for ticket purchase
            eventLinkEl = document.createElement("a");
            eventLinkEl.setAttribute("href", eventObj[index].eventUrl);
            eventLinkEl.setAttribute("target", "_blank");
            // Create event information elements
            eventTimeEl = document.createElement("p");
            eventTimeEl.className = "event-time";
            formattedTime = moment(eventDate).format("h:mm a");
            eventTimeEl.innerHTML = formattedTime;
            eventNameEl = document.createElement("p")
            eventNameEl.className = "event-name"
            eventNameEl.textContent = eventObj[index].name;
            eventVenueEl = document.createElement("p")
            eventVenueEl.className = "event-venue"
            eventVenueEl.textContent = eventObj[index].venue;
            // Build the individual list item
            eventItemEl.appendChild(eventTimeEl);
            eventItemEl.appendChild(eventNameEl);
            eventItemEl.appendChild(eventVenueEl);
            eventLinkEl.appendChild(eventItemEl);
            // Attach them to the proper unordered list
            eventLinkEl.className = "event-styles"
            eventContainerEl.appendChild(eventLinkEl);
        };
    
    };
    
    var buildDataStructure = function(data) {
        for (var index = 0; index < data._embedded.events.length; index++) {
            eventObj[index] = {
            name: data._embedded.events[index].name,
            eventDate: data._embedded.events[index].dates.start.dateTime,
            startTime:  data._embedded.events[index].dates.start.localTime,
            venue:  data._embedded.events[index]._embedded.venues[0].name,
            venueId: data._embedded.events[index]._embedded.venues[0].id,
            eventUrl: data._embedded.events[index].url
            };
        }
    };