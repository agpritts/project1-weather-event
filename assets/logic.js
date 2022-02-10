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
       console.log(response);
        if (response.ok) { 
            response.json().then(function(data) { 
                console.log(data);
                buildDataStructure(data);
                displayEvents();
                console.log(eventObj);
            })
        }
   })
   .catch(function(error) {
        console.log(response);
       alert("Error connecting to Ticketmaster.");
   });
};

var displayEvents = function() {
    for (let index = 0; index < eventObj.length; index++) {
        // Extract the date from the event date string from TM
        targetDate = new Date (eventObj[index].eventDate);
        targetSelector = targetDate.getDate();
        console.log(targetSelector);
        // Find (and select) list corresponding to the date of the event
        var eventContainerEl = document.querySelector("[data-target='" + targetSelector + "']");
        // Create the elements for the event list items
        console.log(eventContainerEl);
        eventItemEl = document.createElement("li");
        // Anchor tag to link to the TM site for ticket purchase
        eventLinkEl = document.createElement("a");
        eventLinkEl.setAttribute("href", eventObj[index].eventUrl);
        eventLinkEl.setAttribute("target", "_blank");
        // Create event information elements
        eventTimeEl = document.createElement("p");
        eventTimeEl.className = "event-time";
        eventTimeEl.textContent = eventObj[index].startTime;
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

}

var buildDataStructure = function(data) {
    for (var index = 0; index < data._embedded.events.length; index++) {
        // var eventDateStr = new Date(data._embedded.events[index].dates.start.dateTime);
        // console.log(eventDateStr.getDate());
        eventObj[index] = {
        name: data._embedded.events[index].name,
        eventDate: data._embedded.events[index].dates.start.dateTime,
        startTime:  data._embedded.events[index].dates.start.localTime,
        venue:  data._embedded.events[index]._embedded.venues[0].name,
        venueId: data._embedded.events[index]._embedded.venues[0].id,
        eventUrl: data._embedded.events[index].url
        };
        // console.log(eventObj[index].eventDate.getDate());
    }
};
getEvents();