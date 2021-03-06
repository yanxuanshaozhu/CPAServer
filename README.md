# CPA Server

## Server description

This server is made using Express and it is used to interact with my <a href="https://github.com/yanxuanshaozhu/Mobile-Development/tree/CAP5" >React Native app </a> and with MongoDB Atlas database for that app. This server has already been deployed to Heroku. 

## HTTPRequest

1. Make post request to "/register" to make registration
   - Response status is true if registration is successful
   - Response status is false if the the account already exists
2. Make post request to "/getUserInfo" to get user information
   - Response status is true if user exists, user info is also contained in the response
   - Response status is false if user does not exist
3. Make post request to "/updateUserInfo" to update user information
   - Response status is -2 if current email is not linked to any existing account
   - Response status is -1 if target email has already been linked to another account
   - Response status is 0 if update is successful
4. Make post request to "/setUserActivity" to record user activity
   - Response status is insert if there is no activity associated with the user
   - Response status is update if there are activities associated with the user
5. Make post request to "/getUserActivity" to get user activity history
   - Response status is true if user exists, user activity history is also contained in the response
   - Response status if false if user does not exist

## Usage

1. Download this server, run `npm install`
2. Rename the `configure_demo.js` file to `configure.js`, and modify the serverURL to your own mongodb database. When you deploy this server to heroku, you should not include the `.gitignore` file, meantime it's more appropriate to use heroku config vars instead of this `configure.js` file. Refer this link for config vars: https://devcenter.heroku.com/articles/config-vars
3. Run `npm start` or `nodemon`, then the server runs at localhost:3000
4. You can also deploy the server to heroku with heroku cli

