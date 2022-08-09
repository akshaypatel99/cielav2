# Ciela

**A hyperlocal weather app built with React**

Check out the live site [here](https://tinyurl.com/ciela-weather).

## Project Description

Ciela is a web app that provides a hyperlocal weather forecast.
Users have the option to use browser location services or
input their location in the search field. Users are given the
current weather, a seven day forecast, hourly weather for the
next 48 hours, and finally a rain forecast for the next hour.

Current, seven day and hourly forecasts all provide a
comprehensive set of data that includes sunset, sunrise, UV
Index, wind speed and direction, cloudiness, probability of
rain, humidity, temperature, temperature highs & lows, and the
'feels like' temperature.

The rain forecast is a colour coded chart that shows how much
rainfall is expected in each minute for the next hour.

### Purpose and Goal

This was a site built for personal use. The goal was to build a
website that provided current, seven day, hourly and rainfall in
the next hour in a clear, uncluttered and easy to read format,
which I feel this build achieves.

### Implementation

STACK & APIS
The front-end is built with React and Styled Components. Data is fetched from a serverless backend, built with Netlify Functions, and stored in the frontend using React Context. API calls are made in the backend to OpenWeather and OpenCage.

The user has two options to enter their location: a text box or a button to send their location. If the user chooses to manually input their location or search for weather at a different location, their text input is first sent to OpenCage. The OpenCage API receives street addresses and returns a lat/long pair. The lat/long coordinates are then used to fetch the weather data from OpenWeather.

If the user chooses to share their location, the lat/long coordinates from the Window.navigator API are used to fetch the weather data from OpenWeather.

NETLIFY FUNCTIONS
I chose Netlify Functions because they are serverless AWS Lambda functions and allow you to have server-side code without having to run a dedicated server. They also keep API keys secure that would otherwise be exposed by React in the frontend.

LAYOUT
There are a couple of interesting techniques used in this simply designed project. One such technique was to display the Hourly and Daily Detail components as an overlay on top of the homepage, with a clickable background to return to the homepage. This would maintain the feel of a SPA, rather than a website with numerous pages.

The Daily and Hourly Detail components use their Unix Timestamp (received from the OpenWeather API) as a unique id. Each Day and Hour component is a clickable link that sets the URL parameters to the corresponding Unix Timestamp. When the URL path change is detected, the overlaying Detail component is displayed.

RAIN FORECAST
The other interesting technique was used in 'Rainfall in the Next Hour'. To display the expected rainfall in mm/hr for each minute, there are 60 individual divs representing each minute and they will have a background colour indicating how much rainfall is expected. They key for the chart is almost identical to that used by the Met Office.

### Lessons Learned

I learnt some new UI techniques with this project, particularly those mentioned above. A lot of thought went into how best to keep environment variables secure and hidden in a React app, and learning how to use the navigation API to fetch a device's geolocation.

There are several features that could be added: saving a user's favourite cities/places, a background that changes depending on the weather results or time of day, adding multiple language support, and displaying expected rainfall using a traditional bar chart.
