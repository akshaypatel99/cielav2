# Ciela

**_A hyperlocal weather app built with React_**

Check out the live site [**here**](https://tinyurl.com/ciela-weather).

## Project Overview

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

### Stack

- React
- Netlify Functions
- Styled Components

## Purpose and Goal

This was a site built for personal use. The goal was to build a
website that provided current, seven day, hourly and rainfall in
the next hour in a clear, uncluttered and easy to read format,
which I feel this build achieves.

## Implementation & Features

#### STACK & APIS

The front-end is built with React and Styled Components. Data is fetched from a serverless backend, built with Netlify Functions, and stored in the frontend using React Context. API calls are made in the backend to [OpenWeather](https://openweathermap.org/api) and [OpenCage](https://opencagedata.com/api).

The user has two options to enter their location: a text input or a button to use their current location. If the user chooses to type their current location, or search for weather at a different location, their text input is first sent to OpenCage. The OpenCage API receives street addresses and returns lat/long coordinates, which are then used to fetch the weather data from OpenWeather.

If the user chooses to share their location, the lat/long coordinates from the Window.navigator API are used to fetch the weather data from OpenWeather.

#### NETLIFY FUNCTIONS

I chose Netlify Functions because they are serverless AWS Lambda functions that act as API endpoints, and they allow you to have a backend without having to run a dedicated server. They also keep API keys secure that would otherwise be exposed by React in the frontend.

#### LAYOUT

To display the Hourly and Daily Detail components, I chose to display the information in a modal with a clickable background to return to the homepage. This would maintain the feel of a SPA, rather than a website with numerous pages.

The Hourly and Daily Detail components use their Unix Timestamp (received from the OpenWeather API) as a unique id. Each Day and Hour component is a clickable link that sets the URL parameters to the corresponding Unix Timestamp. When the URL path change is detected, the overlaying Detail component is displayed.

#### RAIN FORECAST

For 'Rainfall in the Next Hour' I decided to use a stacked horizontal bar chart that displays the expected rainfall in mm/hr for each minute. There are 60 individual divs representing each minute in the next hour and they will have a background colour indicating how much rainfall is expected. Inspiration for the key comes from a similar key used by the Met Office.

## Lessons Learned

I learnt some new UI techniques with this project, particularly those mentioned above. A lot of thought went into how best to keep environment variables secure and hidden in a React app, and learning how to use the navigation API to fetch a device's geolocation.

There are several features that could be added: saving a user's favourite cities/places, a background that changes depending on the weather results or time of day, adding multiple language support, and displaying expected rainfall using a traditional bar chart.
