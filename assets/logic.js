var apiKey = "UpMNgv350gA3fGQjOpjHrZqALQWbo98H"
var userLat = 35.12677;
var userLong = -80.83856;
var userRadius = 75;
var todayDate = new Date();
var endDate = new Date();
var eventObj = [{}];

endDate.setDate(todayDate.getDate()+5);
endDate.setSeconds(0,0);
endDate = endDate.toISOString();
endDate = endDate.replace(".000Z","Z");
var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=UpMNgv350gA3fGQjOpjHrZqALQWbo98H&latlong=" + userLat + "," + userLong + "&radius=" + userRadius + "&endDateTime=" + endDate;
var getEvents = function() {
    console.log(todayDate);
    console.log(endDate);
   fetch(apiUrl).then(function(response) {
        if (response.ok) { 
            response.json().then(function(data) { 
                console.log(data);
                buildDataStructure(data);
                displayEvents();
                console.log(eventObj);
            })
        }
   })
};

var displayEvents = function() {
    for (let index = 0; index < eventObj.length; index++) {
        // Create the elements for the event list items
        eventContainerEl = document.querySelector(".events");
        eventItemEl = document.createElement("li");
        eventLinkEl = document.createElement("a");
        eventLinkEl.setAttribute("href", eventObj[index].eventUrl);
        eventLinkEl.setAttribute("target", "_blank");
        eventTimeEl = document.createElement("p");
        eventTimeEl.className = "event-time";
        eventTimeEl.textContent = eventObj[index].startTime;
        eventNameEl = document.createElement("p")
        eventNameEl.className = "event-name"
        eventNameEl.textContent = eventObj[index].name;
        eventVenueEl = document.createElement("p")
        eventVenueEl.className = "event-venue"
        eventVenueEl.textContent = eventObj[index].venue;
        // Build the individual list items
        eventItemEl.appendChild(eventTimeEl);
        eventItemEl.appendChild(eventNameEl);
        eventItemEl.appendChild(eventVenueEl);
        eventLinkEl.appendChild(eventItemEl);
        eventContainerEl.appendChild(eventLinkEl);
    };
    console.log(eventContainerEl);

}

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
getEvents();