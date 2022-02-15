var userLat = "";
var userLong = "";
var userZip = "";
var userRadius = "";
var todayDate = new Date();
var endDate = new Date();
endDate.setDate(todayDate.getDate()+4);
var eventObj = [{}];
var container1 = document.getElementById('place1');
var container2 = document.getElementById('place2');
var container3 = document.getElementById('place3');
var container4 = document.getElementById('place4');
var container5 = document.getElementById('place5');
var modal = document.getElementById("myModal");
var submit = document.getElementById("submit");
// get the event list for event listener
var eventListEl = document.querySelector(".list-container");

$(document).ready(function() {
    modal.style.display = "block";
});

submit.onclick = function() {
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
    return /^\d{5}(-\d{4})?$/.test(userZip);
}

function isValidRad(userRadius) {
    return userRadius.length === 2 && !isNaN(Number(userRadius))
}

var takeInput = function() {
    localStorage.setItem(userZip, userRadius);
}


var displayTime = function() {
    var startDay = moment().isoWeekday();
    var time = moment().day(startDay).format('dddd </br> MM/DD');
    $("#day1").html(time);
    var time = moment().day(startDay + 1).format('dddd </br> MM/DD');
    $("#day2").html(time);
    var time = moment().day(startDay + 2).format('dddd </br> MM/DD');
    $("#day3").html(time);
    var time = moment().day(startDay + 3).format('dddd </br> MM/DD');
    $("#day4").html(time);
    var time = moment().day(startDay + 4).format('dddd </br> MM/DD');
    $("#day5").html(time);
};

// endDate.setDate(todayDate.getDate()+5);
// endDate.setSeconds(0,0);
// endDate = endDate.toISOString();
// endDate = endDate.replace(".000Z","Z");
// var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=UpMNgv350gA3fGQjOpjHrZqALQWbo98H&latlong=" + userLat + "," + userLong + "&radius=" + userRadius + "&endDateTime=" + endDate;
// var getEvents = function() {
//     console.log(todayDate);
//     console.log(endDate);
//    fetch(apiUrl).then(function(response) {
//     //    console.log(response);
//         if (response.ok) {
//             response.json().then(function(data) { 
//                 console.log(data);
//                 buildDataStructure(data);
//                 displayEvents();
//                 // console.log(eventObj);
//         }
//    })
//    .catch(function(error) {
//     console.log(error);
//    alert("Error connecting to Ticketmaster.");
// });
// };
function firstAPI() {
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
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + userLat + '&lon=' + userLong + '&exclude=current,minutely,hourly&units=imperial&appid=cdf22472458b933575b8154ed94c685e')
    
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var tempD = document.createElement('p');
        tempD.textContent = 'Day: ' + data.daily[0].temp.day + '°F';
        container1.appendChild(tempD);
        var tempN = document.createElement('p');
        tempN.textContent = 'Night: ' + data.daily[0].temp.eve + '°F';
        container1.appendChild(tempN);
        var foreC = document.createElement('p');
        foreC.textContent = 'Forecast: ' + data.daily[0].weather[0].main;
        container1.appendChild(foreC);
        var iconn = document.createElement('img');
        iconn.src = 'http://openweathermap.org/img/wn/' + data.daily[0].weather[0].icon + '@2x.png';
        container1.appendChild(iconn);
    
        var tempD = document.createElement('p');
        tempD.textContent = 'Day: ' + data.daily[1].temp.day + '°F';
        container2.appendChild(tempD);
        var tempN = document.createElement('p');
        tempN.textContent = 'Night: ' + data.daily[1].temp.eve + '°F';
        container2.appendChild(tempN);
        var foreC = document.createElement('p');
        foreC.textContent = 'Forecast: ' + data.daily[1].weather[0].main;
        container2.appendChild(foreC);
        var iconn = document.createElement('img');
        iconn.src = 'http://openweathermap.org/img/wn/' + data.daily[1].weather[0].icon + '@2x.png';
        container2.appendChild(iconn);
    
        var tempD = document.createElement('p');
        tempD.textContent = 'Day: ' + data.daily[2].temp.day + '°F';
        container3.appendChild(tempD);
        var tempN = document.createElement('p');
        tempN.textContent = 'Night: ' + data.daily[2].temp.eve + '°F';
        container3.appendChild(tempN);
        var foreC = document.createElement('p');
        foreC.textContent = 'Forecast: ' + data.daily[2].weather[0].main;
        container3.appendChild(foreC);
        var iconn = document.createElement('img');
        iconn.src = 'http://openweathermap.org/img/wn/' + data.daily[2].weather[0].icon + '@2x.png';
        container3.appendChild(iconn);
    
        var tempD = document.createElement('p');
        tempD.textContent = 'Day: ' + data.daily[3].temp.day + '°F';
        container4.appendChild(tempD);
        var tempN = document.createElement('p');
        tempN.textContent = 'Night: ' + data.daily[3].temp.eve + '°F';
        container4.appendChild(tempN);
        var foreC = document.createElement('p');
        foreC.textContent = 'Forecast: ' + data.daily[3].weather[0].main;
        container4.appendChild(foreC);
        var iconn = document.createElement('img');
        iconn.src = 'http://openweathermap.org/img/wn/' + data.daily[3].weather[0].icon + '@2x.png';
        container4.appendChild(iconn);
    
        var tempD = document.createElement('p');
        tempD.textContent = 'Day: ' + data.daily[4].temp.day + '°F';
        container5.appendChild(tempD);
        var tempN = document.createElement('p');
        tempN.textContent = 'Night: ' + data.daily[4].temp.eve + '°F';
        container5.appendChild(tempN);
        var foreC = document.createElement('p');
        foreC.textContent = 'Forecast: ' + data.daily[4].weather[0].main;
        container5.appendChild(foreC);
        var iconn = document.createElement('img');
        iconn.src = 'http://openweathermap.org/img/wn/' + data.daily[4].weather[0].icon + '@2x.png';
        container5.appendChild(iconn);
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

            // add the array index to the list elements for tracking purposes
            eventItemEl.dataset.index = index;

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
            venueAddress: data._embedded.events[index]._embedded.venues[0].address.line1,
            venueCity: data._embedded.events[index]._embedded.venues[0].city.name,
            venueState: data._embedded.events[index]._embedded.venues[0].state.stateCode,
            venueZip: data._embedded.events[index]._embedded.venues[0].postalCode,
            eventUrl: data._embedded.events[index].url
            };
        }
    };
    eventListEl.addEventListener("click", function() {
        var eventChoice = parseInt(event.target.getAttribute("data-index"))
        if (eventChoice) {
                
        }

    })