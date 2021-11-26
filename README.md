# CPA Server

## Server description

This server made using Express and it can interact with your app through HTTPRequests and execute CRUD with MongoDB

## HTTPRequest

1. Make post request to "/register" to make registration
   - Response status is true if registration is successful
   - Response status is false if the the account already exists
2. Make post request to "/getUserInfo" to get user information
   - Response status is true if user exists, user info is also contained in the response
   - Response status is false if user does not exist
3. Make post request to "/setUserActivity" to record user activity
   - Response status is insert if there is no activity associated with the user
   - Response status is update if there are activities associated with the user
4. Make post request to "/getUserActivity" to get user activity history
   - Response status is true if user exists, user activity history is also contained in the response
   - Response status if false if user does not exist

## Usage

1. Download this server, run `npm install`
2. Rename the `configure_demo.js` file to `configure.js`, and modify the serverURL to your own mongodb database
3. Run `npm start` or `nodemon`, then the server runs at localhost:3000
4. You can also deploy the server to heroku with heroku cli
