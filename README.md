# Hue Color Picker

A home automation UI tool built with Vue for controlling lights via the Hue API.

## Getting Started

The following instructions will get the Vue application running on your local machine.

### Installing

Clone the repo:

`git clone https://github.com/matt-taggart/hue-color-picker.git`

Install node modules:

`yarn install`

Start up webpack dev server:

`yarn start`

Run production build:

`yarn run build`

## Running Tests

This project uses Jest and Vue Test Utils for unit testing purposes.  To run the entire test suite, you can use the command `yarn test`. If you prefer to use the "watch" functionality of Jest, you can do this by running `yarn watch`.

## Built With

* Vue - Progressive Javascript framework for building user interfaces.
* Vue-Loader - Webpack loader for Vue.js components.
* Jest - Zero-configuration testing library.
* Vue-Test-Utils - Utilities for testing Vue components.
* Vue-Color - Vue Color Pickers for Sketch, Photoshop, Chrome & more
* Hue-API-V2 - Lightweight wrapper around Philips Hue RESTful API. This library can be found at: https://github.com/matt-taggart/hue-api-v2

## Features

* Allows users to switch lights on and off via the Philips Hue API.
* Grants fine-tuned control over the color of lights connected to the Hue bridge via a color picker.