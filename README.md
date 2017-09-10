# webpack-hmr-example

## Running this code

1. Clone this repository
1. `docker-compose up`
1. Open browser and navigate to http://localhost:3000/
1. Change in client side code should trigger a reload automatically (usually hot module replacement only, not full page reload)
1. Change in server side code will only be visible after a manual full page reload


## Open issues
1. Change in scss does not trigger hot module replacement ie. styles are not applied without manually reloading the page
1. Is it working on macOS with docker-compose? Do file changes trigger file change events inside running container?

## Credits
- Idea taken from: https://github.com/glenjamin/ultimate-hot-reloading-example
