SunApp
======
Start your iPhone or Android phone and this app will tell you right after you started it how to get to a sunny place
in Switzerland using public transportation.

Motivation
----------
Do cool stuff with mobile devices and JavaScript.

Data processing flow
--------------------
1. Get device geo location.
1. Find closest/nearest public transport station.
1. Load weather data from server.
1. Some complicated algorithm to find 10 best candidates (sunny place "close" to current location).
1. Call Transport API for each candidate to find fastest connection.
1. Display 5 quickest-to-reach sunny places. Each entry has a detail view.

Implementation
--------------
- The first screen is a launch/progress/start screen that keeps user up to
- [app.js:launch](app.js#L66):sends envent 'launching' event for which [Application.js](app/controller/Application.js)
has an ```onLaunching()`` method.
- more to come...