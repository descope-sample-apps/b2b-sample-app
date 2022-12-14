## B2B Sample app
B2B Sample app using Descope for authentication. this app includes
- NodeJS server
- React App client

## Getting Started
This Sample app is contain **NodeJS server** and **React App client**

After the first-time configuration, you can

###  Run the Server
1. Go to server directory -`cd server`
2. Install dependencies - `npm i`
3. create `.env` file with the following content
```env
# Your project id
DESCOPE_PROJECT_ID=<project-id>
# Optional - Descope base url, e.g. http://localhost:8000
DESCOPE_BASE_URL=http://localhost:8000
```
4. Start the server - `npm run start`

The server is now running on `http://localhost:4000`

### Run the Client:
1. Go to client directory -`cd client`
2. Install dependencies - `npm i`
3. create `.env` file with the following content
```env
# Your project id
REACT_APP_DESCOPE_PROJECT_ID=<project-id>
# Flow id to run on sign in, default is sign-in
REACT_APP_DESCOPE_SIGN_IN_FLOW_ID=sign-up
# Optional - Flow id to run on sign up, default is sign-up
REACT_APP_DESCOPE_SIGN_UP_FLOW_ID=sign-up
# Optional - Descope base url, e.g. https://api.descope.com, https://api.sandbox.descope.com or http://localhost:8000
REACT_APP_DESCOPE_BASE_URL=http://localhost:8000
```
4. Run the client `npm run start`

The server is now running on `http://localhost:3000`

Note: the client is configured to proxy to its server on `http://localhost:4000`. In the Network tab in the dev-tools, requests will still shown to port 3000

### Run server and client together
After initial setup describe above, you can run server's and client's `start` command concurrently

1. go to the project directory
2. Install dependencies - `npm i`
3. run server and client concurrently - `npm run start`


