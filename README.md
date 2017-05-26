SkyTrelio (A Trello Clone)
==========================

Installation 
-------------

To first need to set some environment variables for this app

```bash
DB_URI=localhost:27017/<%YOUR_DB_NAME%>
PORT=<%YOUR_PORT%>
```

To use Twitter login you will also need the following environment variables

```bash
TWITTER_API_KEY=<%YOUR_TWITTER_API_KEY%>
TWITTER_API_SECRET=<%YOUR_TWITTER_API_SECRET%>
TWITTER_CALLBACK_URL=/auth/twitter/callback
```

These environment variables can be set in an `.env` file located in the root of the folder 

Or you can directly pass them when calling the app

```bash
DB_URI=localhost:27017/SkyTrelio PORT=3000 npm run dev
```

Note: You also need to have a mongo daemon running

----

With this done you can install the dependencies of the project by doing `npm install && bower install` or doing directly `npm start` that will also start the app

Launching the app 
-----------------

You can launch the app using some NPM scripts:

- `npm start` Will launch the app and will install the dependencies (npm & bower) automatically
- `npm run dev` Will launch the app w/ nodemon so it will restart itself when any file of the project is modified and saved
- `npm run dev:debug` Will launch the `npm run dev` script w/ lots of debugging info about the app

API endpoints
---------------

**Create task**

```bash
curl --data "title=Buy More Whiteboards" localhost:3000/tasks
```

**Get specific task**

```bash
curl localhost:3000/task/58b6b9700fa85256b399c04c
```

**Remove specific task**

```bash
curl -X "DELETE" localhost:3000/task/58b6ae0f209bf3444a4d04fa
```

**Update specific task**

```bash
curl -X "PUT" --data "title=Buy Gold and Silver&done=true"  localhost:3000/task/58b6b817be054254dd6327ca
```